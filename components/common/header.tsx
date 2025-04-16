import Link from "next/link";
import { FileText } from 'lucide-react';
export default function Header(){
    return (
        <nav className="container flex items-center
         justify-between py-4 lg:px-8 px-2 mx-auto">
            <div className="flex lg: flex-1">
            <Link href="/" className="flex items-center
            gap-1 lg:gap-2 shrink-0">
                <FileText className="h-5 w-5 lg: w-8 h-8
                 text-gray-900 hover:rotate-12
                 transform transition " /><span className="font-extrabold
                  lg:text-xl text-gray-900">Zuma</span>
                </Link>
            </div>
            <div>

                <Link href="/#pricing" >Pricing</Link>
            </div>
            <div>
                <Link href="/#signin">Sign In</Link>
            </div>  
        </nav>
    );
}