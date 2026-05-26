import { create } from "zustand";
import type { Person, Item } from "@/lib/bill";

type BillStore = {
  consumers: Person[];
  items: Item[];
  totalCents: number;

  addConsumer: (name: string) => void;
  removeConsumer: (id: string) => void;
  updateConsumer: (id: string, patch: Partial<Omit<Person, "id">>) => void;

  addItem: () => void;
  removeItem: (id: string) => void;
  setItemName: (id: string, name: string) => void;
  setItemPrice: (id: string, priceCents: number) => void;

  toggleConsumer: (itemId: string, consumerId: string) => void;

  setTotal: (cents: number) => void;
};

export const useBillStore = create<BillStore>((set) => ({
  consumers: [],
  items: [],
  totalCents: 0,

  addConsumer: (name) =>
    set((s) => ({
      consumers: [...s.consumers, { id: crypto.randomUUID(), name }],
    })),

  removeConsumer: (id) =>
    set((s) => ({
      consumers: s.consumers.filter((c) => c.id !== id),
      items: s.items.map((item) => ({
        ...item,
        consumerIds: item.consumerIds.filter((cid) => cid !== id),
      })),
    })),

  updateConsumer: (id, patch) =>
    set((s) => ({
      consumers: s.consumers.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    })),

  addItem: () =>
    set((s) => ({
      items: [
        ...s.items,
        { id: crypto.randomUUID(), name: "", priceCents: 0, consumerIds: [] },
      ],
    })),

  removeItem: (id) =>
    set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

  setItemName: (id, name) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, name } : i)),
    })),

  setItemPrice: (id, priceCents) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, priceCents } : i)),
    })),

  toggleConsumer: (itemId, consumerId) =>
    set((s) => ({
      items: s.items.map((item) => {
        if (item.id !== itemId) return item;
        const has = item.consumerIds.includes(consumerId);
        return {
          ...item,
          consumerIds: has
            ? item.consumerIds.filter((id) => id !== consumerId)
            : [...item.consumerIds, consumerId],
        };
      }),
    })),

  setTotal: (totalCents) => set({ totalCents }),
}));
