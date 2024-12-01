"use client";
import React, { useCallback, useMemo, useState } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import Invoice from "@/pdfTemplate/reports/Invoice";
import { Invoice as InvoiceType } from "@/lib/features/invoice/invoiceType";
import { useAppSelector } from "@/lib/hooks";
import useResizeObserver from "@/lib/resizehooks";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight } from "lucide-react";

const resizeObserverOptions = {};
type PDFFile = string | File | null;
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const loadSkelton = () => {
  return (
    <div className=" w-[400px] h-565   aspect-[400/565] bg-white mx-auto h-auto">
      <div className="relative w-full p-8 h-full overflow-hidden">
        <div className="animate-pulse grid grid-cols-12 gap-6">
          <div className="h-6 bg-slate-200 rounded col-span-6"></div>
          <div className="h-3  rounded col-span-6"></div>
          <div className="h-3 bg-secondary rounded col-span-6"></div>
          <div className="h-3 bg-secondary rounded col-span-6"></div>
          <div className="h-3 bg-secondary rounded col-span-6"></div>
          <div className="h-3 bg-secondary rounded col-span-6"></div>
          <div className="h-3 bg-secondary rounded col-span-6"></div>
          <div className="h-3 bg-secondary rounded col-span-6"></div>
          <div className="h-5 bg-secondary rounded col-span-12"></div>
          <div className="h-3 bg-secondary rounded col-span-12"></div>
          <div className="h-3 bg-secondary rounded col-span-12"></div>
          <div className="h-3 bg-secondary rounded col-span-12"></div>
          <div className="h-3 bg-secondary rounded col-span-12"></div>
          <div className="h-3 bg-secondary rounded col-span-12"></div>
          <div className="h-3 bg-secondary rounded col-span-12"></div>
          <div className="h-3 bg-secondary rounded col-span-12"></div>
          <div className="h-8 bg-secondary rounded col-span-12"></div>
        </div>
      </div>
    </div>
  );
};

const maxWidth = 400;
const maxHeight = 400 * 1.416040100250627;
const PDFPreview = () => {
  const data = useAppSelector((state) => state.counter);
  const [file, setFile] = useState<PDFFile>("/sample.pdf");
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [base64URL, setBase64URL] = useState("");
  const [pdfWidth, setPdfWidth] = useState<number | null>(null);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  //   const memorizedOption = useMemo(() => ({ ...options }), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const width = containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth;
  const height =
    (containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth) *
    1.416040100250627;

  return (
    <BlobProvider document={<Invoice invoice={data} />}>
      {({ blob, url, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Something went wrong: {error as Error}</div>;

        return (
          <div
            className="p-4  -z-2    flex justify-center items-center h-screen"
            ref={setContainerRef}
          >
            <div className={`relative group w-full grid place-items-center  `}>
              <Document
                options={options}
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={loadSkelton}
                className="kutta"
              >
                <Page
                  pageNumber={pageNumber}
                  // width={width ? Math.min(width, maxWidth) : maxWidth}
                  width={
                    containerWidth
                      ? Math.min(containerWidth, maxWidth)
                      : maxWidth
                  }
                />
              </Document>

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
                      {pageNumber || (numPages ? 1 : "--")} of{" "}
                      {numPages || "--"}
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
      }}
    </BlobProvider>
  );
};

export default PDFPreview;
