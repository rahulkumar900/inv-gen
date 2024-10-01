import React, { ChangeEvent } from "react";
import { Input } from "./ui/input";

type RowProps = {
  Name: string;
  Label: string;
  Placeholder: string;
  handleChange: (f: ChangeEvent<HTMLInputElement>) => void;
  DefaultValue: string;
  Index: number;
  isdisabled?: boolean; // added for disabling inputs in case of edit mode  // added for disabled inputs in case of edit mode   // added for disabled inputs in case of edit mode   // added for disabled inputs in case of edit mode   // added for disabled inputs in case of edit mode   // added for disabled inputs in case of edit mode   // added for disabled inputs in case of edit mode   // added for disabled inputs in case of edit mode   // added for disabled inputs in case
};

export default function DynamicTaxRow({
  Label,
  Name,
  Placeholder,
  DefaultValue,
  handleChange,
  Index,
  isdisabled,
}: RowProps) {
  return (
    <div className={`sgst  text-left  `}>
      <span className="text-left inline-block md:hidden text-muted-foreground text-sm">
        {Label}
      </span>
      <Input
        className={` appearance-none border-muted-foreground focus-visible:ring-0 col-span-6 md:col-span-1 rounded-lg border text-muted-foreground`}
        type="text"
        name={Name}
        placeholder={Placeholder}
        disabled={isdisabled}
        defaultValue={String(DefaultValue) || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        // value={li[key]}
      />
    </div>
  );
}
