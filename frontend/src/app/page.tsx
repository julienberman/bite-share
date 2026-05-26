"use client";

import { useMemo } from "react";
import { useBillStore } from "@/store/useBillStore";
import { Item } from "@/components/item";
import { Person } from "@/components/person";
import { PersonForm } from "@/components/PersonForm";
import { SplitSummary } from "@/components/split_summary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { split, canSplit } from "@/lib/bill";

export default function Page() {
  const { consumers, items, totalCents, addItem, setTotal } = useBillStore();
  const bill = { consumers, items, totalCents };
  const shares = useMemo(
    () => (canSplit(bill) ? split(bill) : null),
    [bill],
  );

  return (
    <main>
      <h1>Split Bill</h1>

      <section>
        <h2>People</h2>
        <ConsumerForm />
        {consumers.map((c) => (
          <div key={c.id}>{c.name}</div>
        ))}
      </section>

      <section>
        <h2>Items</h2>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} consumers={consumers} />
        ))}
        <button onClick={addItem}>+ Add Item</button>
      </section>

      <section>
        <h2>Total</h2>
        <input
          type="number"
          defaultValue={totalCents / 100}
          onBlur={(e) =>
            setTotal(Math.round(parseFloat(e.target.value) * 100))
          }
          placeholder="Total (including tax/tip)"
        />
      </section>

      {shares && (
        <section>
          <h2>Each person owes</h2>
          {consumers.map((c) => (
            <div key={c.id}>
              {c.name}: ${((shares.get(c.id) ?? 0) / 100).toFixed(2)}
            </div>
          ))}
        </section>
      )}
    </main>
  );
}



