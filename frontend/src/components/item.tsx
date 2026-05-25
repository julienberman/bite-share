"use client";

import { ForkKnife, Martini, X } from "@phosphor-icons/react";

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
  type: "food" | "drink";
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
  onTypeChange: (itemId: string, type: "food" | "drink") => void;
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
  onTypeChange,
}: ItemProps) {
  return (
    <section
      className="flex aspect-square flex-col justify-between border border-border bg-card p-4 text-card-foreground"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        const consumerId = event.dataTransfer.getData("consumer_id");
        if (consumerId) {
          onAssignConsumer(item.id, consumerId);
        }
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button
            aria-label="Food item"
            className="size-9"
            type="button"
            variant={item.type === "food" ? "default" : "outline"}
            onClick={() => onTypeChange(item.id, "food")}
          >
            <ForkKnife aria-hidden="true" />
          </Button>
          <Button
            aria-label="Drink item"
            className="size-9"
            type="button"
            variant={item.type === "drink" ? "default" : "outline"}
            onClick={() => onTypeChange(item.id, "drink")}
          >
            <Martini aria-hidden="true" />
          </Button>
        </div>
        <Button
          aria-label="Remove item"
          className="size-9"
          type="button"
          variant="ghost"
          onClick={() => onRemove(item.id)}
        >
          <X aria-hidden="true" />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Input
          aria-label="Item name"
          className="h-11 text-base"
          value={item.name}
          onChange={(event) => onNameChange(item.id, event.target.value)}
        />
        <Input
          aria-label="Item price"
          className="h-11 text-base"
          inputMode="decimal"
          value={item.price}
          onChange={(event) => onPriceChange(item.id, event.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {consumers.map((consumer) => {
          const isAssigned = item.consumerIds.includes(consumer.id);
          return (
            <Button
              key={consumer.id}
              className="h-7 px-2 text-[0.65rem] uppercase tracking-[0.14em]"
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
          className="h-8 text-[0.65rem] uppercase tracking-[0.14em]"
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
