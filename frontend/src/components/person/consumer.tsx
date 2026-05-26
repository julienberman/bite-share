"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Person as BillPerson } from "@/lib/split_algorithm";

type PersonProps = {
  person: BillPerson;
  onNameChange: (personId: string, name: string) => void;
  onRemove: (personId: string) => void;
};

export function Person({ person, onNameChange, onRemove }: PersonProps) {
  return (
    <div className="flex gap-2">
      <Input
        aria-label="Person name"
        className="h-10 text-sm"
        placeholder="Name"
        value={person.name}
        onChange={(event) => onNameChange(person.id, event.target.value)}
      />
      <Button
        className="h-10"
        type="button"
        variant="outline"
        onClick={() => onRemove(person.id)}
      >
        Remove
      </Button>
    </div>
  );
}
