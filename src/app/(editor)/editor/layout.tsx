import React, { ReactNode } from "react";

import Link from "next/link";
import { Ghost, PanelLeft, ReceiptText } from "lucide-react";
import { ModeToggle } from "@/components/themeButton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import DownloadButton from "@/components/downloadButton";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import TemplateList from "@/components/templateList";
import NewDownloadButton from "@/components/NewDownloadButton";

function Header() {
  return (
    <div className="w-full border-b grid grid-cols-12 fixed top-0 left-0 z-20  bg-background   ">
      <header className="flex justify-between  items-center  px-4 py-2   col-start-1 col-end-13 ">
        <Sheet>
          <SheetTrigger asChild>
            <PanelLeft className="cursor-pointer" xlinkTitle="select Title" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Select Template</SheetTitle>
              <TemplateList />
              <SheetDescription>
                Make changes to your profile here. Click save when you &apos re
                done.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <nav className="flex row items-center divide-x-2 ">
          <menu className="hidden md:flex row items-center">
            <Link
              href="/"
              className="px-3 py-2 text-muted-foreground hover:text-foreground text-base"
            >
              Home
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
            {/* <DownloadButton /> */}
            <NewDownloadButton />
          </div>
        </nav>
      </header>
    </div>
  );
}

export default function EdiorLayout({
  children,
  editorForm,
  preview,
}: {
  children: ReactNode;
  editorForm: ReactNode;
  preview: ReactNode;
}) {
  return (
    <section className="w-full h-screen max-h-screen flex">
      <Header />
      {editorForm}
      {preview}
    </section>
  );
}
