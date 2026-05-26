"use client";

import { useMemo, useState } from "react";
import { ConsumerChip } from "@/components/person/consumer_chip";
import { ConsumerDetail } from "@/components/person/consumer_detail";
import { SearchConsumers } from "@/components/person/search_consumers";
import { ItemCard } from "@/components/item/item";
import { ItemDetail } from "@/components/item/item_detail";
import { useBillStore } from "@/lib/bill_store/useBillStore";
import { canSplit, split } from "@/lib/bill";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MoneyInput } from "@/components/ui/money_input";
import { SplitCard } from "@/components/split/split_card";
import { SplitDetail } from "@/components/split/split_detail";

export default function Page() {
    const { consumers, items, totalCents, addItem, setTotal } = useBillStore();
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [editingConsumerId, setEditingConsumerId] = useState<string | null>(
        null,
    );
    const [editingTotal, setEditingTotal] = useState(false);

    const subtotalCents = useMemo(
        () => items.reduce((sum, item) => sum + item.priceCents, 0),
        [items],
    );

    const shares = useMemo(() => {
        const bill = { consumers, items, totalCents };
        return canSplit(bill) ? split(bill) : null;
    }, [consumers, items, totalCents]);

    const editingItem = items.find((i) => i.id === editingItemId) ?? null;
    const editingConsumer =
        consumers.find((c) => c.id === editingConsumerId) ?? null;

    const handleAddItem = () => {
        setEditingItemId(addItem());
    };

    return (
        <main className="flex w-full flex-col gap-8 py-8">
            <div className="grid gap-6 lg:grid-cols-3">
                <section className="flex flex-col gap-4 lg:col-span-1">
                    <div className="flex h-20 flex-col justify-end gap-3">
                        <h2 className="text-lg font-semibold">People</h2>
                        <SearchConsumers />
                    </div>
                    <div className="flex min-h-48 flex-wrap content-start gap-2 rounded-lg border border-border bg-card p-4">
                        {consumers.map((c) => (
                            <ConsumerChip
                                key={c.id}
                                person={c}
                                onClick={() => setEditingConsumerId(c.id)}
                            />
                        ))}
                    </div>
                </section>

                <section className="flex flex-col gap-4 lg:col-span-2">
                    <div className="grid gap-4 md:grid-cols-[1fr_18rem]">
                        <div className="flex h-20 flex-col justify-end gap-3">
                            <h2 className="text-lg font-semibold">Items</h2>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleAddItem}
                                className="h-8 w-full sm:w-auto"
                            >
                                + Add Item
                            </Button>
                        </div>
                        <div className="flex h-20 flex-col justify-end gap-3">
                            <Label
                                htmlFor="bill-total"
                                className="text-lg font-semibold"
                            >
                                Bill total
                            </Label>
                            <MoneyInput
                                id="bill-total"
                                valueCents={totalCents}
                                onValueChange={setTotal}
                                className="h-8 font-semibold"
                            />
                        </div>
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
                    <SplitCard
                        consumers={consumers}
                        shares={shares}
                        totalCents={totalCents}
                        subtotalCents={subtotalCents}
                        onClick={() => setEditingTotal(true)}
                    />
                </section>
            </div>

            {editingItem && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-foreground/60 p-4"
                    onClick={() => setEditingItemId(null)}
                >
                    <div
                        className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-lg"
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
            {editingConsumer && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-foreground/60 p-4"
                    onClick={() => setEditingConsumerId(null)}
                >
                    <div
                        className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-lg"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <ConsumerDetail
                            person={editingConsumer}
                            onClose={() => setEditingConsumerId(null)}
                        />
                    </div>
                </div>
            )}
            {editingTotal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-foreground/60 p-4"
                    onClick={() => setEditingTotal(false)}
                >
                    <div
                        className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SplitDetail
                            consumers={consumers}
                            shares={shares}
                            totalCents={totalCents}
                            subtotalCents={subtotalCents}
                            onTotalChange={setTotal}
                            onClose={() => setEditingTotal(false)}
                        />
                    </div>
                </div>
            )}
        </main>
    );
}
