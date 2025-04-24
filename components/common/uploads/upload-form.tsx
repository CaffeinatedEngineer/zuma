'use client';

import UploadFormInput from "@/components/common/uploads/upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner"; // Correctly import toast from sonner
import { z } from "zod";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file type" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024, // 20MB limit
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed"
    ),
});

export default function UploadForm() {
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Uploaded successfully!");
      toast.success("✅ Upload Complete: Your file has been uploaded successfully.");
    },
    onUploadError: (err) => {
      console.error("Error occurred while uploading", err);
      toast.error("❌ Upload Failed: An error occurred during upload.");
    },
    onUploadBegin: (fileName: string) => {
      console.log("Upload has begun for", fileName);
      toast("📄 Uploading PDF... Your file upload has started.");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // Validate the fields
    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      toast.error(
        validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file"
      );
      return;
    }

    toast.info("📄 Processing PDF... Hang tight! Your file is being processed.");

    // Upload the file to UploadThing
    const resp = await startUpload([file]);
    if (!resp) {
      toast.error("❌ Something went wrong: Error uploading file.");
      return;
    }

    toast.success("✅ Upload Successful: Your PDF has been uploaded successfully.");

    // Additional logic: parse the PDF, summarize it, save to database, etc.
    console.log("File uploaded successfully:", resp);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
