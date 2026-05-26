import { createElement } from "react";
import type { ReactNode } from "react";

type UploadFile = {
    name: string;
    ufsUrl: string;
};

type UploadButtonProps = {
    appearance?: Record<string, string | undefined>;
    content?: {
        button?: (state: { isUploading: boolean; ready: boolean }) => ReactNode;
    };
    endpoint: string;
    onClientUploadComplete?: (files: UploadFile[]) => void;
    onUploadError?: (error: Error) => void;
};

export function UploadButton({ content }: UploadButtonProps) {
    return createElement(
        "button",
        { disabled: true, type: "button" },
        content?.button?.({ isUploading: false, ready: false }) ??
            "Uploads unavailable",
    );
}
