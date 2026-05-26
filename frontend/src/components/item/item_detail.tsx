"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBillStore } from "@/lib/bill_store/useBillStore";
import type { Item, Person } from "@/lib/bill";

type Props = {
  item: Item;
  consumers: Person[];
  onClose: () => void;
};

export function ItemDetail({ item, consumers, onClose }: Props) {
  const { setItemName, setItemPrice, toggleConsumer, removeItem } =
    useBillStore();
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState((item.priceCents / 100).toFixed(2));

  const handleSave = () => {
    setItemName(item.id, name.trim());
    const cents = Math.round(parseFloat(price) * 100);
    setItemPrice(item.id, isNaN(cents) ? 0 : cents);
    onClose();
  };

  const handleRemove = () => {
    removeItem(item.id);
    onClose();
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Edit Item</h3>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>People</Label>
        <div className="flex flex-wrap gap-2">
          {consumers.map((c) => {
            const assigned = item.consumerIds.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleConsumer(item.id, c.id)}
                className={`rounded-full px-3 py-1 text-sm ${
                  assigned
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleRemove}>
          Delete
        </Button>
      </div>
    </div>
  );
}
