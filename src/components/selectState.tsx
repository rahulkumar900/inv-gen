import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { states } from "../data/state";
import { useDispatch } from "react-redux";
import { updateInvoiceField } from "@/lib/features/invoice/action";
import { AppDispatch } from "@/lib/store";

export default function SelectState({ name }: { name: string }) {

  const dispatch:AppDispatch = useDispatch();
  const handleChange = async (name: string, value: string) => {
    await dispatch(updateInvoiceField({ name, value }));
  };
  return (
    <Select name={name} onValueChange={(value) => handleChange(name, value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a State" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>List of States</SelectLabel>
          {states &&
            states.length &&
            states.map((item, i) => (
              <SelectItem key={i} value={item}>
                {item}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
