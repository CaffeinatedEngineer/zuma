import BgGradient from "@/components/common/bg-gradient";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="relative flex justify-center items-center min-h-screen w-full overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <BgGradient className="from-rose-400 via-rose-300 to-orange-200 opacity-30" />
      </div>
      
      
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        <SignIn />
      </div>
    </section>
  );
}