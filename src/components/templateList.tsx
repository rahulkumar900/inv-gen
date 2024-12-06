"use client";
import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import {
  toggleTemplateAsync,
  generatePdfAndConvert,
} from "@/lib/features/invoice/action";
import { AppDispatch } from "@/lib/store";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

const templates = [
  {
    name: "A",
    src: "./A.WEBP",
  },
  {
    name: "B",
    src: "./one.WEBP",
  },
];

export default function TemplateList() {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (template: string) => {
    dispatch(toggleTemplateAsync({ template })).catch((error) => {
      console.error("Error occurred while dispatching actions:", error);
      // Handle error as needed
    });
  };

  return (
    <ScrollArea className="h-screen w-full rounded-md ">
      <Suspense fallback={"loading ..."}>
        <div className="w-full  relative   space-y-8">
          <Image
            onClick={() => handleClick("A")}
            className="w-full border shadow-md  bg-gray-100 cursor-pointer h-auto object-cover object-center"
            src="/A.WEBP"
            height={300}
            width="500"
            priority
            alt="Invoice template"
          />
          <Image
            onClick={() => handleClick("B")}
            className="w-full border shadow-md  bg-gray-100 cursor-pointer h-auto object-cover object-center"
            src="/B.WEBP"
            priority
            height={300}
            width="500"
            alt="Invoice Template"
          />
        </div>
      </Suspense>
    </ScrollArea>
  );
}
