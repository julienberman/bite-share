"use client";
import { useState } from "react";
import { useBillStore } from "@/store/useBillStore";
import { Input } from "@/components/ui/input";

export function SearchConsumers() {
  const [query, setQuery] = useState("");
  const addConsumer = useBillStore((s) => s.addConsumer);

  const handleSelect = () => {
    if (!query.trim()) return;
    addConsumer(query.trim());
    setQuery("");
  };

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Add friend..."
      />
      {query.trim() && (
        <ul className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-md">
          {/* future: map over backend search results here */}
          <li
            onClick={handleSelect}
            className="cursor-pointer px-3 py-2 text-sm hover:bg-accent"
          >
            Create &ldquo;{query.trim()}&rdquo;
          </li>
        </ul>
      )}
    </div>
  );
}
