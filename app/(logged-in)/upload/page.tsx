import BgGradient from "@/components/common/bg-gradient";
import UploadHeader from "@/components/common/uploads/upload-header"; 
import UploadForm from "@/components/common/uploads/upload-form";  
import { Upload } from "lucide-react";


export default function Page() {
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
        <UploadHeader />
        <UploadForm/></div>
      </div>
    </section>
  );
}