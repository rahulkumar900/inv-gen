"use client";
import React, { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "../lib/hooks";
import { updateInvoiceField } from "../lib/features/invoice/invoiceSlice";
import { generatePdfAndConvert } from "../lib/features/invoice/action";
import Inv from "@/components/reports/Invoice";
import data from "@/components/reports/data/invoice";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const Form = () => {
  const dispatch = useAppDispatch();
  let count = useAppSelector((state: RootState) => state.counter);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(updateInvoiceField({ name, value }));
    const updatedCount = { ...count, [name]: value };
    setTimeout(() => {
      dispatch(generatePdfAndConvert(Inv, updatedCount));
    }, 5000); // 10 seconds delay
  };

  return (
    <div className="grid grid-cols-12 grid-rows-2 gap-10">
      <form className="space-y-4 col-start-2 col-end-7">
        <div>
          <label
            htmlFor="company_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Name
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="company_name"
            defaultValue={count.company}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
            name="company"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Address
          </label>
          <textarea
            onChange={(e) => handleChange(e)}
            id="address"
            name="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>
        <div>
          <label
            htmlFor="gst_pan"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            GST or PAN
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="gst_pan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="GST No. or PAN No."
            required
            name="gst_pan"
          />
        </div>
      </form>
      <form className="space-y-4 col-start-2 col-end-7">
        <div>
          <label
            htmlFor="b_company"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Name
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="b_company"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
            name="b_company"
          />
        </div>
        <div>
          <label
            htmlFor="b_address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Address
          </label>
          <textarea
            onChange={(e) => handleChange(e)}
            id="b_address"
            name="b_address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>
        <div>
          <label
            htmlFor="b_gst_pan"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            GST or PAN
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="b_gst_pan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="GST No. or PAN No."
            required
            name="b_gst_pan"
          />
        </div>
      </form>
      <form className="space-y-4 col-start-7 col-end-12">
        <div>
          <label
            htmlFor="s_company"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Name
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="s_company"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
            name="s_company"
          />
        </div>
        <div>
          <label
            htmlFor="s_address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Address
          </label>
          <textarea
            onChange={(e) => handleChange(e)}
            id="s_address"
            name="s_address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>
        <div>
          <label
            htmlFor="s_gst_pan"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            GST or PAN
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="s_gst_pan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="GST No. or PAN No."
            required
            name="s_gst_pan"
          />
        </div>
      </form>
      <form className="space-y-4 col-start-7 col-end-12 row-start-1 row-end-2">
        <div className="grid grid-cols-[130px_1fr] items-center gap-2">
          <label
            htmlFor="invoice_no"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            #invoice Number
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="invoice_no"
            name="invoice_no"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Invoice Number"
            required
          />
        </div>
        <div className="grid grid-cols-[130px_1fr] items-center gap-2">
          <label
            htmlFor="invoice_date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Invoice Date
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="invoice_date"
            name="invoice_date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Invoice Number"
            required
          />
        </div>
        <div className="grid grid-cols-[130px_1fr] items-center gap-2">
          <label
            htmlFor="order_no"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Order Number
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="order_no"
            name="order_no"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Invoice Number"
            required
          />
        </div>
        <div className="grid grid-cols-[130px_1fr] items-center gap-2">
          <label
            htmlFor="destination"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Destination
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="destination"
            name="destination"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Invoice Number"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
