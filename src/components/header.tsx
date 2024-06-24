

import Link from "next/link";
import { Button } from "./ui/button";
import DownloadButton from "./downloadButton";
import { ReceiptText } from "lucide-react";
import { ModeToggle } from "./themeButton";

export default function Header() {
  return (
    <div className="w-full overflow-hidden  grid grid-cols-12 fixed top-0 left-0 z-20  bg-background   ">
      <header className="flex justify-between  items-center py-2 px-4 h-16  col-start-1 col-end-13 ">
        <Link
          href="/"
          className="gap-2 flex items-center text-muted-foreground hover:text-foreground text-base"
        >
          <ReceiptText className=" w-10 h-10 text-primary" />
          <span className="text-2xl text-primary font-semibold">
            Invoice Generator
          </span>
        </Link>
        <nav className="flex row items-center divide-x-2 ">
          <menu className="hidden md:flex row items-center">
            <Link
              href="#"
              className="px-3 py-2 text-muted-foreground hover:text-foreground text-base"
            >
              Invoice
            </Link>
            <Link
              href="#"
              className="px-3 py-2 text-muted-foreground hover:text-foreground text-base"
            >
              Blog
            </Link>

            <Link
              href="#"
              className="px-3 py-2 text-muted-foreground hover:text-foreground text-base"
            >
              FAQ
            </Link>
          </menu>
          <div className="space-x-2 flex pl-4">
            <ModeToggle />
            
            <Button className="hidden md:block" variant="outline">
              Login
            </Button>
            <Button className="hidden  md:block">Signup</Button>
          </div>
        </nav>
      </header>
    </div>
  );
}
