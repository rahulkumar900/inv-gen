import React, { ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Plus, PlusIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "./ui/input";
import { useAppDispatch } from "@/lib/hooks";
import { AppDispatch } from "@/lib/store";
import {
  generatePdfAndConvert,
  updateInvoiceField,
} from "@/lib/features/invoice/action";
export default function Bankdetails() {
  const dispatch: AppDispatch = useAppDispatch();
  const debounce = <T extends any[]>(
    func: (...args: T) => void,
    delay: number
  ): ((...args: T) => void) => {
    let timeoutId: NodeJS.Timeout;

    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Wrap your handleChange function with debounce
  const debouncedHandleChange = debounce(
    async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      await dispatch(updateInvoiceField({ name, value })).then(() =>
        dispatch(generatePdfAndConvert())
      );
    },
    500
  ); // Change delay according to your preference

  // Your original handleChange function
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    debouncedHandleChange(e);
  };
  return (
    <>
      <div className=" md:col-start-1   md:col-end-6 col-span-12">
        <Accordion
          type="single"
          collapsible
          className="w-full px-4 bg-secondary"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Add Bank details</AccordionTrigger>
            <AccordionContent className=" ">
              <div className="space-y-2">
                <Input
                  onChange={handleChange}
                  name="bankname"
                  className="focus-visible:ring-0"
                  placeholder="Bank Name"
                  type="text"
                />
                <Input
                  onChange={handleChange}
                  name="ifsc"
                  className="focus-visible:ring-0"
                  placeholder="IFSC Code"
                  type="text"
                />
                <Input
                  onChange={handleChange}
                  name="accountnumber"
                  className="focus-visible:ring-0"
                  placeholder="Account Number"
                  type="text"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
