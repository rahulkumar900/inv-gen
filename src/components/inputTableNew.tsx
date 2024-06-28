"use client";

import { Invoice, Item } from "@/lib/features/invoice/invoiceType";
import Inv from "@/components/reports/Invoice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLine,
  generatePdfAndConvert,
  updateItemAsync,
  removeLine,
} from "../lib/features/invoice/action";
import debounce from "lodash/debounce";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { calculateGst } from "@/lib/calculategst";
import { Gst } from "./gst";
import { Ghost, Trash, X } from "lucide-react";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency } from "@/utils";

const fields = [
  "Sl.No.",
  "Description",
  "Qty.",
  "Rate",
  "CGST",
  "SGST",
  "IGST",
  "Amount",
];

const InputTableNew = () => {
  const [igst, setIgst] = useState(true);

  const counter: Invoice = useAppSelector((state) => state.counter);

  const { items, tableRows, initialRows, isIgst, loading } = useSelector(
    (state: RootState) => state.counter
  );

  // const { items, isIgst, loading } = counter;

  const {
    cgstSummary,
    sgstSummary,
    igstSummary,
    totalCgst,
    totalSgst,
    totalIgst,
  } = calculateGst(items);

  const TotalAmount = items
    .map((item) => item.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const totalWithTax = formatCurrency(
    isIgst ? TotalAmount + totalIgst : TotalAmount + totalCgst + totalSgst
  );

  // console.log(` Total Amount ${TotalAmount} Igst ${totalIgst} TWT ${totalWithTax}`)

  const dispatch = useDispatch<AppDispatch>();

  const debouncedHandleItemsChange = debounce(
    async (index: number, name: string, value: string) => {
      await dispatch(updateItemAsync({ index, name, value })).then(() =>
        dispatch(generatePdfAndConvert())
      );
    },
    1000 // Adjust the debounce delay as needed
  );

  // Use the debounced function in your component
  const handleItemsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    debouncedHandleItemsChange(index, name, value);
  };

  const debouncedRemoveLine = debounce((sno) => {
    dispatch(removeLine(sno));
  }, 300); // Adjust the debounce delay as needed

  const isHidden = (li: string, igst: boolean) => {
    li = li.toLowerCase();
    if ((li === "cgst" || li === "sgst") && igst) {
      return "hidden";
    }
    if (li === "igst" && !igst) {
      return "hidden";
    }
    return "";
  };

  const handleAddLine = () => {
    const newItems = items.slice();

    newItems.push({
      sno: newItems.length + 1,
      desc: "",
      qty: 0,
      rate: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      amount: 0,
    });

    let newTableRows;
    const itemLength = newItems.length;

    if (itemLength <= initialRows) {
      newTableRows = initialRows;
    } else {
      const threshold =
        initialRows + 20 * Math.ceil((itemLength - initialRows) / 20);
      newTableRows = itemLength > tableRows ? threshold : tableRows;
    }

    // Dispatching the action with the new items and tableRows as payload
    dispatch(addLine({ items: newItems, tableRows: newTableRows }));
  };

  const handleRemoveLine = (sno: Number) => {
    // Dispatching the removeLine action with the sno as payload
    dispatch(removeLine(sno));
  };

  return (
    <>
      <div className=" md:col-start-1   md:col-end-13 col-span-12">
        <div className=" border border-b-0  w-full relative">
          <div
            className={`md:grid hidden border-b ${
              isIgst
                ? "md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]"
                : "md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr]"
            } `}
          >
            {fields &&
              fields.length &&
              fields.map((li, i) => (
                <div
                  className={`text-muted-foreground text-center  bg-muted p-2     ${li.toLowerCase()} ${isHidden(
                    li,
                    isIgst
                  )}`}
                  key={i}
                >
                  {li}
                </div>
              ))}
          </div>

          {items && items.length ? (
            items.map((li, i) => {
              return (
                <div
                  key={i}
                  className={` relative  grid grid-cols-7 ${
                    isIgst
                      ? "md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]"
                      : "md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr]"
                  }  `}
                >
                  <Input
                    className={`focus-visible:ring-0 border-0 border-b text-center border-r rounded-none `}
                    type="text"
                    disabled={true}
                    name="sno"
                    placeholder="Sl.No"
                    defaultValue={String(li.sno) || ""}
                    onChange={(e) => handleItemsChange(e, i)}
                    // value={li[key]}
                  />

                  <Input
                    className={`focus-visible:ring-0 col-span-6 md:col-span-1 border-0 border-b text-muted-foreground  rounded-none `}
                    type="text"
                    name="desc"
                    placeholder="Description"
                    defaultValue={String(li.desc)}
                    onChange={(e) => handleItemsChange(e, i)}
                    // value={li[key]}
                  />
                  <div className="qty text-center col-span-1  ">
                    <span className=" md:hidden text-muted-foreground text-sm">
                      Qty
                    </span>
                    <Input
                      className={`focus-visible:ring-0 border-0 text-center border-b rounded-none `}
                      type="number"
                      name="qty"
                      placeholder="Qty"
                      defaultValue={formatCurrency(li.qty) || ""}
                      onChange={(e) => handleItemsChange(e, i)}
                    />
                  </div>
                  <div className="rate col-span-1  md:col-span-1 text-center">
                    <span className=" md:hidden  text-muted-foreground text-sm">
                      Rate
                    </span>
                    <Input
                      className={` appearance-none focus-visible:ring-0 text-center border-0 border-b rounded-none `}
                      type="number"
                      name="rate"
                      placeholder="Rate"
                      defaultValue={formatCurrency(li.rate) || ""}
                      onChange={(e) => handleItemsChange(e, i)}
                      // value={li[key]}
                    />
                  </div>
                  <div
                    className={`sgst col-span-1 text-center ${
                      isIgst ? "hidden" : ""
                    } `}
                  >
                    <span className=" md:hidden  text-muted-foreground text-sm">
                      SGST
                    </span>
                    <Input
                      className={` appearance-none focus-visible:ring-0 text-center border-0 border-b rounded-none  `}
                      type="text"
                      name="sgst"
                      placeholder="sgst"
                      defaultValue={String(li.sgst) || ""}
                      onChange={(e) => handleItemsChange(e, i)}
                      // value={li[key]}
                    />
                  </div>
                  <div
                    className={`cgst col-span-1 text-center  ${
                      isIgst ? "hidden" : ""
                    }`}
                  >
                    <span className=" md:hidden  text-muted-foreground text-sm">
                      CGST
                    </span>
                    <Input
                      className={`appearance-none focus-visible:ring-0 text-center border-0 border-b rounded-none  `}
                      type="text"
                      name="cgst"
                      placeholder="cgst"
                      defaultValue={String(li.cgst) || ""}
                      onChange={(e) => handleItemsChange(e, i)}
                      // value={li[key]}
                    />
                  </div>
                  <div
                    className={` col-span-1 text-center ${
                      isIgst ? "" : "hidden"
                    }`}
                  >
                    <span className=" md:hidden  text-muted-foreground text-sm">
                      IGST
                    </span>
                    <Input
                      className={`focus-visible:ring-0 border-0 text-center border-b rounded-none  `}
                      type="number"
                      name="igst"
                      placeholder="igst"
                      defaultValue={String(li.igst) || "0"}
                      onChange={(e) => handleItemsChange(e, i)}
                      // value={li[key]}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1  text-center">
                    <span className=" md:hidden  text-muted-foreground text-sm">
                      Amount
                    </span>

                    <Input
                      className={`focus-visible:ring-0 border-0 border-b rounded-none text-center  `}
                      type="text"
                      disabled={true}
                      name="amount"
                      placeholder="Amount"
                      defaultValue={formatCurrency(li.amount) || ""}

                      // value={li[key]}
                    />
                  </div>
                  <span
                    onClick={() => handleRemoveLine(li.sno)}
                    role="button"
                    className="absolute z-50 -right-4 top-2 text-destructive-foreground font-bold bg-destructive"
                  >
                    <X size={15} />
                  </span>
                </div>
              );
            })
          ) : (
            <p>Add new Row</p>
          )}

          {/* Gst Section */}

          {isIgst ? (
            <Gst name="igst" isIgst={isIgst} summary={igstSummary} />
          ) : (
            <>
              <Gst name="cgst" isIgst={isIgst} summary={cgstSummary} />
              <Gst name="sgst" isIgst={isIgst} summary={sgstSummary} />
            </>
          )}

          <div
            className={`text-muted-foreground border-b   p-2   overflow-hidden grid grid-cols-7 ${
              isIgst
                ? "md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]"
                : "md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr]"
            }`}
          >
            <div
              className={` col-span-5 text-right ${
                isIgst ? "md:col-span-5" : "md:col-span-6"
              }`}
            >
              Total amount
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              {totalWithTax}
            </div>
          </div>
          {/* Total End */}
        </div>

        <Button disabled={loading} className="my-4" onClick={handleAddLine}>
          {`${loading ? "wait ..." : "Add New Line"} `}
        </Button>
      </div>
    </>
  );
};

export default InputTableNew;
