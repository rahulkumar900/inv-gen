"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { toggleTemplateAsync, generatePdfAndConvert } from "@/lib/features/invoice/action";
import { AppDispatch } from "@/lib/store";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area"


const templates = [
  {
    name: "Zero",
    src: "./zero.jpg"
},
  {
    name: "One",
    src: "./one.jpg",
},
];

export default function TemplateList() {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (template: string) => {
    dispatch(toggleTemplateAsync({ template }))
      .then(() => dispatch(generatePdfAndConvert()))
      .catch((error) => {
        console.error("Error occurred while dispatching actions:", error);
        // Handle error as needed
      });
  };

  return (
    <ScrollArea className="h-screen w-full rounded-md ">
      <div  className="w-full  relative   space-y-8">
          <Image onClick={() => handleClick("zero")} className="w-full border shadow-md  bg-gray-100 cursor-pointer h-auto object-cover object-center" src="/zero.jpg"  height={300} width="500"  alt="template" />
          <Image onClick={() => handleClick("one")} className="w-full border shadow-md  bg-gray-100 cursor-pointer h-auto object-cover object-center" src="/one.jpg"  height={300} width="500"  alt="template" />
        </div>
   
    </ScrollArea>
  );
}
