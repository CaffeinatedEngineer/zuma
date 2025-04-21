'use client'
import UploadFormInput from "@/components/common/uploads/upload-form-input";

import { z } from "zod";
const schema = z.object({
    file: z.instanceof(File, { message: 'Invalid file type' })
    .refine((file)=> file.size <= 20 * 1024 * 1024, // 20MB limit
     'File size must be less than 20MB',
)
    .refine((file) => file.type === 'application/pdf', 
         'Only PDF files are allowed'),
});

export default function UploadForm() {
    const handleSubmit=(
        e:React.FormEvent<HTMLFormElement>
    )=> {
        e.preventDefault();
        
        console.log("Form submitted");
        const formData = new FormData(e.currentTarget);
        const file = formData.get("file") as File;

        //validating the fields
        const validatedFields = schema.safeParse({ file });

        if(!validatedFields.success) {
            console.log(validatedFields.error.flatten().fieldErrors.file?.[0]?? 'Invalid file');
            return;
        }
        //schema with zod
        //upload the file to uploadthing
        //parse the pdf using lang chain
        //summarizze the pdf using AI
        //save the summary to database
        //redirect to the [id] summary page
    }
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput onSubmit={handleSubmit} />
        </div>
    );
}

