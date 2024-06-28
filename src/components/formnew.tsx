"use client";

import React, { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../lib/hooks";

import {
  updateInvoiceField,
  generatePdfAndConvert,
} from "@/lib/features/invoice/action";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import SelectState from "@/components/selectState";

import InputTable from "@/components/inputTableNew";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import Bankdetails from "./bankdetails";

const FormNew = () => {
  const dispatch: AppDispatch = useAppDispatch();
  // let count = useSelector((state: RootState) => state.counter);

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

  useEffect(() => {
    dispatch(generatePdfAndConvert());
  }, [dispatch]);

  return (
    <div
      className=" bg-background mt-24 max-w-4xl mx-auto p-10  shadow-xl rounded-2xl border
     "
    >
      <section className="grid grid-cols-12 gap-4  md:gap-10 p-4">
        <form className="space-y-4 col-span-12 md:col-start-1   md:col-end-7 ">
          <Label>Bill From</Label>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="address">Company Address</Label>
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
        </form>
        <form className="space-y-4 col-span-12 md:col-start-1  md:col-end-7">
          <Label>Bill To</Label>

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
        </form>
        <form className="space-y-4 col-span-12 md:col-start-7 md:col-end-13  ">
          <Label>Ship To</Label>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="s_address">Company Address</Label>
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
        </form>
        <form className=" grid grid-cols-subgrid items-center col-span-12 row-start-1 ">
        
          <div className="col-span-3">
            <Label className="text-muted-foreground" htmlFor="invoice_no">#invoice Number</Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="invoice_no"
              name="invoice_no"
              className="w-full "
              // placeholder="Invoice Number"
              required
            />
          </div>
          <div className="col-span-3">
            <Label className="text-muted-foreground" htmlFor="invoice_date">Invoice Date</Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="invoice_date"
              name="invoice_date"
              // placeholder="Invoice Date"
              required
            />
          </div>
          <div className="col-span-3">
            <Label className="text-muted-foreground" htmlFor="order_no">Order Number</Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="order_no"
              name="order_no"
              // placeholder="Order Number"
              required
            />
          </div>
          <div className="col-span-3">
            <Label className="text-muted-foreground" htmlFor="destination">Destination</Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="destination"
              name="destination"
              // placeholder="Destination"
            />
          </div>
        </form>

        <InputTable />
        <Bankdetails />
      </section>
    </div>
  );
};

export default FormNew;
