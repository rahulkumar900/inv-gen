import React, { useState } from "react";

import One from "@/pdfTemplate/firstTemplate/oneTemplate";

import { Invoice  } from "@/lib/features/invoice/invoiceType";

const components = {
  one: One,
  //   other: OtherComponent,
};

type ComponentKeys = keyof typeof components;

export default function PdfComponent(invoice:Invoice) {
  console.log(invoice)
  const [currentComponent, setCurrentComponent] =
    useState<ComponentKeys>("one");
  const ComponentToRender = components[currentComponent];

  return <ComponentToRender invoice={invoice} />;
}
