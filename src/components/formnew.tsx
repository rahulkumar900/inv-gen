"use client";

import React, { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../lib/hooks";

import {
  updateInvoiceField,
  generatePdfAndConvert,
  clearLogo
} from "@/lib/features/invoice/action";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import SelectState from "@/components/selectState";

import InputTable from "@/components/inputTableNew";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import Bankdetails from "./bankdetails";
import { Upload } from "lucide-react";
import Image from "next/image";
import { X } from 'lucide-react';

const FormNew = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const invoice = useSelector(
    (state: RootState) => state.counter
  );

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
      console.log(e.target);
      const { name, value, type, files } = e.target as HTMLInputElement &
        HTMLTextAreaElement;

      if (type == "file" && files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = async () => {
          const fileContent = reader.result as string;
          await dispatch(updateInvoiceField({ name, value: fileContent })).then(
            () => dispatch(generatePdfAndConvert())
          );
        };
        reader.readAsDataURL(file);
        alert("file handling");
      } else {
        await dispatch(updateInvoiceField({ name, value })).then(() =>
          dispatch(generatePdfAndConvert())
        );
      }
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

  const fileRef = useRef<HTMLInputElement>(null);

  const clickInput = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  useEffect(() => {
    dispatch(generatePdfAndConvert());
  }, [dispatch]);

  return (
    <div
      className=" bg-card mt-24 max-w-4xl mx-auto p-1 lg:p-4 xl:p-8  shadow-xl rounded-2xl border
     "
    >
      <section className="grid grid-cols-12 gap-4  md:gap-10 p-4">
        <form className="space-y-4 col-span-12 md:col-start-1   md:col-end-7 ">
          <div className="grid w-full max-w-sm items-center space-y-2">
            <Label className="text-muted-foreground" htmlFor="address">
              Your company details
            </Label>
            <Textarea
              onChange={(e) => handleChange(e)}
              className="active:ring-0 border border-muted-foreground"
              id="address"
              name="address"
              placeholder="John"
              defaultValue={invoice.address}
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center space-y-2">
            <Label className="text-muted-foreground" htmlFor="address">
              State
            </Label>
            <SelectState name="state" />
          </div>
        </form>
        <form className="space-y-4 col-span-12 md:col-start-7  md:col-end-13">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label
              className="text-muted-foreground"
              htmlFor="b_address"

              // className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Bill To
            </Label>
            <Textarea
              onChange={(e) => handleChange(e)}
              className="border border-muted-foreground"
              id="b_address"
              name="b_address"
              defaultValue={invoice.b_address}
              // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-muted-foreground" htmlFor="address">
              State
            </Label>
            <SelectState name="b_state" />
          </div>
        </form>
        <form className=" hidden space-y-4 col-span-12 md:col-start-7 md:col-end-13  ">
          <Label>Ship To</Label>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="s_address">Company Address</Label>
            <Textarea
              className="border border-muted-foreground"
              onChange={(e) => handleChange(e)}
              id="s_address"
              name="s_address"
              placeholder="John"
              defaultValue={invoice.s_address}
              required
            />
          </div>
          <div className="grid  w-full items-center gap-1.5">
            <Label htmlFor="address">State</Label>
            <SelectState name="s_name" />
          </div>
        </form>
        <form className=" grid grid-cols-subgrid items-flex-start space-y-2 col-span-12 row-start-1 ">
          <div className="col-span-full md:col-span-3 space-y-1">
            <Label className="text-muted-foreground" htmlFor="invoice_no">
              Invoice number
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="invoice_no"
              name="invoice_no"
             defaultValue={invoice.invoice_no}
              className="focus-visible:ring-0 focus-visible:border-2 tranition-all w-full border border-muted-foreground"
              // placeholder="Invoice Number"
              required
            />
          </div>
          <div className="col-span-full md:col-span-3 space-y-1">
            <Label className="text-muted-foreground" htmlFor="invoice_date">
              Invoice date
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="invoice_date"
              name="invoice_date"
              defaultValue={invoice.invoice_date}
              className="border border-muted-foreground"
              required
            />
          </div>
          <div className="col-span-full md:col-span-3 space-y-1">
            <Label className="text-muted-foreground" htmlFor="order_no">
              Order number
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="order_no"
              name="order_no"
              className="border border-muted-foreground"
              defaultValue={invoice.invoice_no}
              // placeholder="Order Number"
              required
            />
          </div>
          {/* <div className="col-span-full md:col-span-3 space-y-1">
            <Label className="text-muted-foreground" htmlFor="destination">
              Destination
            </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="text"
              id="destination"
              name="destination"
              className="border border-muted-foreground"
              // placeholder="Destination"
            />
          </div> */}
          
          <div
            
            className="col-span-full  md:col-span-3 space-y-1 l"
          >
              <Label className="text-muted-foreground">Logo</Label>
              
            {
              invoice?.logo ? (
                <div className="relative w-12 border ">
                  <div onClick={() => dispatch(clearLogo())} className="cursor-pointer absolute -top-3 -right-2 bg-destructive rounded-full p-1 "><X size={10} /></div>
                  <Image width={50} height={50}  src={invoice.logo} alt="logo"  />
                </div>
               
              ): (<>
              <div onClick={clickInput} className="cursor-pointer flex gap-2 items-center p-2 rounded-md border-muted-foreground border">
                <Upload />
                <div className="flex flex-col justify-center">
                  <div className="border-b text-md inline-block  border-muted-foreground">
                    Upload Image
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {" "}
                    JPG, JPEG, PNG
                  </div>
                </div>
              </div>
              <Input
                onChange={(e) => handleChange(e)}
                className="hidden"
                ref={fileRef}
                type="file"
                accept="image/*"
                name="logo"
                // defaultValue={invoice.logo}
              />
              </>)
            }
            
            
            
          </div>
        </form>

        <InputTable />

        <Bankdetails />
      </section>
    </div>
  );
};

export default FormNew;
