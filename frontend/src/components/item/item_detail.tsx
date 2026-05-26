"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoneyInput } from "@/components/ui/money_input";
import { useBillStore } from "@/lib/bill_store/useBillStore";
import type { Item, Person } from "@/lib/bill";

type Props = {
    item: Item;
    consumers: Person[];
    onClose: () => void;
};

export function ItemDetail({ item, consumers, onClose }: Props) {
    const { setItemName, setItemPrice, toggleConsumer } = useBillStore();
    const [name, setName] = useState(item.name);

    const handleSave = () => {
        setItemName(item.id, name.trim());
        onClose();
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">Edit Item</h3>
                <Button type="button" onClick={handleSave}>
                    Save
                </Button>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setItemName(item.id, e.target.value);
                    }}
                    placeholder="Item name"
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="price">Price</Label>
                <MoneyInput
                    id="price"
                    valueCents={item.priceCents}
                    onValueChange={(valueCents) =>
                        setItemPrice(item.id, valueCents)
                    }
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
        </div>
    );
}
