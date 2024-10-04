// import One from "@/pdfTemplate/firstTemplate/oneTemplate";
import { Invoice as InvoiceType } from "@/lib/features/invoice/invoiceType";
import InvoiceComponent from "@/pdfTemplate/reports/Invoice";

const components = {
  zero: InvoiceComponent,
  // one: One,
  //   other: OtherComponent,
};

type ComponentKeys = keyof typeof components;

export default function PdfComponent(invoice: InvoiceType) {
  const template = invoice.template as ComponentKeys | undefined; // Ensure invoice.template is of type ComponentKeys or undefined
  // const ComponentToRender = template ? components[template] : null;
  const ComponentToRender = template ? components["zero"] : null;

  if (!ComponentToRender) {
    throw new Error(`Template "${template}" not found in components.`);
  }

  return <ComponentToRender invoice={invoice} />;
}
