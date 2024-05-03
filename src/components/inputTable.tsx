"use client";

import { updateItem, addLine } from "@/lib/features/invoice/invoiceSlice";
import { Invoice, Item } from "@/lib/features/invoice/invoiceType";
import Inv from "@/components/reports/Invoice";
import scientificToFloat from "@/lib/features/invoice/scientificFloat";
import { useAppSelector } from "@/lib/hooks";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { generatePdfAndConvert } from "../lib/features/invoice/action";
import debounce from "lodash/debounce";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";

const fields = [
  "Sl.No.",
  "Description",
  "Qty.",
  "Rate",
  "CGST",
  "SGST",
  "IGST",
  "Amount",
];

const InputTable = () => {

  const [igst, setIgst] = useState(true);

  const counter: Invoice = useAppSelector((state) => state.counter);

  const {items,isIgst} = counter;
  
  const dispatch = useDispatch();
  const debouncedHandleItemsChange = debounce((index, changedItem, counter) => {
    let updatedState = { ...counter, items: [...counter.items] };
    updatedState.items[index] = changedItem;

    dispatch(generatePdfAndConvert(Inv, updatedState));
  }, 300); // Adjust the debounce delay as needed

  const handleItemsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    counter: Invoice // Define the type for your counter object
  ) => {
    let { name, value }: { name: string; value: number | string } = e.target;
    const selectedObj = { ...counter.items[index] };
    let amount = 0;
    if (name === "qty") {
      amount = selectedObj.rate * (parseFloat(value) || 0);
    } else {
      amount = selectedObj.qty * (parseFloat(value) || 0);
    }
    const changedItem = {
      ...selectedObj,
      [name]: value,
      amount: amount,
    };
    dispatch(updateItem({ index, changedItem }));

    debouncedHandleItemsChange(index, changedItem, counter);
  };

  const isHidden = (li:string ,  igst:boolean  ) => {
    li = li.toLowerCase();
    if ((li === "cgst" || li === "sgst") && igst) {
      return "hidden";
    }
    if (li === "igst" && !igst) {
      return "hidden";
    }
    return "";
  };


  

  // console.log(isHidden());

  const state: string = "Bihar"; // replace with your state value
  const S_state: string = "Bihar"; // replace with your S_state value

  useEffect(() => {
    if (state === S_state) {
     
      setIgst(false);
    } else {
     
      setIgst(true);
    }
  }, [state, S_state]);

  console.log(`isIgst ${isIgst}`)

  return (
    <section className="mt-12 px-4">
      <div className=" grid  grid-cols-12  ">
        <div className=" md:col-start-1 lg:col-start-2 lg:col-end-12 md:col-end-13 col-span-12">
          {/* <div className="grid border border-b-0 grid-cols-7 md:grid-cols-[min-content_2fr_1fr_1fr_1fr_1fr_1fr] w-full relative"> */}
          <div className=" border border-b-0  w-full relative">
            <div className={`md:grid hidden border-b ${isIgst ? "md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]" :  "md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr]" } `}>
              {fields &&
                fields.length &&
                fields.map((li, i) => (
                  <div
                    className={`text-muted-foreground text-center  bg-muted p-2     ${li.toLowerCase()} ${
                      isHidden(li, isIgst) 
                    }`}
                    key={i}
                  >
                    {li}
                  </div>
                ))}
            </div>

            {items && items.length
              ? items.map((li, i) => {
                  return (
                    <div
                      key={i}
                      className={`overflow-hidden grid grid-cols-7 ${isIgst ? "md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]" :  "md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr]"}  `}
                    >
                      <Input
                        className={`focus-visible:ring-0 border-0 border-b text-center border-r rounded-none `}
                        type="text"
                        disabled={true}
                        name="sno"
                       
                        placeholder="Sl.No"
                        value={String(li.sno) || ""}
                        onChange={(e) => handleItemsChange(e, i, counter)}
                        // value={li[key]}
                      />

                      <Input
                        className={`focus-visible:ring-0 col-span-6 md:col-span-1 border-0 border-b text-muted-foreground  rounded-none `}
                        type="text"
                        name="desc"
                       
                        placeholder="Description"
                        defaultValue={String(li.desc)}
                        onChange={(e) => handleItemsChange(e, i, counter)}
                        // value={li[key]}
                      />
                      <div className="qty text-center">
                        <span className=" md:hidden text-muted-foreground text-sm">
                          Qty
                        </span>
                        <Input
                          className={`focus-visible:ring-0 border-0 text-center border-b rounded-none `}
                          type="number"
                          name="qty"
                          
                          placeholder="Qty"
                          value={String(li.qty) || ""}
                          onChange={(e) => handleItemsChange(e, i, counter)}
                          // value={li[key]}
                        />
                      </div>
                      <div className="rate col-span-2  md:col-span-1 text-center">
                        <span className=" md:hidden  text-muted-foreground text-sm">
                          Rate
                        </span>
                        <Input
                          className={` appearance-none focus-visible:ring-0 text-center border-0 border-b rounded-none `}
                          type="number"
                          name="rate"
                          
                          placeholder="Rate"
                          value={String(li.rate) || ""}
                          onChange={(e) => handleItemsChange(e, i, counter)}
                          // value={li[key]}
                        />
                      </div>
                      <div className={`sgst col-span-1 text-center ${
                            isIgst ? "hidden" : ""
                          } `}>
                        <span className=" md:hidden  text-muted-foreground text-sm">
                          SGST
                        </span>
                        <Input
                          className={` appearance-none focus-visible:ring-0 text-center border-0 border-b rounded-none  `}
                          type="text"
                          name="sgst"
                         
                          placeholder="sgst"
                          value={String(li.sgst) || ""}
                          onChange={(e) => handleItemsChange(e, i, counter)}
                          // value={li[key]}
                        />
                      </div>
                      <div className={`cgst col-span-1 text-center  ${
                            isIgst ? "hidden" : ""
                          }`}>
                        <span className=" md:hidden  text-muted-foreground text-sm">
                          CGST
                        </span>
                        <Input
                          className={`appearance-none focus-visible:ring-0 text-center border-0 border-b rounded-none  `}
                          type="text"
                          name="cgst"
                         
                          placeholder="cgst"
                          value={String(li.cgst) || ""}
                          onChange={(e) => handleItemsChange(e, i, counter)}
                          // value={li[key]}
                        />
                      </div>

                      <div className={` col-span-1 text-center ${isIgst ? "" : "hidden"}`}>
                        <span className=" md:hidden  text-muted-foreground text-sm">
                          IGST
                        </span>
                        <Input
                          className={`focus-visible:ring-0 border-0 text-center border-b rounded-none  `}
                          type="number"
                          name="igst"
                          
                          placeholder="igst"
                          value={String(li.igst) || ""}
                          onChange={(e) => handleItemsChange(e, i, counter)}
                          // value={li[key]}
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1  text-center">
                        <span className=" md:hidden  text-muted-foreground text-sm">
                          Amount
                        </span>

                        <Input
                          className={`focus-visible:ring-0 border-0 border-b rounded-none text-center  `}
                          type="text"
                          disabled={true}
                          name="amount"
                        
                          placeholder="Amount"
                          value={String(li.amount) || ""}

                          // value={li[key]}
                        />
                      </div>
                    </div>
                  );
                })
              : "loading..."}
          </div>

          <Button
            // variant="secondary"
            // variant="destructive"
            className="my-4"
            onClick={() => dispatch(addLine())}
          >
            Add New Line
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InputTable;
