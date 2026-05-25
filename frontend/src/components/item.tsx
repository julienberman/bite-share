"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Consumer = {
  id: string;
  name: string;
};

type BillItem = {
  id: string;
  name: string;
  price: string;
  consumerIds: string[];
};

type ItemProps = {
  consumers: Consumer[];
  item: BillItem;
  selectedConsumerId: string | null;
  onAssignConsumer: (itemId: string, consumerId: string) => void;
  onNameChange: (itemId: string, name: string) => void;
  onPriceChange: (itemId: string, price: string) => void;
  onRemove: (itemId: string) => void;
  onToggleConsumer: (itemId: string, consumerId: string) => void;
};

export function Item({
  consumers,
  item,
  selectedConsumerId,
  onAssignConsumer,
  onNameChange,
  onPriceChange,
  onRemove,
  onToggleConsumer,
}: ItemProps) {
  return (
    <section
      className="flex flex-col gap-3 border border-border bg-card p-3 text-card-foreground"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        const consumerId = event.dataTransfer.getData("consumer_id");
        if (consumerId) {
          onAssignConsumer(item.id, consumerId);
        }
      }}
    >
      <div className="grid gap-2 sm:grid-cols-[1fr_8rem_auto]">
        <Input
          aria-label="Item name"
          value={item.name}
          onChange={(event) => onNameChange(item.id, event.target.value)}
        />
        <Input
          aria-label="Item price"
          inputMode="decimal"
          value={item.price}
          onChange={(event) => onPriceChange(item.id, event.target.value)}
        />
        <Button type="button" variant="ghost" onClick={() => onRemove(item.id)}>
          Remove
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {consumers.map((consumer) => {
          const isAssigned = item.consumerIds.includes(consumer.id);
          return (
            <Button
              key={consumer.id}
              type="button"
              variant={isAssigned ? "default" : "outline"}
              onClick={() => onToggleConsumer(item.id, consumer.id)}
            >
              {consumer.name}
            </Button>
          );
        })}
      </div>
      {selectedConsumerId ? (
        <Button
          type="button"
          variant="secondary"
          onClick={() => onAssignConsumer(item.id, selectedConsumerId)}
        >
          Add selected person
        </Button>
      ) : null}
    </section>
  );
}
