"use client";
import Test from "@/app/test";
import Form from "@/components/form";
import { generatePdfAndConvert } from "@/lib/features/invoice/action";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { AppDispatch } from "@/lib/store";
import { type ClassValue, clsx } from "clsx";

export default function Editor() {
  const [editorMode, seteditorMode] = useState(false);

  return (
    <>
      <div
        className={clsx("md:w-3/5 w-full bg-secondary md:overflow-y-scroll", {
          block: !editorMode,
          hidden: editorMode,
        })}
      >
        <Form />
      </div>
      <div className="hiden md:block w-2/5 bg-previewContainer ">
        <Suspense fallback="loading ...">
          <Test />
        </Suspense>
      </div>
    </>
  );
}