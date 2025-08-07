"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "@/components/common/uploads/upload-form-input";
import { generatePDFSummary, storePDFSummary } from "@/actions/upload-action";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file type" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed"
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Uploaded successfully!");
      toast.success(
        "✅ Upload Complete: Your file has been uploaded successfully."
      );
    },
    onUploadError: (err) => {
      console.error("Error occurred while uploading", err);
      toast.error("❌ Upload Failed: An error occurred during upload.");
      formRef.current?.reset();
      setIsLoading(false);
    },
    onUploadBegin: (fileName: string) => {
      console.log("Upload has begun for", fileName);
      toast("📄 Uploading PDF... Your file upload has started.");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form submitted");
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        const errorMsg =
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file";
        toast.error(errorMsg);
        formRef.current?.reset();
        setIsLoading(false);
        return;
      }

      toast.info(
        "📄 Processing PDF... Hang tight! Your file is being processed."
      );
      const resp = await startUpload([file]);

      if (!resp) {
        toast.error("❌ Something went wrong: Error uploading file.");
        formRef.current?.reset();
        setIsLoading(false);
        return;
      }

      toast.success(
        "✅ Upload Successful: Your PDF has been uploaded successfully."
      );
      console.log("File uploaded successfully:", resp);

      const result = await generatePDFSummary(resp);
      const { data = null } = result || {};

      if (data) {
        let storeResult : any;
        toast("📄 Saving PDF... Hang tight, we are saving your summary");
        
        if (data.summary){
          storeResult = await storePDFSummary({
            summary: data.summary,
            fileUrl: resp[0].url, // Changed from resp[0].serverData.file.url
            title: data.title,
            fileName: file.name,
          });
          toast.success("✅ PDF Summary Generated: Your summary has been saved.");
          formRef.current?.reset();

        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("❌ Something went wrong: Unexpected error occurred.");
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        ref={formRef}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
