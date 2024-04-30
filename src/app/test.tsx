"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const maxWidth = 600;
const maxHeight = 400 * 1.416040100250627;
export default function Test() {
  const [file, setFile] = useState<PDFFile>("sample.pdf");
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [base64URL, setBase64URL] = useState("");
  const [pdfWidth, setPdfWidth] = useState<number | null>(null);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const memorizedOption = useMemo(() => ({ ...options }), []);

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

  const loadSkelton = () => {
    return (
      <div className=" p-8 absolute top-0 left-0    w-full mx-auto h-full">
        <div className="relative w-full h-full overflow-hidden">
          <div className="animate-pulse grid grid-cols-12 gap-6">
            <div className="h-6 bg-slate-200 rounded col-span-6"></div>
            <div className="h-3  rounded col-span-6"></div>
            <div className="h-3 bg-slate-200 rounded col-span-6"></div>
            <div className="h-3 bg-slate-200 rounded col-span-6"></div>
            <div className="h-3 bg-slate-200 rounded col-span-6"></div>
            <div className="h-3 bg-slate-200 rounded col-span-6"></div>
            <div className="h-3 bg-slate-200 rounded col-span-6"></div>
            <div className="h-3 bg-slate-200 rounded col-span-6"></div>
            <div className="h-5 bg-slate-200 rounded col-span-12"></div>
            <div className="h-3 bg-slate-200 rounded col-span-12"></div>
            <div className="h-3 bg-slate-200 rounded col-span-12"></div>
            <div className="h-3 bg-slate-200 rounded col-span-12"></div>
            <div className="h-3 bg-slate-200 rounded col-span-12"></div>
            <div className="h-3 bg-slate-200 rounded col-span-12"></div>
            <div className="h-3 bg-slate-200 rounded col-span-12"></div>
            <div className="h-3 bg-slate-200 rounded col-span-12"></div>
            <div className="h-8 bg-slate-200 rounded col-span-12"></div>
          </div>
        </div>
      </div>
    );
  };

  const width = containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth;
  const height =
    (containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth) *
    1.416040100250627;

  return (
    <div
      className="p-4  -z-2  sticky top-[65px] flex justify-center items-center h-screen  bg-previewContainer  border-l"
      ref={setContainerRef}
    >
      <div
        className={`relative group w-full grid place-items-center  `}
      >
        {!loading && (
          <Document
            file={base64String || file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={loadSkelton}
            options={options}
          >
            <Page
              pageNumber={1}
              // width={width ? Math.min(width, maxWidth) : maxWidth}
              width={
                containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
              }
            />

            {/* {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))} */}
          </Document>
        )}

        <div className="text-center z-50 absolute bottom-10 left-0  transition-all duration-300 ease-in-out  justify-center hidden  group-hover:flex w-full">
          <div className="block relative ">
            <div className="inline-flex overflow-hidden gap-2 items-center bg-muted border-2 shadow-md shadow-slate-200 ">
              <Button
                type="button"
                variant="outline"
                disabled={pageNumber <= 1}
                onClick={previousPage}
                className="rounded-none border-none"
                size="icon"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="inline-flex min-w-max ">
                {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
              </div>
              <Button
                type="button"
                className="rounded-none border-none"
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
    </div>
  );
}
