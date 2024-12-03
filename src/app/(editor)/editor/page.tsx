import PdfPageComponent from "@/app/pdfPage";
import FormNew from "@/components/formnew";
import React, { Suspense, useEffect, useState } from "react";
import { type ClassValue, clsx } from "clsx";

import { useAppSelector } from "@/lib/hooks";

export default function Editor() {
  // const [editorMode, seteditorMode] = useState(false);

  return  null;
  // (
  //   <>
  //     <div
  //       className={clsx(
  //         "md:w-3/5 w-full px-8 grid items-center bg-background md:overflow-y-scroll scrollbar-none",
  //         {
  //           // block: !editorMode,
  //           // hidden: editorMode,
  //         }
  //       )}
  //     >
  //       <Suspense fallback="loading...">
  //         <FormNew />
  //       </Suspense>
  //     </div>
  //     <div className="hidden lg:block w-2/5 bg-secondary ">
  //       <Suspense fallback="loading ...">
  //         <PdfPageComponent />
  //         {/* <PDFPreview  /> */}
  //       </Suspense>
  //     </div>
  //   </>
  // );
}
