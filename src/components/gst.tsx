import React from "react";
import { TaxOption } from "./selectTax";
import { TaxSummary } from "@/lib/calculategst";

interface GstProps {
  taxSummary: Record<string, TaxSummary>;
  totalTax: Record<string, number>;
  totalAmount: string;
  selectedTaxType: TaxOption;
}

export const Gst: React.FC<GstProps> = ({
  taxSummary,
  totalTax,
  totalAmount,
  selectedTaxType,
}) => {
  const selectedTaxData = taxSummary[selectedTaxType] || {};
  const totalTaxAmount = totalTax[selectedTaxType] || 0;
  return (
    <>
      {Object.entries(selectedTaxData).length > 0 ? (
        <>
          {Object.entries(selectedTaxData).map(([rate, amount]) =>
            selectedTaxType !== "cgstigst" ? (
              <React.Fragment key={rate}>
                <div className="col-span-4 text-right ">{`${selectedTaxType.toUpperCase()} ${Number(
                  rate
                )}%`}</div>
                <div className="text-right col-span-1">
                  {amount.toLocaleString()}
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment key={rate}>
                <div className="col-span-4 text-right ">{` CGST ${
                  Number(rate) / 2
                }%`}</div>
                <div className="text-right col-span-1">
                  {(amount / 2).toLocaleString()}
                </div>

                <div className="col-span-4 text-right ">{` SGST ${
                  Number(rate) / 2
                }%`}</div>
                <div className="text-right col-span-1">
                  {(amount / 2).toLocaleString()}
                </div>
              </React.Fragment>
            )
          )}
          <div className=" col-span-4 font-semibold border-t pt-2 text-right">
            Total Tax
          </div>
          <div className="col-span-1 font-semibold text-right border-t pt-2">
            {totalTaxAmount.toLocaleString()}
          </div>
          <div className=" col-span-4 font-semibold border-t pt-2 text-right">
            Total Amount
          </div>
          <div className="col-span-1 font-semibold text-right border-t pt-2">
            {totalAmount}
          </div>
        </>
      ) : (
        <>
          <div className=" col-span-4 font-semibold border-t pt-2 text-right">
            Total Amount
          </div>
          <div className="col-span-1 font-semibold text-right border-t pt-2">
            {totalAmount}
          </div>
        </>
      )}
    </>
  );
};
