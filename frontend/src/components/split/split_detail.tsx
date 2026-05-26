"use client";

import { MoneyInput } from "@/components/ui/money_input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Person } from "@/lib/bill";

interface SplitDetailProps {
    consumers: Person[];
    shares: Map<string, number> | null;
    totalCents: number;
    subtotalCents: number;
    onTotalChange: (cents: number) => void;
    onClose: () => void;
}

function formatMoney(cents: number) {
    return `$${(cents / 100).toFixed(2)}`;
}

export function SplitDetail({
    consumers,
    shares,
    totalCents,
    subtotalCents,
    onTotalChange,
    onClose,
}: SplitDetailProps) {
    const taxAndTipCents = totalCents - subtotalCents;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Bill Summary</h2>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                >
                    ✕
                </Button>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="split-detail-total">Total</Label>
                <MoneyInput
                    id="split-detail-total"
                    valueCents={totalCents}
                    onValueChange={onTotalChange}
                    className="h-11 text-lg font-semibold"
                />
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="tabular-nums">
                        {formatMoney(subtotalCents)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax & Tip</span>
                    <span className="tabular-nums">
                        {formatMoney(taxAndTipCents)}
                    </span>
                </div>
            </div>

            <hr className="border-border" />

            <div className="flex flex-col gap-2 text-sm">
                {consumers.map((c) => (
                    <div key={c.id} className="flex justify-between">
                        <span className="text-muted-foreground">{c.name}</span>
                        <span className="tabular-nums">
                            {formatMoney(shares?.get(c.id) ?? 0)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
