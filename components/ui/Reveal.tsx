"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
    children,
    delay = 0,
    y = 24,
    className,
}: {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}) {
    const reduce = useReducedMotion();

    const variants: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            {children}
        </motion.div>
    );
}