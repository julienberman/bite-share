"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BillItem, Person } from "@/lib/split_algorithm";

type ItemProps = {
  consumers: Person[];
  item: BillItem;
  onNameChange: (itemId: string, name: string) => void;
  onPriceChange: (itemId: string, price: string) => void;
  onRemove: (itemId: string) => void;
  onToggleConsumer: (itemId: string, consumerId: string) => void;
};

export function Item({
  consumers,
  item,
  onNameChange,
  onPriceChange,
  onRemove,
  onToggleConsumer,
}: ItemProps) {
  return (
    <section className="border border-border bg-card p-4 text-card-foreground">
      <div className="grid gap-2 sm:grid-cols-[1fr_8rem_auto]">
        <Input
          aria-label="Item name"
          className="h-10 text-sm"
          placeholder="Item"
          value={item.name}
          onChange={(event) => onNameChange(item.id, event.target.value)}
        />
        <Input
          aria-label="Item price"
          className="h-10 text-sm"
          inputMode="decimal"
          placeholder="0.00"
          value={item.price}
          onChange={(event) => onPriceChange(item.id, event.target.value)}
        />
        <Button
          className="h-10"
          type="button"
          variant="outline"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </Button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {consumers.length === 0 ? (
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Add people first.
          </p>
        ) : null}
        {consumers.map((consumer) => {
          const isAssigned = item.consumerIds.includes(consumer.id);
          return (
            <Button
              key={consumer.id}
              className="h-8 text-xs"
              type="button"
              variant={isAssigned ? "default" : "outline"}
              onClick={() => onToggleConsumer(item.id, consumer.id)}
            >
              {consumer.name || "Unnamed"}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
