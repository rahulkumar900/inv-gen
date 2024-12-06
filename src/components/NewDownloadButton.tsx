"use client";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Invoice from "@/pdfTemplate/reports/Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "./ui/button";
import SecondDesign from "@/pdfTemplate/SecondTemplate";
import componentsMap from "@/pdfComponent/componentMap";

export default function NewDownloadButton() {
  const data = useAppSelector((state: RootState) => state.counter);

  const { template } = data;

  const [SelectedComponent, setSelectedComponent] =
    useState<React.ComponentType<any>>();

  useEffect(() => {
    setSelectedComponent(() =>
      template ? componentsMap[template] : componentsMap["A"]
    );
  }, [template]);
  return (
    <Suspense fallback="loading ...">
      <Button className="min-w-[130px] px-4 py-2 flex justify-center items-center">
        {SelectedComponent && (
          <PDFDownloadLink
            document={<SelectedComponent invoice={data} />}
            fileName="somename.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? <span>Loading.. </span> : <span>Download</span>
            }
          </PDFDownloadLink>
        )}
      </Button>
    </Suspense>
  );
}
