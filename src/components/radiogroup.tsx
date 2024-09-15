import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function TaxType() {
  const [selectedTax, setSelectedTax] = useState("no-tax");

  const handleTaxChange = (value: string) => {
    setSelectedTax(value);
  };

  const taxOptions = [
    { value: "no-tax", label: "No Tax" },
    { value: "vat", label: "VAT" },
    { value: "gst", label: "GST" },
    { value: "igst", label: "IGST" },
    { value: "cgst-sgst", label: "CGST+SGST" },
  ];

  return (
    <>
      <RadioGroup
        value={selectedTax}
        onValueChange={handleTaxChange}
        className="flex flex-wrap gap-2"
      >
        {taxOptions.map((option) => (
          <div key={option.value} className="flex items-center">
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className="peer sr-only"
            />
            <Label
              htmlFor={option.value}
              className="px-3 py-2 rounded-md text-sm font-medium border cursor-pointer transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 hover:bg-gray-100"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </>
  );
}
