"use client";

import { useMemo, useState } from "react";
import { ConsumerChip } from "@/components/person/consumer_chip";
import { SearchConsumers } from "@/components/person/search_consumers";
import { ItemCard } from "@/components/item/item";
import { ItemDetail } from "@/components/item/item_detail";
import { useBillStore } from "@/lib/bill_store/useBillStore";
import { canSplit, split } from "@/lib/bill";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { consumers, items, totalCents, addItem, setTotal } = useBillStore();
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const shares = useMemo(() => {
    const bill = { consumers, items, totalCents };
    return canSplit(bill) ? split(bill) : null;
  }, [consumers, items, totalCents]);

  const editingItem = items.find((i) => i.id === editingItemId) ?? null;

  const handleTotalBlur = (value: string) => {
    const total = Number.parseFloat(value);
    setTotal(Number.isFinite(total) ? Math.round(total * 100) : 0);
  };

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-8 p-8">
      <h1 className="text-2xl font-bold">Split Bill</h1>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">People</h2>
        <SearchConsumers />
        <div className="flex flex-wrap gap-2">
          {consumers.map((c) => (
            <ConsumerChip key={c.id} person={c} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Items</h2>
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              consumers={consumers}
              onClick={() => setEditingItemId(item.id)}
            />
          ))}
          <Button variant="outline" onClick={addItem}>
            + Add Item
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <Label htmlFor="total">Total (with tax & tip)</Label>
        <Input
          id="total"
          type="number"
          defaultValue={(totalCents / 100).toFixed(2)}
          onBlur={(e) => handleTotalBlur(e.target.value)}
          placeholder="0.00"
          className="max-w-40"
        />
      </section>

      {shares && (
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Each person owes</h2>
          {consumers.map((c) => (
            <div key={c.id} className="flex justify-between">
              <span>{c.name}</span>
              <span>${((shares.get(c.id) ?? 0) / 100).toFixed(2)}</span>
            </div>
          ))}
        </section>
      )}

      {editingItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-96 rounded-lg bg-background p-6 shadow-lg">
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
