"use client";

import { useState } from "react";
import { useBillStore } from "@/store/useBillStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Person } from "@/lib/bill";

type Props = {
  person: Person;
  onClose: () => void;
};

export function ConsumerDetail({ person, onClose }: Props) {
  const updateConsumer = useBillStore((s) => s.updateConsumer);
  const [email, setEmail] = useState(person.email ?? "");
  const [phone, setPhone] = useState(person.phone ?? "");
  const [venmo, setVenmo] = useState(person.venmo ?? "");

  const handleSave = () => {
    updateConsumer(person.id, {
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      venmo: venmo.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">{person.name}</h3>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="555-555-5555"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="venmo">Venmo</Label>
        <Input
          id="venmo"
          value={venmo}
          onChange={(e) => setVenmo(e.target.value)}
          placeholder="@username"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </div>
  );
}
