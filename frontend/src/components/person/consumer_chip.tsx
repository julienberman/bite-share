"use client";

import { useState } from "react";
import { ConsumerDetail } from "@/components/ConsumerDetail";
import type { Person } from "@/lib/bill";

type Props = {
  person: Person;
};

function getContact(person: Person): string | null {
  return person.venmo ?? person.phone ?? person.email ?? null;
}

export function ConsumerChip({ person }: Props) {
  const [editing, setEditing] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("consumerId", person.id);
  };

  const contact = getContact(person);

  return (
    <>
      <div
        draggable
        onDragStart={handleDragStart}
        onDoubleClick={() => setEditing(true)}
        className="flex max-w-40 cursor-grab items-center gap-1.5 rounded-full bg-primary px-3 py-1 active:cursor-grabbing"
      >
        <span className="truncate text-sm font-medium text-primary-foreground">
          {person.name}
        </span>
        {contact && (
          <span className="truncate text-xs text-primary-foreground/60">
            {contact}
          </span>
        )}
      </div>
      {editing && (
        <ConsumerDetail person={person} onClose={() => setEditing(false)} />
      )}
    </>
  );
}
