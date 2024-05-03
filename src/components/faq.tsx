import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="p-4">
        <AccordionTrigger className="text-xl">
          What is invoice in Accounting
        </AccordionTrigger>
        <AccordionContent className="text-base">
          An invoice in accounting is a document issued by a seller to a buyer,
          detailing the products or services provided, their quantities, prices,
          and terms of sale. It serves as a request for payment from the buyer
          for the goods or services received. Invoices typically include
          information such as: 1.Invoice Number, 2.Seller Information,3.Buyer
          4.Information,5.Description of Goods or Services,6.Total Amount Due,
          7.Payment Terms.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="p-4">
        <AccordionTrigger className="text-xl">What is receipt</AccordionTrigger>
        <AccordionContent className="text-base">
          A receipt is a document that acknowledges the transfer of goods or
          services and confirms the payment received for those goods or
          services. Unlike an invoice, which is issued by the seller to the
          buyer before payment is made, a receipt is issued by the seller to the
          buyer after payment has been made. Receipts typically contain 1. Date,
          2. Seller Informarion, 3.Buyer Information, 4.Description of Goods or
          Services, 5.Amount Paid, 6. Payment Method, 7. Receipt Number,
        </AccordionContent>
      </AccordionItem>
     
      <AccordionItem value="item-3" className="p-4">
        <AccordionTrigger className="text-xl">
          Invoice Vs Receipt
        </AccordionTrigger>
        <AccordionContent className="text-base">
          An invoice initiates the transaction by requesting payment from the
          buyer, while a receipt completes the transaction by confirming that
          payment has been received. Both documents are essential for
          record-keeping, accounting, and financial management purposes.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
