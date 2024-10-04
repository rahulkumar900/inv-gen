import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { debouncedHandleItemsChange, cancelDebounce } from "@/utils";

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
  // handleChange,
  Index,
  isdisabled,
}: RowProps) {
  const initialvalue = useSelector(
    (state: RootState) => state.counter.items[Index].taxes[Name]
  );

  const dispatch = useDispatch<AppDispatch>();

  const [taxValue, setTaxValue] = useState(0);
  const [taxName, _] = useState(Name);
  console.log(taxValue, initialvalue);

  useEffect(() => {
    setTaxValue(initialvalue);
  }, [initialvalue]);

  useEffect(() => {
    const handleChange = async () => {
      await debouncedHandleItemsChange(
        Index,
        taxName,
        String(taxValue),
        dispatch
      );
    };
    if (initialvalue !== taxValue) {
      handleChange(); // Call the async function
      // Reset the input value to initial value
    }

    return () => {
      cancelDebounce();
    };
  }, [initialvalue, Index, dispatch, taxName, taxValue]);

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
