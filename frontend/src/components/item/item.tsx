"use client";

import { Card } from "@/components/ui/card";
import { useBillStore } from "@/lib/bill_store/useBillStore";
import type { Item, Person } from "@/lib/bill";

type Props = {
  item: Item;
  consumers: Person[];
  onClick: () => void;
};

export function ItemCard({ item, consumers, onClick }: Props) {
  const { toggleConsumer } = useBillStore();

  const assignedConsumers = consumers.filter((c) =>
    item.consumerIds.includes(c.id),
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    const consumerId = e.dataTransfer.getData("consumerId");
    if (consumerId) toggleConsumer(item.id, consumerId);
  };

  return (
    <Card
      onClick={onClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative flex h-32 w-48 cursor-pointer flex-col rounded-lg p-3 hover:bg-accent"
    >
      <div className="flex justify-between">
        <span className="font-medium">{item.name || "Unnamed item"}</span>
        <span className="text-sm text-muted-foreground">
          ${(item.priceCents / 100).toFixed(2)}
        </span>
      </div>
      <div className="mt-auto flex flex-wrap gap-1">
        {assignedConsumers.map((c) => (
          <span
            key={c.id}
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              e.dataTransfer.setData("consumerId", c.id);
            }}
            onClick={(e) => e.stopPropagation()}
            className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground"
          >
            {c.name}
          </span>
        ))}
      </div>
    </Card>
  );
}
