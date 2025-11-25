"use client";
import Link from "next/link";
import { Mail, Linkedin, Youtube, Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#F0F0F0] bg-white py-10 px-5">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Get in touch */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900">GET IN TOUCH</h4>
            <ul className="mt-4 space-y-3 text-neutral-700">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-neutral-500" />
                <Link
                  href="mailto:support@zuma.ai"
                  className="transition-colors hover:text-primary"
                >
                  shashankshiv.jha@gmail.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900">FOLLOW ME</h4>
            <ul className="mt-4 space-y-3 text-neutral-700">
              <li>
                <Link
                  href="https://www.linkedin.com/in/shashank-jha-981858266/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Linkedin className="size-4" />
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/CaffeinatedEngineer"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Github className="size-4" />
                  Github
                </Link>
              </li>
            </ul>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer Navigation">
            <h4 className="text-sm font-semibold text-neutral-900">SITEMAP</h4>
            <ul className="mt-4 space-y-3 text-neutral-700">
              <li>
                <Link href="/#hero" className="transition-colors hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="https://github.com/CaffeinatedEngineer/" target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
                  Open Source
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="transition-colors hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mailing list */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900">JOIN OUR MAILING LIST</h4>
            <form className="mt-4 space-y-3">
              <Input
                type="email"
                placeholder="name@email.com"
                className="h-11 rounded-md border-neutral-200 text-neutral-900 placeholder:text-neutral-500 focus-visible:border-neutral-400"
              />
              <Button type="submit" className="w-full h-11">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Divider and bottom bar */}
        <div className="mt-10 border-t border-[#F0F0F0] pt-6">
          <p className="text-center text-sm text-neutral-600">
            © 2025 Zuma AI. Made with ❤️ by Shashank Jha.
          </p>
        </div>
      </div>
    </footer>
  );
}