"use client";

import type { Person } from "@/lib/bill";

type Props = {
    person: Person;
    onClick: () => void;
};

function getContact(person: Person): string | null {
    return person.venmo ?? person.phone ?? person.email ?? null;
}

export function ConsumerChip({ person, onClick }: Props) {
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("consumerId", person.id);
    };

    const contact = getContact(person);

    return (
        <button
            type="button"
            draggable
            onClick={onClick}
            onDragStart={handleDragStart}
            className="flex max-w-40 cursor-grab items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-left active:cursor-grabbing"
        >
            <span className="truncate text-sm font-medium text-primary-foreground">
                {person.name}
            </span>
            {contact && (
                <span className="truncate text-xs text-primary-foreground/60">
                    {contact}
                </span>
            )}
        </button>
    );
}
