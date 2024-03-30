"use client";

import { useCallback, useEffect, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Quixote from "./Quote";
import Inv from "@/components/reports/Invoice";
import data from "@/components/reports/data/invoice";
import "./sample.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { pdf } from "@react-pdf/renderer";
import { useAppSelector } from "@/lib/hooks";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

// const maxWidth = 1200;
const maxWidth = 800;

type PDFFile = string | File | null;

export default function Test() {
  const [file, setFile] = useState<PDFFile>("sample.pdf");
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [base64URL, setBase64URL] = useState("");

  const { base64String, loading, error } = useAppSelector(
    (state) => state.counter
  );

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const [base64Data, setBase64Data] = useState<string>("");

  // useEffect(() => {
  //   const generatePdfAndConvert = async () => {
  //     try {
  //       // Generate the PDF
  //       const pdfBlob = await pdf(<Inv invoice={data} />).toBlob();

  //       // Convert the PDF Blob to base64
  //       const reader = new FileReader();
  //       reader.readAsDataURL(pdfBlob);
  //       reader.onloadend = () => {
  //         const base64String = reader.result as string;
  //         setFile(base64String);
  //       };
  //     } catch (error) {
  //       console.error("Error generating or converting PDF:", error);
  //     }
  //   };

  //   generatePdfAndConvert();
  // }, []);

  // console.log(base64Data);

  return (
    <div className="Example grid place-items-center w-full h-full">
      {/* <header>
        <h1>react-pdf sample page</h1>
      </header> */}
      <div className="Example__container  ">
        <div className="Example__container__document" ref={setContainerRef}>
          <Document
            file={base64String}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <Page
              pageNumber={pageNumber}
              // width={
              //   containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
              // }
            />
          </Document>
          <div>
            <p>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
