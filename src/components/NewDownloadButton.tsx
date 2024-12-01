"use client";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Invoice from "@/pdfTemplate/reports/Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { Suspense } from "react";
import { Button } from "./ui/button";

export default function NewDownloadButton() {
  const data = useAppSelector((state: RootState) => state.counter);

  return (
    <Suspense fallback="loading ...">
      <Button className="min-w-[130px] px-4 py-2 flex justify-center items-center">
        <PDFDownloadLink
          document={<Invoice invoice={data} />}
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? <span>Loading.. </span> : <span>Download</span>
          }
        </PDFDownloadLink>
      </Button>
    </Suspense>
  );
}
