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
    <section className="aspect-square border border-border bg-card p-3 text-card-foreground">
      <UploadButton
        appearance={{
          allowedContent: "hidden",
          button:
            "h-full w-full rounded-none border-0 bg-transparent text-lg uppercase tracking-[0.18em] text-foreground shadow-none after:bg-foreground hover:bg-transparent",
          container: "h-full w-full",
        }}
        content={{
          button: isParsing ? "Reading" : "Upload receipt.",
        }}
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
      {isParsing || message ? (
        <p className="mt-2 truncate text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {isParsing ? "Reading receipt..." : message}
        </p>
      ) : null}
    </section>
  );
}
