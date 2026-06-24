"use client";

import { useState, useCallback } from "react";

interface ConfirmOptions {
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "danger" | "warning" | "info";
}

export function useConfirm() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions>({
        title: "Apakah Anda yakin?",
    });
    const [resolve, setResolve] = useState<(val: boolean) => void>(() => () => { });

    const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
        setOptions(opts);
        setOpen(true);
        return new Promise((res) => {
            setResolve(() => res);
        });
    }, []);

    function handleConfirm() {
        resolve(true);
        setOpen(false);
    }

    function handleCancel() {
        resolve(false);
        setOpen(false);
    }

    return {
        confirm,
        loading,
        setLoading,
        modalProps: {
            open,
            onConfirm: handleConfirm,
            onCancel: handleCancel,
            loading,
            ...options,
        },
    };
}