import type { Bill } from "./types";

export function split(bill: Bill): Map<string, number> {
  const shares = new Map(bill.consumers.map((c) => [c.id, 0]));
  const subtotal = sum(bill.items.map((i) => i.priceCents));
  const scale = bill.totalCents / subtotal;

  for (const item of bill.items) {
    const scaled = Math.round(item.priceCents * scale);
    const base = Math.floor(scaled / item.consumerIds.length);
    const extra = scaled % item.consumerIds.length;

    item.consumerIds.forEach((id, i) => {
      shares.set(id, shares.get(id)! + base + (i < extra ? 1 : 0));
    });
  }

  return shares;
}

function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}
