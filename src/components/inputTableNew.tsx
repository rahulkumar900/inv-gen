"use client";

import { Invoice, Item } from "@/lib/features/invoice/invoiceType";
// import Inv from "@/components/reports/Invoice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import DynamicTaxRow from "./dynamicTaxRow";
import { TaxOption } from "./selectTax";
import ItemsInputRow from "./itemsInputRow";
import { Label } from "./ui/label";

const InputTableNew = () => {
  const [igst, setIgst] = useState(true);

  const counter: Invoice = useAppSelector((state) => state.counter);

  const { items, initialRows, round } = useSelector(
    (state: RootState) => state.counter
  );

  const { taxType }: { taxType: TaxOption } = counter;

  const fields = [
    "Description",
    "Qty.",
    "Rate",
    "CGST",
    "SGST",
    "IGST",
    "Amount",
    "",
  ];

  const taxesField: Record<string, string> = {
    notax: "NO_Tax",
    gst: "GST",
    igst: "IGST",
    cgstigst: "CGST + IGST",
  };

  const fieldsArray = [
    "Description",
    "Qty.",
    "Rate",
    taxesField[taxType],
    "Amount",
    "",
  ];

  // const { taxSummary, totalTax } = calculateGst(items);
  const { taxSummary, totalTax } = useMemo(() => calculateGst(items), [items]);

  const TotalAmount = items
    .map((item) => item.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const totalWithTax = formatCurrency(TotalAmount + totalTax[taxType], round);

  const dispatch = useDispatch<AppDispatch>();

  // const debouncedRemoveLine = debounce((sno) => {
  //   dispatch(removeLine(sno));
  // }, 300); // Adjust the debounce delay as needed

  const debouncedRemoveLine = useCallback(
    debounce((sno: number) => {
      dispatch(removeLine(sno));
    }, 300),
    [dispatch]
  );

  // const handleAddLine = () => {
  //   const newItems = items.slice();

  //   newItems.push({
  //     sno: newItems.length + 1,
  //     desc: "",
  //     qty: 0,
  //     rate: 0,
  //     taxes: {
  //       notax: 0,
  //       gst: 0,
  //       vat: 0,
  //       cgstigst: 0,
  //       igst: 0,
  //     },

  //     amount: 0,
  //   });

  //   let newTableRows;
  //   const itemLength = newItems.length;

  //   if (itemLength <= initialRows) {
  //     newTableRows = initialRows;
  //   } else {
  //     const threshold =
  //       initialRows + 20 * Math.ceil((itemLength - initialRows) / 20);
  //     newTableRows = itemLength > tableRows ? threshold : tableRows;
  //   }

  //   // Dispatching the action with the new items and tableRows as payload
  //   dispatch(addLine({ items: newItems, tableRows: newTableRows }));
  // };

  const handleAddLine = () => {
    const newItem: Item = {
      sno: items.length + 1,
      desc: "",
      qty: 0,
      rate: 0,
      taxes: {
        notax: 0,
        gst: 0,
        vat: 0,
        cgstigst: 0,
        igst: 0,
      },
      amount: 0,
    };

    const updatedTableRows =
      items.length + 1 <= initialRows
        ? initialRows
        : Math.ceil((items.length + 1 - initialRows) / 20) * 20 + initialRows;

    dispatch(
      addLine({ items: [...items, newItem], tableRows: updatedTableRows })
    );
  };

  return (
    <>
      <div className=" md:col-start-1  md:-mx-8  md:px-8  md:col-end-13 col-span-12">
        <div className=" w-full relative py-4 ">
          <Label>Invoice Items</Label>
          <div
            key={"main"}
            className={`grid text-md   grid-cols-4 divide-y-2
                gap-x-4
                gap-y-4 md:gap-y-0 auto-rows-min
              grid-rows-2 md:grid-rows-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_50px]
              `}
          >
            {/* Description, |  Qty | Rate | NO Tax | Amount | X  */}
            {/* header of Table */}
            <div className="md:grid py-4  hidden items-center grid-cols-subgrid col-span-full hover:bg-muted">
              {fieldsArray &&
                fieldsArray.length &&
                fieldsArray.map((li, i) => (
                  <div className={`  text-left `} key={li}>
                    {li}
                  </div>
                ))}
            </div>
            {/* Ends header of table */}

            {/* Rows of Input Table */}
            {items && items.length ? (
              items.map((li, i) => {
                return (
                  <ItemsInputRow
                    li={li}
                    i={i}
                    key={i}
                    taxType={taxType}
                    taxesField={taxesField}
                    className="items-center transition-colors py-3 hover:bg-muted"
                  />
                );
              })
            ) : (
              <div key={"nodata"} className="col-span-full p-4 border-b">
                No Rows 😥{" "}
              </div>
            )}

            {/* End of Input Rows */}

            {/* Gst tax Rows */}

            <div className="md:col-span-2 col-span-full ">
              <Button
                variant={"default"}
                
                className="my-4 min-w-[150px] px-4 py-2 flex justify-center items-center"
                onClick={handleAddLine}
              >
                <span>{"Add New Line"}</span>
              </Button>
            </div>

            <Gst
              key="gst-tax"
              taxSummary={taxSummary}
              totalTax={totalTax}
              totalAmount={formatCurrency(totalWithTax)}
              selectedTaxType={taxType}
              className=" items-center md:col-span-2 "
            />

            {/* End of Taxes section */}
          </div>

          {/* Total End */}
        </div>
      </div>
    </>
  );
};

export default InputTableNew;
