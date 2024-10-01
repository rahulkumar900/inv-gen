import React, { ChangeEvent, useEffect } from "react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  generatePdfAndConvert,
  removeLine,
  updateItemAsync,
} from "@/lib/features/invoice/action";

import { AppDispatch } from "@/lib/store";
import { debounce, formatCurrency } from "@/utils";
import DynamicTaxRow from "./dynamicTaxRow";
import { Item } from "@/lib/features/invoice/invoiceType";
import { X } from "lucide-react";
import { TaxOption } from "./selectTax";

export default function ItemsInputRow({
  li,
  i,
  taxType,
  taxesField,
}: {
  li: Item;
  i: number;
  taxType: TaxOption;
  taxesField: Record<string, string>;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const debouncedHandleItemsChange = debounce(
    async (index: number, name: string, value: string) => {
      await dispatch(updateItemAsync({ index, name, value })).then(() =>
        dispatch(generatePdfAndConvert())
      );
    },
    300 // Adjust the debounce delay as needed
  );

  // Use the debounced function in your component
  const handleItemsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    debouncedHandleItemsChange(index, name, value);
  };

  const handleRemoveLine = (sno: Number) => {
    // Dispatching the removeLine action with the sno as payload
    dispatch(removeLine(sno));
  };

  return (
    <>
      {/* Description */}
      <div key={i + "a"} className="  ">
        <span className=" md:hidden text-muted-foreground text-sm">
          Description
        </span>
        <Input
          className={`focus-visible:ring-0 col-span-6 md:col-span-1 rounded-lg border border-muted-foreground   text-muted-foreground`}
          type="text"
          name="desc"
          placeholder="Description"
          defaultValue={String(li.desc)}
          onChange={(e) => handleItemsChange(e, i)}
          // value={li[key]}
        />
      </div>
      {/* ---------------- */}

      {/* Quantity */}
      <div key={i + "b"} className="qty text-left md:text-left  ">
        <span className=" md:hidden text-muted-foreground text-sm">
          Quantity
        </span>
        <Input
          className={`focus-visible:ring-0 col-span-6 md:col-span-1 border-muted-foreground rounded-lg border text-muted-foreground`}
          type="number"
          name="qty"
          placeholder="Qty"
          defaultValue={formatCurrency(li.qty) || ""}
          onChange={(e) => handleItemsChange(e, i)}
        />
      </div>
      {/* --------------- */}

      {/* Rate */}
      <div key={i + "c"} className="rate   text-left">
        <span className=" md:hidden text-left text-muted-foreground text-sm">
          Rate
        </span>
        <Input
          className={`appearance-none border-muted-foreground focus-visible:ring-0  rounded-lg border   text-muted-foreground`}
          type="number"
          name="rate"
          placeholder="Rate"
          defaultValue={formatCurrency(li.rate) || ""}
          onChange={(e) => handleItemsChange(e, i)}
          // value={li[key]}
        />
      </div>
      {/* ---------------- */}

      <DynamicTaxRow
        key={i + "d"}
        Name={taxType}
        Label={String(taxesField[taxType])}
        Placeholder="0"
        DefaultValue={String(li.taxes[taxType as TaxOption])}
        Index={i}
        isdisabled={taxType === "notax"}
        handleChange={(e) => handleItemsChange(e, i)}
      />

      <div key={i + "e"} className="text-left">
        <span className=" text-left  md:hidden text-muted-foreground text-sm">
          Amount
        </span>
        <Input
          className={`bg-background appearance-none border-muted-foreground focus-visible:ring-0   rounded-lg border text-muted-foreground`}
          type="text"
          disabled={true}
          name="amount"
          placeholder="Amount"
          value={formatCurrency(li.amount || 0)}

          // value={li[key]}
        />
      </div>

      <div
        key={i + "f"}
        onClick={() => handleRemoveLine(li.sno)}
        role="button"
        className="w-10 justify-self-center mt-4 md:mt-0 h-10 grid place-items-center rounded-full text-muted-foreground shadow-lg hover:bg-destructive hover:text-destructive-foreground border"
      >
        <X size={24} />
      </div>
    </>
  );
}
