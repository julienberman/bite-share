"use client";

import { useEffect, useState } from "react";

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

  const visibleSplits = items.length === 0 ? [] : splits;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-2 border-b border-border pb-5">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          bite-share
        </p>
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Split the night without doing receipt math.
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Upload receipts, fix anything the model misses, assign people to
              what they had, and let the backend calculate the split.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Bill total</span>
            <Input
              className="w-32"
              inputMode="decimal"
              value={total}
              onChange={(event) => setTotal(event.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex flex-col gap-5">
          <UploadPanel
            isParsing={isParsing}
            message={statusMessage}
            onReceiptUploaded={handleReceiptUploaded}
          />

          <section className="border border-border bg-card p-4 text-card-foreground">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  People
                </h2>
                <p className="text-xs text-muted-foreground">
                  Drag a person to an item, or select a person and tap an item.
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  aria-label="Consumer name"
                  placeholder="Friend name"
                  value={newConsumerName}
                  onChange={(event) => setNewConsumerName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      addConsumer();
                    }
                  }}
                />
                <Button type="button" onClick={addConsumer}>
                  Add
                </Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
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
          </section>

          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  Items
                </h2>
                <p className="text-xs text-muted-foreground">
                  Edit item names and prices before splitting.
                </p>
              </div>
              <Button type="button" variant="outline" onClick={addItem}>
                Add item
              </Button>
            </div>
            {items.length === 0 ? (
              <div className="border border-dashed border-border p-6 text-sm text-muted-foreground">
                Upload a receipt or add an item manually to start.
              </div>
            ) : null}
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
              />
            ))}
          </section>
        </div>

        <SplitSummary
          isLoading={isSplitting}
          splits={visibleSplits}
          total={total}
        />
      </div>
    </main>
  );
}
