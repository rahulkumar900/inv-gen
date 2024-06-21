import React, { useState } from "react";
import { ThemeProvider } from "./themeContext";
import Invoice from "@/components/reports/Invoice";
import One from "@/pdfTemplate/firstTemplate/oneTemplate";
// import OtherComponent from './OtherComponent';
import StoreProvider from "@/app/StoreProvider";
import { Invoice as InvoiceType } from "@/lib/features/invoice/invoiceType";

const components = {
  one: One,
  //   other: OtherComponent,
};

type ComponentKeys = keyof typeof components;

export default function PdfComponent(invoice: InvoiceType) {
  const [currentComponent, setCurrentComponent] =
    useState<ComponentKeys>("one");
  const ComponentToRender = components[currentComponent];

  return (
    <ThemeProvider component={currentComponent}>
      <ComponentToRender />
      {/* <Invoice invoice={invoice} /> */} 
      {/* <One /> */}
    </ThemeProvider>
  );
}
