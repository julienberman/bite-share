import { createUploadthing, type FileRouter } from "uploadthing/next";

const uploadthing = createUploadthing();

export const uploadRouter = {
  receiptImage: uploadthing({
    image: {
      maxFileCount: 1,
      maxFileSize: "8MB",
    },
  }).onUploadComplete(({ file }) => {
    return {
      name: file.name,
      url: file.ufsUrl,
    };
  }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
