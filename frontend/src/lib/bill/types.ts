export type Person = {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    venmo?: string;
};

export type Item = {
    id: string;
    name: string;
    priceCents: number;
    consumerIds: string[];
};

export type Bill = {
    consumers: Person[];
    items: Item[];
    totalCents: number;
};
