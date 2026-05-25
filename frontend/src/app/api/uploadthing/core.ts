import { createUploadthing, type FileRouter } from "uploadthing/next";

const uploadthing = createUploadthing();

export const uploadRouter = {
  receiptImage: uploadthing({
    image: {
      maxFileCount: 1,
      maxFileSize: "8MB",
    },
  })
    .middleware(() => {
      return { uploadedBy: "anonymous" };
    })
    .onUploadComplete(({ file, metadata }) => {
      return {
        name: file.name,
        uploadedBy: metadata.uploadedBy,
        url: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
