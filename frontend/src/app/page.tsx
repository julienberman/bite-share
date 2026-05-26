"use client";

import { useMemo, useState } from "react";
import { ConsumerChip } from "@/components/person/consumer_chip";
import { SearchConsumers } from "@/components/person/search_consumers";
import { ItemCard } from "@/components/item/item";
import { ItemDetail } from "@/components/item/item_detail";
import { useBillStore } from "@/lib/bill_store/useBillStore";
import { canSplit, split } from "@/lib/bill";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MoneyInput } from "@/components/ui/money_input";

export default function Page() {
    const { consumers, items, totalCents, addItem, setTotal } = useBillStore();
    const [editingItemId, setEditingItemId] = useState<string | null>(null);

    const shares = useMemo(() => {
        const bill = { consumers, items, totalCents };
        return canSplit(bill) ? split(bill) : null;
    }, [consumers, items, totalCents]);

    const editingItem = items.find((i) => i.id === editingItemId) ?? null;

    return (
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-4 sm:p-8">
            <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Dinner math, minus the group chat
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Split Bill
                    </h1>
                </div>

                <section className="flex w-full max-w-72 flex-col gap-2">
                    <Label htmlFor="total">Bill total:</Label>
                    <MoneyInput
                        id="total"
                        aria-label="Bill total"
                        valueCents={totalCents}
                        onValueChange={setTotal}
                        className="h-11 text-lg font-semibold"
                    />
                </section>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <section className="flex flex-col gap-4 lg:col-span-1">
                    <div className="flex h-20 flex-col justify-end gap-3">
                        <h2 className="text-lg font-semibold">People</h2>
                        <SearchConsumers />
                    </div>
                    <div className="flex min-h-48 flex-wrap content-start gap-2 border border-border bg-card p-4">
                        {consumers.map((c) => (
                            <ConsumerChip key={c.id} person={c} />
                        ))}
                    </div>
                </section>

                <section className="flex flex-col gap-4 lg:col-span-2">
                    <div className="flex h-20 flex-col justify-end gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <h2 className="text-lg font-semibold">Items</h2>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addItem}
                            className="h-8 w-full sm:w-auto"
                        >
                            + Add Item
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {items.map((item) => (
                            <ItemCard
                                key={item.id}
                                item={item}
                                consumers={consumers}
                                onClick={() => setEditingItemId(item.id)}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {shares && (
                <section className="ml-auto flex w-full max-w-md flex-col gap-2 border border-border bg-card p-4">
                    <h2 className="text-lg font-semibold">Each person owes</h2>
                    {consumers.map((c) => (
                        <div key={c.id} className="flex justify-between">
                            <span>{c.name}</span>
                            <span>
                                ${((shares.get(c.id) ?? 0) / 100).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </section>
            )}

            {editingItem && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-foreground/60 p-4"
                    onClick={() => setEditingItemId(null)}
                >
                    <div
                        className="w-full max-w-md border border-border bg-background p-6 shadow-lg"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <ItemDetail
                            item={editingItem}
                            consumers={consumers}
                            onClose={() => setEditingItemId(null)}
                        />
                    </div>
                </div>
            )}
        </main>
    );
}
