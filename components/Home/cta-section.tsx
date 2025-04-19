import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-12">
      <div
        className="py-12 lg:py-24 max-w-5xl mx-auto 
        px-4 sm:px-6 lg:px-8"
      >
        <div className="space-y-6 text-center">
          <h2
            className="text-3xl font-bold tracking-tighter 
            sm:text-4xl md:text-5xl"
          >
            Ready To Save Hours of Reading Time?
          </h2>
          <p
            className="mx-auto max-w-[700px] text-gray-500
            md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            Transform lengthy documents into clear, actionable insights with
            our AI-powered summarizer.
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <Button
            size="lg"
            variant={"link"}
            className="rounded-full bg-gradient-to-r from-slate-900 to-rose-500
            hover:from-rose-500 hover:to-slate-900
            hover:text-white text-white transition-all duration-300"
          >
            <Link
              href="#pricing"
              className="flex items-center justify-center"
            >
              Get Started{" "}
              <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}