"use client";

import { UploadButton } from "@/lib/uploadthing";

type UploadPanelProps = {
  isParsing: boolean;
  message: string | null;
  onReceiptUploaded: (imageUrl: string, fileName: string) => void;
};

export function UploadPanel({
  isParsing,
  message,
  onReceiptUploaded,
}: UploadPanelProps) {
  return (
    <section className="border border-border bg-card p-4 text-card-foreground">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold tracking-tight">
          Upload receipts
        </h2>
        <p className="text-xs text-muted-foreground">
          Upload one receipt image at a time. Each receipt adds items to this
          bill.
        </p>
      </div>
      <div className="mt-4">
        <UploadButton
          endpoint="receiptImage"
          onClientUploadComplete={(files) => {
            const file = files[0];
            if (file) {
              onReceiptUploaded(file.url, file.name);
            }
          }}
          onUploadError={(error) => {
            window.alert(error.message);
          }}
        />
      </div>
      {isParsing || message ? (
        <p className="mt-3 text-xs text-muted-foreground">
          {isParsing ? "Reading receipt..." : message}
        </p>
      ) : null}
    </section>
  );
}
