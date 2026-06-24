"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Variant = "danger" | "warning" | "info";

interface ConfirmModalProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: Variant;
    loading?: boolean;
}

const VARIANT_MAP: Record<Variant, {
    icon: string;
    iconBg: string;
    iconColor: string;
    confirmBtn: string;
}> = {
    danger: {
        icon: "warning",
        iconBg: "bg-error-container",
        iconColor: "text-error",
        confirmBtn: "bg-error text-on-error hover:bg-error/90",
    },
    warning: {
        icon: "info",
        iconBg: "bg-secondary-fixed",
        iconColor: "text-secondary",
        confirmBtn: "bg-secondary text-on-secondary hover:bg-secondary/90",
    },
    info: {
        icon: "help",
        iconBg: "bg-primary-fixed",
        iconColor: "text-primary",
        confirmBtn: "bg-primary text-on-primary hover:bg-deep-forest",
    },
};

export function ConfirmModal({
    open,
    onConfirm,
    onCancel,
    title,
    description,
    confirmLabel = "Ya, Lanjutkan",
    cancelLabel = "Batal",
    variant = "info",
    loading = false,
}: ConfirmModalProps) {
    const cancelRef = useRef<HTMLButtonElement>(null);
    const v = VARIANT_MAP[variant];

    useEffect(() => {
        if (open) setTimeout(() => cancelRef.current?.focus(), 50);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handle = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };
        document.addEventListener("keydown", handle);
        return () => document.removeEventListener("keydown", handle);
    }, [open, onCancel]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    if (!open) return null;

    // Portal: render langsung ke document.body, bebas dari semua stacking context
    return createPortal(
        <>
            {/* Backdrop */}
            <div
                aria-hidden="true"
                onClick={onCancel}
                style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 99998,
                    backgroundColor: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                }}
            />

            {/* Centering wrapper */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 99999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem",
                }}
            >
                {/* Panel */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: "100%",
                        maxWidth: "22rem",
                        borderRadius: "1.25rem",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 32px 64px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.12)",
                        overflow: "hidden",
                    }}
                >
                    {/* Ikon + judul + deskripsi */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "2rem 1.5rem 0.5rem",
                        gap: "0.75rem",
                    }}>
                        <div className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-full",
                            v.iconBg
                        )}>
                            <Icon name={v.icon} filled className={cn("text-[28px]", v.iconColor)} />
                        </div>
                        <h2
                            id="modal-title"
                            className="text-headline-md text-on-surface"
                            style={{ margin: 0 }}
                        >
                            {title}
                        </h2>
                        {description && (
                            <p
                                className="text-body-md text-on-surface-variant"
                                style={{ margin: 0 }}
                            >
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Tombol */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.625rem",
                        padding: "1.25rem 1.5rem 1.5rem",
                    }}>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className={cn(
                                "flex h-12 w-full items-center justify-center gap-2 rounded-xl text-label-md font-semibold transition-all active:scale-95 disabled:opacity-60",
                                v.confirmBtn
                            )}
                        >
                            {loading ? (
                                <>
                                    <Icon name="progress_activity" className="animate-spin text-[18px]" />
                                    Memproses...
                                </>
                            ) : confirmLabel}
                        </button>
                        <button
                            ref={cancelRef}
                            onClick={onCancel}
                            disabled={loading}
                            style={{
                                height: "3rem",
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "0.75rem",
                                border: "1px solid #E5E7EB",
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#3f4945",
                                background: "transparent",
                                cursor: "pointer",
                                transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "#f6f3f2"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                            {cancelLabel}
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.body  // ← inject langsung ke body, bebas dari semua parent stacking context
    );
}