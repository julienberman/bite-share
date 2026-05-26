"use client";

import type { Person } from "@/lib/bill";

interface SplitCardProps {
    consumers: Person[];
    shares: Map<string, number> | null;
    totalCents: number;
    subtotalCents: number;
    onClick: () => void;
}

function formatMoney(cents: number) {
    return `$${(cents / 100).toFixed(2)}`;
}

function DottedRow({
    label,
    value,
    bold,
}: {
    label: string;
    value: string;
    bold?: boolean;
}) {
    const cls = bold ? "font-semibold" : "text-muted-foreground";
    return (
        <div className={`flex items-baseline gap-1 ${cls}`}>
            <span className="shrink-0">{label}</span>
            <span className="mx-1 flex-1 overflow-hidden border-b border-dotted border-current" />
            <span className="shrink-0 tabular-nums">{value}</span>
        </div>
    );
}

export function SplitCard({
    consumers,
    shares,
    totalCents,
    subtotalCents,
    onClick,
}: SplitCardProps) {
    const taxAndTipCents = totalCents - subtotalCents;

    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full flex-col gap-2 rounded-lg border border-border bg-card p-4 text-left text-sm transition-colors hover:bg-accent"
        >
            {consumers.map((c) => (
                <DottedRow
                    key={c.id}
                    label={c.name}
                    value={formatMoney(shares?.get(c.id) ?? 0)}
                />
            ))}

            <hr className="border-border" />

            <DottedRow
                label="Subtotal"
                value={formatMoney(subtotalCents)}
                bold
            />
            <DottedRow
                label="Tax & Tip"
                value={formatMoney(taxAndTipCents)}
                bold
            />
            <DottedRow label="Total" value={formatMoney(totalCents)} bold />
        </button>
    );
}
