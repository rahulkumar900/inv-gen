"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="w-full border-b   ">
      <header className="flex justify-between  items-center py-2 px-4  mx-auto">
        <nav className="flex row items-center ">
          <Link
            href="#"
            className=" text-muted-foreground hover:text-foreground text-base"
          >
            LOGO
          </Link>

          <Link
            href="#"
            className="px-3 py-2 text-muted-foreground hover:text-foreground text-base"
          >
            Home
          </Link>
          <Link
            href="#"
            className="px-3 py-2 text-muted-foreground hover:text-foreground text-base"
          >
            Home
          </Link>
          <Link
            href="#"
            className="px-3 py-2 text-muted-foreground hover:text-foreground text-base"
          >
            Home
          </Link>
          <Link
            href="#"
            className="px-3 py-2 text-muted-foreground hover:text-foreground text-base"
          >
            Home
          </Link>
          <Link
            href="#"
            className="px-3 py-2 text-muted-foreground hover:text-foreground text-base"
          >
            Home
          </Link>
          <Link
            href="#"
            className="px-3 py-2 text-muted-foreground hover:text-foreground text-base"
          >
            Home
          </Link>
          <Link
            href="#"
            className="px-3 py-2 text-muted-foreground hover:text-foreground text-base"
          >
            Home
          </Link>
          <Link
            href="#"
            className="px-3 py-2 text-muted-foreground hover:text-foreground text-base"
          >
            Home
          </Link>
        </nav>
        <div className="space-x-2">
          <Button variant="outline">Login</Button>
          <Button>Signup</Button>
        </div>
      </header>
    </div>
  );
}
