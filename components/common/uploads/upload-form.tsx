'use client'
import UploadFormInput from "@/components/common/uploads/upload-form-input";

export default function UploadForm() {
    const handleSubmit=()=> {
        console.log("Form submitted");
    }
    return (
        <div className="flex flex-col items-center justify-center gap-6 text-center">
            <UploadFormInput onSubmit={handleSubmit} />
        </div>
    );
}

