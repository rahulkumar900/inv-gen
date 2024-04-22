"use client";
import React, { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "../lib/hooks";
import { updateInvoiceField } from "../lib/features/invoice/invoiceSlice";
import { generatePdfAndConvert } from "../lib/features/invoice/action";
import Inv from "@/components/reports/Invoice";
import data from "@/components/reports/data/invoice";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import SelectState from "@/components/selectState";

import InputTable from "@/components/inputTable";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Timeout } from "@types/node";

const Form = () => {
  const dispatch = useAppDispatch();
  let count = useAppSelector((state: RootState) => state.counter);

  // Define a debounce function
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
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      dispatch(updateInvoiceField({ name, value }));
      const updatedCount = { ...count, [name]: value };
      dispatch(generatePdfAndConvert(Inv, updatedCount));
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

  useEffect(() => {
    dispatch(generatePdfAndConvert(Inv, count));
  }, []);

  return (
    <div className="">
      <section className="grid grid-cols-12 gap-4 md:grid-rows-2 md:gap-10 px-4">
        <form className="space-y-4 col-span-12 md:col-start-1 lg:col-start-2  md:col-end-7 ">
          <Label>Bill From</Label>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="company_name"
            >
              Company Name
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="company_name"
              defaultValue={count.company}
              className="w-full"
              placeholder="John"
              required
              name="company"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="address"
            >
              Company Address
            </Label>
            <Textarea
              onChange={(e) => handleChange(e)}
              id="address"
              name="address"
              placeholder="John"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="address">State</Label>
            <SelectState name="state" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="gst_pan"
            >
              GST or PAN
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="gst_pan"
              placeholder="GST No. or PAN No."
              required
              name="gst_pan"
            />
          </div>
        </form>
        <form className="space-y-4 col-span-12 md:col-start-1 lg:col-start-2 md:col-end-7">
          <Label>Bill To</Label>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="b_company"
              // className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company Name
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="b_company"
              // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
              name="b_company"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="b_address"
              // className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company Address
            </Label>
            <Textarea
              onChange={(e) => handleChange(e)}
              id="b_address"
              name="b_address"
              // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="address">State</Label>
            <SelectState name="b_state" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="b_gst_pan"
            >
              GST or PAN
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="b_gst_pan"
              placeholder="GST No. or PAN No."
              required
              name="b_gst_pan"
            />
          </div>
        </form>
        <form className="space-y-4 col-span-12 md:col-start-7 md:col-end-13 lg:col-end-12 ">
          <Label>Ship To</Label>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="s_company"
            >
              Company Name
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="s_company"
              placeholder="John"
              required
              name="s_company"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="s_address"
            >
              Company Address
            </Label>
            <Textarea
              onChange={(e) => handleChange(e)}
              id="s_address"
              name="s_address"
              placeholder="John"
              required
            />
          </div>
          <div className="grid  w-full items-center gap-1.5">
            <Label htmlFor="address">State</Label>
            <SelectState name="s_name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="s_gst_pan"
              // className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              GST or PAN
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="s_gst_pan"
              // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="GST No. or PAN No."
              required
              name="s_gst_pan"
            />
          </div>
        </form>
        <form className="space-y-4 col-span-12 md:col-start-7 md:col-end-13 lg:col-end-12 row-start-1 row-end-2">
          <div className="grid  lg:grid-cols-[130px_1fr] items-center gap-2">
            <Label
              htmlFor="invoice_no"
            >
              #invoice Number
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="invoice_no"
              name="invoice_no"
              className="w-full"
              placeholder="Invoice Number"
              required
            />
          </div>
          <div className="grid  lg:grid-cols-[130px_1fr] items-center gap-2">
            <Label
              htmlFor="invoice_date"
            >
              Invoice Date
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="invoice_date"
              name="invoice_date"
              placeholder="Invoice Date"
              required
            />
          </div>
          <div className="grid  lg:grid-cols-[130px_1fr] items-center gap-2">
            <Label
              htmlFor="order_no"
            >
              Order Number
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="order_no"
              name="order_no"
              placeholder="Order Number"
              required
            />
          </div>
          <div className="grid lg:grid-cols-[130px_1fr] items-center gap-2">
            <Label
              htmlFor="destination"
            >
              Destination
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="destination"
              name="destination"
              placeholder="Destination"
            />
          </div>
        </form>
      </section>
      <InputTable />
    </div>
  );
};

export default Form;
