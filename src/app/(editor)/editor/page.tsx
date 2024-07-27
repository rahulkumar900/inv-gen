"use client";
import Test from "@/app/test";
import FormNew from "@/components/formnew";
import { generatePdfAndConvert } from "@/lib/features/invoice/action";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { AppDispatch } from "@/lib/store";
import { type ClassValue, clsx } from "clsx";
import { ArrowLeft } from "lucide-react";
import {Button} from "@/components/ui/button"

export default function Editor() {
  const [editorMode, seteditorMode] = useState(false);

  return (
    <>
      <div
        className={clsx("md:w-3/5 w-full bg-background md:overflow-y-scroll", {
          block: !editorMode,
          hidden: editorMode,
        })}
      >
        <div className="mt-20 px-4">
        <Button variant="secondary" >
        <ArrowLeft size={24} />
        </Button>
          </div>
        
        <FormNew />
      </div>
      <div className="hidden lg:block w-2/5 bg-previewContainer ">
        <Suspense fallback="loading ...">
          <Test />
        </Suspense>
      </div>
    </>
  );
}
