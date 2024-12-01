import PdfPageComponent from "@/app/pdfPage";
import React from "react";

export default function Page() {
  return (
    <>
      <div className="hidden lg:block w-2/5 bg-secondary ">
        <PdfPageComponent />
      </div>
    </>
  );
}
