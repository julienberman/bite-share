import type { Split } from "@/lib/split_algorithm";

type SplitSummaryProps = {
  splits: Split[];
  total: string;
};

export function SplitSummary({ splits, total }: SplitSummaryProps) {
  return (
    <aside className="border border-border bg-card p-4 text-card-foreground">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">
          Split
        </h2>
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Total ${total}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {splits.length === 0 ? (
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Add people and items to calculate the split.
          </p>
        ) : null}
        {splits.map((split) => (
          <div
            key={split.consumerId}
            className="flex items-center justify-between gap-4 border border-border bg-background px-3 py-2 text-sm"
          >
            <span>{split.name}</span>
            <span>${split.amount}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
