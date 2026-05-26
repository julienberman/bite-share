import * as React from "react";

import { cn } from "@/lib/utils";

type MoneyInputProps = Omit<
    React.ComponentProps<"input">,
    "onChange" | "type" | "value"
> & {
    valueCents: number;
    onValueChange: (valueCents: number) => void;
};

function formatMoney(valueCents: number) {
    return new Intl.NumberFormat("en-US", {
        currency: "USD",
        minimumFractionDigits: 2,
        style: "currency",
    }).format(valueCents / 100);
}

function MoneyInput({
    className,
    onKeyDown,
    onPaste,
    onValueChange,
    valueCents,
    ...props
}: MoneyInputProps) {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event);

        if (event.defaultPrevented || event.metaKey || event.ctrlKey) {
            return;
        }

        if (/^\d$/.test(event.key)) {
            event.preventDefault();
            onValueChange(valueCents * 10 + Number(event.key));
            return;
        }

        if (event.key === "Backspace" || event.key === "Delete") {
            event.preventDefault();
            onValueChange(Math.floor(valueCents / 10));
            return;
        }

        if (
            ["ArrowLeft", "ArrowRight", "Home", "End", "Tab", "Enter"].includes(
                event.key,
            )
        ) {
            return;
        }

        event.preventDefault();
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        onPaste?.(event);

        if (event.defaultPrevented) {
            return;
        }

        const digits = event.clipboardData.getData("text").replace(/\D/g, "");
        if (digits) {
            event.preventDefault();
            onValueChange(Number(digits));
        }
    };

    return (
        <input
            data-slot="money-input"
            inputMode="numeric"
            onChange={() => {}}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            type="text"
            value={formatMoney(valueCents)}
            className={cn(
                "h-8 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-xs dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                className,
            )}
            {...props}
        />
    );
}

export { MoneyInput };
