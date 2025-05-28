import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
export const  ourFileRouter = {
    pdfUploader: f({ pdf: {maxFileSize: '32MB'} 
    }).middleware(async({req})=> {
        const user= await currentUser();

        if(!user) throw new
         UploadThingError("Unauthorized");
        return { userId: user.id };
    }).onUploadComplete(async ({metadata, file}) => {
            console.log("File uploaded", metadata.userId);
            console.log("File url", file);
            // Perform any necessary operations here, but do not return incompatible objects
            return; // Ensure the function returns void
        }

    ),
}satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
