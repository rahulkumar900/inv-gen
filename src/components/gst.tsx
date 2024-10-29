import React from "react";
import { TaxOption } from "./selectTax";
import { TaxSummary } from "@/lib/calculategst";
import clsx from "clsx";
import { formatCurrency } from "@/utils";
import { CircleDot, CircleDotDashed } from "lucide-react";
import { Button } from "./ui/button";
import { toggleRound } from "@/lib/features/invoice/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

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
  const totalTaxAmount = formatCurrency(totalTax[selectedTaxType] || 0);
  const dispatch = useDispatch();
  const round = useSelector((state: RootState) => state.counter.round);
  const defaultClassName = "grid grid-cols-subgrid md:col-span-4 col-span-full";
  console.log(round);
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
                <div className="text-right py-4 col-span-1 md:col-span-1">
                  {formatCurrency(amount.toLocaleString())}
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment key={rate}>
                <div className="col-span-2 md:col-span-2 py-4 text-right ">{` CGST ${
                  Number(rate) / 2
                }%`}</div>
                <div className="text-right col-span-1 md:col-span-1">
                  {formatCurrency((amount / 2).toLocaleString())}
                </div>

                <div className="col-span-2 md:col-span-2 py-4 text-right ">{` SGST ${
                  Number(rate) / 2
                }%`}</div>
                <div className="text-right md:col-span-1 col-span-1 py-4">
                  {formatCurrency((amount / 2).toLocaleString())}
                </div>
              </React.Fragment>
            )
          )}

          <div className=" col-span-2 md:col-span-2 font-semibold py-4 border-t  text-right">
            Total Tax
          </div>
          <div className="md:col-span-1 col-span-1 font-semibold text-right border-t py-4 ">
            {totalTaxAmount.toLocaleString()}
          </div>
          <div className=" col-span-2 md:col-span-2 font-semibold border-t py-4  text-right">
            Total Amount
          </div>
          <div className="col-span-1 md:col-span-1 font-semibold text-right py-4 border-t ">
            {totalAmount}
          </div>
          <div className="col-span-1">
            {/* <Button variant="secondary" className="p-2 rounded-full hover:shadow-md hover:ring "> */}
            <div
              onClick={() => dispatch(toggleRound())}
              title="round"
              className="p-1 cursor-pointer border font-light rounded-full inline-flex bg-background text-foreground "
            >
              {!round ? (
                <CircleDot size={24} aria-hidden="true" />
              ) : (
                <CircleDotDashed aria-hidden="true" size={24} />
              )}
            </div>
            {/* </Button> */}
          </div>
          {/* */}
        </>
      ) : (
        <>
          <div className="col-span-2 md:col-span-2 font-semibold py-4 border-t text-right">
            Total Amount
          </div>
          <div className="col-span-1 md:col-span-1 font-semibold text-right border-t py-4 ">
            {totalAmount}
          </div>
          <div className="col-span-1">
            {/* <Button variant="secondary" className="p-2 rounded-full hover:shadow-md hover:ring "> */}
            <div
              onClick={() => dispatch(toggleRound())}
              title="round"
              className="p-1 cursor-pointer border font-light rounded-full inline-flex bg-background text-foreground "
            >
              {!round ? (
                <CircleDot size={24} aria-hidden="true" />
              ) : (
                <CircleDotDashed aria-hidden="true" size={24} />
              )}
            </div>
            {/* </Button> */}
          </div>
          {/* <CircleDotDashed size={24} /> */}
          {/* <CircleDot size={24} /> */}
        </>
      )}
    </div>
  );
};
