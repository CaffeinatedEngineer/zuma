'use client'
import UploadFormInput from "@/components/common/uploads/upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "@/components/ui/sonner"; // Importing the useToast hook from the sonner library
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
    const {toast} = useToast();
    const { startUpload, routeConfig } = useUploadThing(
      'pdfUploader', {
        onClientUploadComplete: () => {
          console.log('uploaded successfully!');
        },
        onUploadError: (err) => {
          console.error('error occurred while uploading', err);
          toast({
            title: 'Upload failed',
            description: 'err.message',
          })
        },
        onUploadBegin: ({ file }) => {
          console.log('upload has begun for', file);
        },
      }
    );



    const handleSubmit=async(
        e:React.FormEvent<HTMLFormElement>
    )=> {
        e.preventDefault();
        
        console.log("Form submitted");
        const formData = new FormData(e.currentTarget);
        const file = formData.get("file") as File;

        //validating the fields
        const validatedFields = schema.safeParse({ file });

        if(!validatedFields.success) {
            console.log(validatedFields.error.flatten().
            fieldErrors.file?.[0]?? 'Invalid file');
            toast({
                title: '❌ Something went wrong',
                variant: 'destructive',
                description: validatedFields.error.flatten().
                fieldErrors.file?.[0]?? 'Invalid file'
                
                
            });
            return;
        }
        toast({
            title: '📄Processing PDF...',
            description: 'Hang tight ! Your file is being processed',});
        //schema with zod
        //upload the file to uploadthing
        

        const resp = await startUpload([file]);
        if (!resp) {
            toast({
                title: '❌ Something went wrong',
                variant: 'destructive',
                description: 'Error uploading file. Use a different file',
            });
            return;
        }
        toast({
            title: '📄Uploading PDF...',
            description: 'We are uploading your PDF',});
        
        //parse the pdf using lang chain
        //summarizze the pdf using AI
        //save the summary to database
        //redirect to the [id] summary page
    };
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput onSubmit={handleSubmit} />
        </div>
    );
}

function useToast(): { toast: any; } {
    throw new Error("Function not implemented.");
}

