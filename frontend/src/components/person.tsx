"use client";

import { Button } from "@/components/ui/button";

type PersonProps = {
  consumer: {
    id: string;
    name: string;
  };
  isSelected: boolean;
  onSelect: (consumerId: string) => void;
};

export function Person({ consumer, isSelected, onSelect }: PersonProps) {
  return (
    <Button
      draggable
      className="h-12 w-full justify-start border-border px-4 text-sm uppercase tracking-[0.2em]"
      type="button"
      variant={isSelected ? "default" : "outline"}
      onClick={() => onSelect(consumer.id)}
      onDragStart={(event) => {
        event.dataTransfer.setData("consumer_id", consumer.id);
      }}
    >
      {consumer.name}
    </Button>
  );
}
