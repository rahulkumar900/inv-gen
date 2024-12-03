import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";


import { AppDispatch } from "@/lib/store";
import { debounce, debouncedHandleItemsChange, formatCurrency } from "@/utils";
import DynamicTaxRow from "./dynamicTaxRow";
import { Item } from "@/lib/features/invoice/invoiceType";
import { X } from "lucide-react";
import { TaxOption } from "./selectTax";
import clsx from "clsx";
import { Label } from "./ui/label";
import { removeLine } from "@/lib/features/invoice/action";

export default function ItemsInputRow({
  li,
  i,
  taxType,
  taxesField,
  className,
  ...props
}: {
  li: Item;
  i: number;
  taxType: TaxOption;
  taxesField: Record<string, string>;
  className?: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  // Use the debounced function in your component
  const handleItemsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value }: { name: string; value: string } = e.target;
    debouncedHandleItemsChange(index, name, value, dispatch);
  };

  const handleRemoveLine = (sno: Number) => {
    // Dispatching the removeLine action with the sno as payload
    dispatch(removeLine(sno));
  };

  const baseStyle = "grid  grid-cols-subgrid col-span-full";

  return (
    <div className={clsx(baseStyle, className)}>
      {/* Description */}
      <div className="col-span-3 md:col-span-1 ">
        <Label className=" md:hidden  text-sm">Description</Label>
        <Input
          className={`focus-visible:ring-0 col-span-6 md:col-span-1 rounded-lg    `}
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
      <div className=" col-span-1 qty text-left md:text-left  ">
        <Label className=" md:hidden  text-sm">Quantity</Label>
        <Input
          className={`focus-visible:ring-0 col-span-6 md:col-span-1  rounded-lg `}
          type="number"
          name="qty"
          placeholder="Qty"
          defaultValue={li.qty || ""}
          onChange={(e) => handleItemsChange(e, i)}
        />
      </div>
      {/* --------------- */}

      {/* Rate */}
      <div className=" col-span-1 rate   text-left">
        <Label className=" md:hidden text-left  text-sm">Rate</Label>
        <Input
          className={`appearance-none  focus-visible:ring-0  rounded-lg   `}
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
        Name={taxType}
        LabelText={String(taxesField[taxType])}
        Placeholder="0"
        DefaultValue={String(li.taxes[taxType as TaxOption])}
        Index={i}
        isdisabled={taxType === "notax"}

        // handleChange={(e) => handleItemsChange(e, i)}
      />

      <div className=" col-span-1 text-left">
        <Label className=" text-left  md:hidden  text-sm">Amount</Label>
        {/* <Input
          className={` border-node rounded-lg `}
          type="text"
          disabled={true}
          name="amount"
          placeholder="Amount"
          value={formatCurrency(li.amount || 0)}

          // value={li[key]}
        /> */}

        <div>{formatCurrency(li.amount || 0)}</div>
      </div>

      <div
        className="col-span-1 w-10 justify-self-center mt-4 md:mt-0 h-10 grid place-items-center rounded-full  shadow-lg hover:bg-destructive hover:text-destructive-foreground border"
        onClick={() => handleRemoveLine(li.sno)}
        role="button"
      >
        <X size={24} />
      </div>
    </div>
  );
}
