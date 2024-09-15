import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TaxOption = "notax" | "gst" | "igst" | "cgstigst";

interface TaxSelectProps {
  onSelect?: (value: TaxOption) => void;
  value: TaxOption;
}

export default function TaxSelect({ onSelect, value }: TaxSelectProps) {
  return (
    <div className="w-full max-w-xs">
      <label
        htmlFor="tax-select"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select Tax Option
      </label>
      <Select value={value} onValueChange={onSelect as (value: string) => void}>
        <SelectTrigger id="tax-select" className="w-full">
          <SelectValue placeholder="Select tax option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="notax">No TAX</SelectItem>
          <SelectItem value="gst">GST</SelectItem>
          <SelectItem value="igst">IGST</SelectItem>
          <SelectItem value="cgstigst">CGST + IGST</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
