type Split = {
  amount: string;
  consumer_id: string;
  name: string;
};

type SplitSummaryProps = {
  isLoading: boolean;
  splits: Split[];
  total: string;
};

export function SplitSummary({ isLoading, splits, total }: SplitSummaryProps) {
  return (
    <aside className="border border-border bg-muted p-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold tracking-tight">Split</h2>
        <p className="text-xs text-muted-foreground">
          {isLoading ? "Updating" : `Total $${total || "0.00"}`}
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {splits.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            Add receipt items to calculate the split.
          </p>
        ) : null}
        {splits.map((split) => (
          <div
            key={split.consumer_id}
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
