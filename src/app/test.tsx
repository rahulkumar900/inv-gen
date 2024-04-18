"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { useAppSelector } from "@/lib/hooks";
import useResizeObserver from "@/lib/resizehooks";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

type PDFFile = string | File | null;

const resizeObserverOptions = {};

const maxWidth = 500;
export default function Test() {
  const [file, setFile] = useState<PDFFile>("sample.pdf");
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [base64URL, setBase64URL] = useState("");
  const [pdfWidth, setPdfWidth] = useState<number | null>(null);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const debouncedOnResize = useCallback(
    debounce<ResizeObserverCallback>(
      (entries) => {
        const [entry] = entries;
        if (entry) {
          console.log(entry.contentRect.width);
          setContainerWidth(entry.contentRect.width);
        }
      },
      300 // Debounce delay in milliseconds
    ),
    [setContainerWidth]
  );

  useResizeObserver(containerRef, resizeObserverOptions, debouncedOnResize);

  const { base64String, loading, error } = useAppSelector(
    (state) => state.counter
  );

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
    <div
      // className="Example  p-4 grid   place-items-center   bg-gray-500 max-h-screen overflow-auto h-screen fixed top-0 "
      className=" p-4 -z-2 sticky top-0 flex justify-center items-center h-screen bg-muted-foreground border-l"
      // className="bg-blue-200 p-4 -z-2 sticky top-[48px] flex justify-center items-center h-[calc(100vh-48px)]"
      ref={setContainerRef}
    >
      <div className="">
        <Document
          file={base64String}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          <Page
            pageNumber={pageNumber}
            // width={width ? Math.min(width, maxWidth) : maxWidth}
            width={
              containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
            }
          />
        </Document>
        <div className="text-center">
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <div className="space-x-3">
            <Button
              type="button"
              variant="outline"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              size="icon"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              size="icon"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
