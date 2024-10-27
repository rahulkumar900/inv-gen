import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { debouncedHandleItemsChange, cancelDebounce } from "@/utils";
import { Label } from "./ui/label";
type RowProps = {
  Name: string;
  LabelText: string;
  Placeholder: string;
  // handleChange: (f: ChangeEvent<HTMLInputElement>) => void;
  DefaultValue: string;
  Index: number;
  isdisabled?: boolean; // added for disabling inputs in case of edit mode  // added for disabled inputs in case of edit mode   // added for disabled inputs in case of edit mode   // added for disabled inputs in case of edit mode   // added for disabled inputs in case of edit mode   // added for disabled inputs in case of edit mode   // added for disabled inputs in case of edit mode   // added for disabled inputs in case of edit mode   // added for disabled inputs in case
};

export default function DynamicTaxRow({
  LabelText,
  Name,
  Placeholder,
  DefaultValue,
  // handleChange,
  Index,
  isdisabled,
}: RowProps) {
  const initialvalue = useSelector(
    (state: RootState) => state.counter.items[Index].taxes[Name]
  );

  const dispatch = useDispatch<AppDispatch>();

  const [taxValue, setTaxValue] = useState(0);

  console.log(taxValue, initialvalue);

  useEffect(() => {
    setTaxValue(initialvalue);
  }, [initialvalue]);

  useEffect(() => {
    const handleChange = async () => {
      await debouncedHandleItemsChange(Index, Name, String(taxValue), dispatch);
    };
    if (initialvalue !== taxValue) {
      handleChange(); // Call the async function
      // Reset the input value to initial value
    }

    return () => {
      cancelDebounce();
    };
  }, [initialvalue, taxValue, Name, dispatch, Index]);

  return (
    <div className={`sgst col-span-1  text-left  `}>
      <Label className="text-left inline-block md:hidden text-muted-foreground text-sm">
        {LabelText}
      </Label>
      <Input
        className={` appearance-none  focus-visible:ring-0 col-span-6 md:col-span-1 rounded-lg `}
        type="text"
        name={Name}
        placeholder={Placeholder}
        disabled={isdisabled}
        // defaultValue={String(DefaultValue) || ""}
        // value={String(DefaultValue) || ""}
        value={taxValue}
        // onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}

        // value={li[key]}
        onChange={(e) => setTaxValue(Number(e.target.value))}
      />
    </div>
  );
}
