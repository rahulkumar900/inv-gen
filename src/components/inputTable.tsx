"use client";

import { updateItem, addLine } from "@/lib/features/invoice/invoiceSlice";
import { Invoice, Item } from "@/lib/features/invoice/invoiceType";
import Inv from "@/components/reports/Invoice";
import scientificToFloat from "@/lib/features/invoice/scientificFloat";
import { useAppSelector } from "@/lib/hooks";
import React, { ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { generatePdfAndConvert } from "../lib/features/invoice/action";
import debounce from "lodash/debounce";

const fields = ["Sl. No.", "Description", "Qty.", "Rate", "Amount"];

const InputTable = () => {
  const counter = useAppSelector((state) => state.counter);
  const items = counter.items;
  console.log(items);
  const dispatch = useDispatch();

  const debouncedHandleItemsChange = debounce((index, changedItem, counter) => {
    let updatedState = { ...counter, items: [...counter.items] };
    updatedState.items[index] = changedItem;

    dispatch(generatePdfAndConvert(Inv, updatedState));
  }, 300); // Adjust the debounce delay as needed

  const handleItemsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    counter: Invoice // Define the type for your counter object
  ) => {
    let { name, value }: { name: string; value: number | string } = e.target;
    const selectedObj = { ...counter.items[index] };
    let amount = 0;
    if (name === "qty") {
      amount = selectedObj.rate * (parseFloat(value) || 0);
    } else {
      amount = selectedObj.qty * (parseFloat(value) || 0);
    }
    const changedItem = {
      ...selectedObj,
      [name]: value,
      amount: amount,
    };
    dispatch(updateItem({ index, changedItem }));

    debouncedHandleItemsChange(index, changedItem, counter);
  };

  return (
    <section className="mt-12">
      <div className=" grid  grid-cols-12 grid-rows-2 gap-10">
        <div className="col-start-2 col-end-12">
          <div className="grid grid-cols-5 w-full relative">
            {fields &&
              fields.length &&
              fields.map((li, i) => (
                <div className="border p-2" key={i}>
                  {li}
                </div>
              ))}
            {items && items.length
              ? items.map((li, i) => {
                  return Object.keys(li).map((key, index) => (
                    <input
                      className="border border-gray-500 text-gray-800 p-2 bg-white"
                      type="text"
                      disabled={key === "sno" || key === "amount"}
                      name={key}
                      key={index}
                      placeholder={key}
                      value={String(li[key]) || 0}
                      onChange={(e) => handleItemsChange(e, i, counter)}
                      // value={li[key]}
                    />
                  ));
                })
              : "loading..."}
          </div>
          <button
            className="px-3 py-2 text-right rounded-md bg-slate-700 my-4"
            onClick={() => dispatch(addLine())}
          >
            Add New Line
          </button>
        </div>
      </div>
    </section>
  );
};

export default InputTable;
