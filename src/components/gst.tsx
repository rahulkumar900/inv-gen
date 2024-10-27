import React from "react";
import { TaxOption } from "./selectTax";
import { TaxSummary } from "@/lib/calculategst";
import clsx from "clsx";

interface GstProps {
  taxSummary: Record<string, TaxSummary>;
  totalTax: Record<string, number>;
  totalAmount: string;
  selectedTaxType: TaxOption;
  className?: string;
}

export const Gst: React.FC<GstProps> = ({
  taxSummary,
  totalTax,
  totalAmount,
  selectedTaxType,
  className,
}) => {
  const selectedTaxData = taxSummary[selectedTaxType] || {};
  const totalTaxAmount = totalTax[selectedTaxType] || 0;
  const defaultClassName = "grid grid-cols-subgrid md:col-span-3 col-span-full";

  return (
    <div className={clsx(defaultClassName, className)}>
      {Object.entries(selectedTaxData).length > 0 ? (
        <>
          {Object.entries(selectedTaxData).map(([rate, amount]) =>
            selectedTaxType !== "cgstigst" ? (
              <React.Fragment key={rate}>
                <div className=" col-span-2 py-4 md:col-span-2 text-right ">{`${selectedTaxType.toUpperCase()} ${Number(
                  rate
                )}%`}</div>
                <div className="text-right py-4 col-span-2 md:col-span-1">
                  {amount.toLocaleString()}
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment key={rate}>
                <div className="col-span-2 md:col-span-2 py-4 text-right ">{` CGST ${
                  Number(rate) / 2
                }%`}</div>
                <div className="text-right col-span-2 md:col-span-1">
                  {(amount / 2).toLocaleString()}
                </div>

                <div className="col-span-2 md:col-span-2 py-4 text-right ">{` SGST ${
                  Number(rate) / 2
                }%`}</div>
                <div className="text-right md:col-span-1 col-span-2 py-4">
                  {(amount / 2).toLocaleString()}
                </div>
              </React.Fragment>
            )
          )}
          <div className=" col-span-2 md:col-span-2 font-semibold py-4 border-t  text-right">
            Total Tax
          </div>
          <div className="md:col-span-1 col-span-2 font-semibold text-right border-t py-4 ">
            {totalTaxAmount.toLocaleString()}
          </div>
          <div className=" col-span-2 md:col-span-2 font-semibold border-t py-4  text-right">
            Total Amount
          </div>
          <div className="col-span-2 md:col-span-1 font-semibold text-right py-4 border-t ">
            {totalAmount}
          </div>
        </>
      ) : (
        <>
          <div className="col-span-2 md:col-span-4 font-semibold py-4 border-t text-right">
            Total Amount
          </div>
          <div className="col-span-2 md:col-span-1 font-semibold text-right border-t py-4 ">
            {totalAmount}
          </div>
        </>
      )}
    </div>
  );
};
