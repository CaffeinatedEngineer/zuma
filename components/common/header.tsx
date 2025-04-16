
import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";

export default function Header() {
  const isLoggedIn = false;

  return (
    <nav
      className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto"
    >
      <div className="flex lg:flex-1">
        <NavLink
          href="/"
          className="flex items-center gap-1 lg:gap-2 shrink-0"
        >
          <FileText
            className="h-5 w-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition"
          />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Zuma
          </span>
        </NavLink>
      </div>

      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        {isLoggedIn &&
        <NavLink href="/#dashboard">Your Summaries</NavLink>}
      </div>

      <div className="flex lg:justify-end lg:flex-1">
        {isLoggedIn ? (
          <div>
            <NavLink href="/upload" className="">
              Upload a PDF
            </NavLink>
            <div>Pro</div>
            <Button>User</Button>
            </div>
          
        ) : (
            <div className="flex gap-4">
            
            <NavLink href="/#signin">Sign In</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}