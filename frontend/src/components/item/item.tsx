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
    const { removeItem, toggleConsumer } = useBillStore();

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

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        removeItem(item.id);
    };

    return (
        <Card
            onClick={onClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative flex min-h-36 w-full cursor-pointer flex-col p-4 hover:bg-accent"
        >
            <button
                type="button"
                aria-label={`Delete ${item.name || "item"}`}
                onClick={handleRemove}
                className="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                >
                    <path d="M4 7h16" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M6 7l1 14h10l1-14" />
                    <path d="M9 7V4h6v3" />
                </svg>
            </button>

            <div className="flex max-w-[calc(100%-2rem)] flex-col gap-1">
                <span className="truncate text-sm font-semibold">
                    {item.name || "Unnamed item"}
                </span>
                <span className="text-lg font-semibold tabular-nums text-muted-foreground">
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
