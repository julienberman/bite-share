"use client";

import { useEffect, useState } from "react";
import { Plus } from "@phosphor-icons/react";

import { Item } from "@/components/item";
import { Person } from "@/components/person";
import { SplitSummary } from "@/components/split_summary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadPanel } from "@/components/upload_panel";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Consumer = {
  id: string;
  name: string;
};

type BillItem = {
  consumerIds: string[];
  id: string;
  name: string;
  price: string;
  type: "food" | "drink";
};

type Split = {
  amount: string;
  consumer_id: string;
  name: string;
};

type ParsedReceipt = {
  items: {
    name: string;
    price: string;
  }[];
  receipt_id: string;
  subtotal: string | null;
  total: string | null;
};

function decimalToCents(value: string): number | null {
  const normalized = value.trim();
  if (!/^\d+(\.\d{0,2})?$/.test(normalized)) {
    return null;
  }

  const [dollars, cents = ""] = normalized.split(".");
  return Number(dollars) * 100 + Number(cents.padEnd(2, "0"));
}

function centsToDecimal(cents: number): string {
  const dollars = Math.floor(cents / 100);
  const remainingCents = String(cents % 100).padStart(2, "0");
  return `${dollars}.${remainingCents}`;
}

function normalizeMoney(value: string): string {
  const cents = decimalToCents(value);
  return cents === null ? value : centsToDecimal(cents);
}

export default function Home() {
  const [consumers, setConsumers] = useState<Consumer[]>(() => [
    { id: crypto.randomUUID(), name: "Me" },
  ]);
  const [items, setItems] = useState<BillItem[]>([]);
  const [newConsumerName, setNewConsumerName] = useState("");
  const [selectedConsumerId, setSelectedConsumerId] = useState<string | null>(
    null,
  );
  const [splits, setSplits] = useState<Split[]>([]);
  const [total, setTotal] = useState("0.00");
  const [isParsing, setIsParsing] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const totalCents = decimalToCents(total);
    const hasValidItems = items.every((item) => {
      return decimalToCents(item.price) !== null && item.consumerIds.length > 0;
    });

    if (totalCents === null || !hasValidItems) {
      return;
    }

    const controller = new AbortController();

    async function splitBill() {
      setIsSplitting(true);
      const response = await fetch(`${apiUrl}/bills/split`, {
        body: JSON.stringify({
          consumers,
          items: items.map((item) => ({
            consumer_ids: item.consumerIds,
            id: item.id,
            name: item.name,
            price: normalizeMoney(item.price),
          })),
          total: normalizeMoney(total),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        signal: controller.signal,
      });
      const data = (await response.json()) as { splits: Split[] };
      setSplits(
        data.splits.map((split) => ({
          ...split,
          amount: normalizeMoney(String(split.amount)),
        })),
      );
      setIsSplitting(false);
    }

    splitBill().catch(() => {
      if (!controller.signal.aborted) {
        setIsSplitting(false);
      }
    });

    return () => controller.abort();
  }, [consumers, items, total]);

  function addConsumer() {
    const name = newConsumerName.trim();
    if (!name) {
      return;
    }

    setConsumers((currentConsumers) => [
      ...currentConsumers,
      { id: crypto.randomUUID(), name },
    ]);
    setNewConsumerName("");
  }

  function addItem() {
    setItems((currentItems) => [
      ...currentItems,
      {
        consumerIds: [consumers[0].id],
        id: crypto.randomUUID(),
        name: "New item",
        price: "0.00",
        type: "food",
      },
    ]);
  }

  function assignConsumer(itemId: string, consumerId: string) {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== itemId || item.consumerIds.includes(consumerId)) {
          return item;
        }

        return {
          ...item,
          consumerIds: [...item.consumerIds, consumerId],
        };
      }),
    );
  }

  async function handleReceiptUploaded(imageUrl: string, fileName: string) {
    setIsParsing(true);
    setStatusMessage(`Parsing ${fileName}`);

    const response = await fetch(`${apiUrl}/receipts/parse`, {
      body: JSON.stringify({ image_url: imageUrl }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const receipt = (await response.json()) as ParsedReceipt;
    const defaultConsumerId = consumers[0].id;
    const parsedItems = receipt.items.map((item) => ({
      consumerIds: [defaultConsumerId],
      id: crypto.randomUUID(),
      name: item.name,
      price: normalizeMoney(String(item.price)),
      type: "food" as const,
    }));

    setItems((currentItems) => [...currentItems, ...parsedItems]);
    setTotal((currentTotal) => {
      const receiptTotal = receipt.total ?? receipt.subtotal;
      const receiptCents = receiptTotal
        ? decimalToCents(String(receiptTotal))
        : null;
      const currentCents = decimalToCents(currentTotal);

      if (receiptCents === null || currentCents === null) {
        return currentTotal;
      }

      return centsToDecimal(currentCents + receiptCents);
    });
    setStatusMessage(`Added ${parsedItems.length} items from ${fileName}`);
    setIsParsing(false);
  }

  function removeItem(itemId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  }

  function toggleConsumer(itemId: string, consumerId: string) {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        const isAssigned = item.consumerIds.includes(consumerId);
        if (isAssigned && item.consumerIds.length === 1) {
          return item;
        }

        return {
          ...item,
          consumerIds: isAssigned
            ? item.consumerIds.filter((id) => id !== consumerId)
            : [...item.consumerIds, consumerId],
        };
      }),
    );
  }

  function updateItemName(itemId: string, name: string) {
    setItems((currentItems) =>
      currentItems.map((item) => {
        return item.id === itemId ? { ...item, name } : item;
      }),
    );
  }

  function updateItemPrice(itemId: string, price: string) {
    setItems((currentItems) =>
      currentItems.map((item) => {
        return item.id === itemId ? { ...item, price } : item;
      }),
    );
  }

  function updateItemType(itemId: string, type: "food" | "drink") {
    setItems((currentItems) =>
      currentItems.map((item) => {
        return item.id === itemId ? { ...item, type } : item;
      }),
    );
  }

  const visibleSplits = items.length === 0 ? [] : splits;
  const suggestedFriendName = newConsumerName.trim();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="flex h-16 items-center justify-end border-b border-border px-5 sm:px-8">
        <Button type="button" variant="outline">
          Sign In
        </Button>
      </nav>

      <div className="grid gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_2fr_1fr] lg:gap-8">
        <section className="lg:min-h-[calc(100vh-8rem)]">
          <h1 className="font-semibold uppercase leading-none tracking-[0.04em] text-foreground">
            <span className="text-[clamp(4rem,9vw,8.5rem)]">B</span>
            <span className="align-[0.18em] text-[clamp(2rem,4.5vw,4.2rem)] tracking-[0.18em]">
              ITE
            </span>
            <br />
            <span className="text-[clamp(4rem,9vw,8.5rem)]">S</span>
            <span className="align-[0.18em] text-[clamp(2rem,4.5vw,4.2rem)] tracking-[0.18em]">
              HARE
            </span>
          </h1>
          <p className="mt-5 max-w-72 text-lg leading-snug">
            Split a night out with friends. No receipt math.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <header className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold uppercase tracking-[0.14em]">
              Add items to the bill.
            </h2>
            <label className="flex items-center gap-2 text-xs uppercase tracking-[0.18em]">
              Total
              <Input
                className="h-11 w-28 text-base"
                inputMode="decimal"
                value={total}
                onChange={(event) => setTotal(event.target.value)}
              />
            </label>
          </header>

          <div className="grid grid-cols-2 gap-4">
            <Button
              className="aspect-square h-auto flex-col gap-4 bg-card text-foreground hover:bg-card"
              type="button"
              variant="outline"
              onClick={addItem}
            >
              <Plus aria-hidden="true" className="size-16" />
            </Button>
            <UploadPanel
              isParsing={isParsing}
              message={statusMessage}
              onReceiptUploaded={handleReceiptUploaded}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <Item
                key={item.id}
                consumers={consumers}
                item={item}
                selectedConsumerId={selectedConsumerId}
                onAssignConsumer={assignConsumer}
                onNameChange={updateItemName}
                onPriceChange={updateItemPrice}
                onRemove={removeItem}
                onToggleConsumer={toggleConsumer}
                onTypeChange={updateItemType}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold uppercase tracking-[0.14em]">
            Add friends.
          </h2>
          <div className="relative">
            <Input
              aria-label="Friend name"
              className="h-11 text-base"
              placeholder="Friend name"
              value={newConsumerName}
              onChange={(event) => setNewConsumerName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addConsumer();
                }
              }}
            />
            {suggestedFriendName ? (
              <Button
                className="mt-2 h-11 w-full justify-start uppercase tracking-[0.16em]"
                type="button"
                variant="secondary"
                onClick={addConsumer}
              >
                Add {suggestedFriendName}
              </Button>
            ) : null}
          </div>
          <div className="flex flex-col gap-3">
            {consumers.map((consumer) => (
              <Person
                key={consumer.id}
                consumer={consumer}
                isSelected={selectedConsumerId === consumer.id}
                onSelect={(consumerId) =>
                  setSelectedConsumerId(
                    selectedConsumerId === consumerId ? null : consumerId,
                  )
                }
              />
            ))}
          </div>
          <SplitSummary
            isLoading={isSplitting}
            splits={visibleSplits}
            total={total}
          />
        </section>
      </div>
    </main>
  );
}
