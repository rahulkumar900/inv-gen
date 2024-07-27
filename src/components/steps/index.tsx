"use client";
import { useState, useEffect } from "react";
import Tab from "./tab";

export default function HowTo() {
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTab((prevTab) => (prevTab + 1) % 5);
    }, 11000); // 10000 milliseconds = 11 seconds

    return () => clearInterval(intervalId);
  }, []);

  const contents = [
    {
      title: "Get started for free ",
      description:
        "To open online invoice generator Click on 👆\",Create Now\", Button. it will redirect to editor page.",
    },
    {
      title: "Fill Invoice number, Date and Order Number.",
      description:
        "Fill up Invoice number keep invoice number unique, date with current date of material supply or according to your requirement,Order number if purchaser have sent you a list of items with purchase order .",
    },
    {
      title: "Choose Logo",
      description:
        "Choose your company logo in jpg,Jpeg or png Formate.",
    },
    {
      title: "Add your Company Name and address",
      description:
        "Fill your comany Name, Address, Email, GST or PAN etc.",
    },
    {
      title: "Add Buyer's Company Name and address",
      description:
        "Fill Buyer's Name, Address, Email, GST or PAN etc.",
    },
    {
      title: "Select State",
      description:
        "Select State State is requed to handle GST Type Like Igst or CGST and SGST",
    },
    {
      title: "Add Items Details",
      description:
        "Add items name,description, quantity, rate , Tax etc if you have more that one items click on add new Line",
    },
    {
      title: "Download The Invoice.",
      description:
        "Click on downlod button to download you invoice ",
    },
  ];

  const cl = contents.length;

  return (
    <div className="relative w-full h-full  border p-10 rounded-md ">
      <h2 className="text-4xl mb-6 font-bold text-left">
        How to use the online invoice generator.
      </h2>
      <div className="flex mb-12 justify-left gap-4">
        {Array.from({ length: cl }).map((_, index) => (
          <Tab
            key={index}
            index={index}
            isActive={currentTab === index}
            onClick={() => setCurrentTab(index)}
          />
        ))}
      </div>
      <div className="h-52 relative overflow-hidden">
        {contents.map(({ title, description }, index) => {
          const isActive = currentTab === index;

          const className = isActive ? "animate-slide-in" : "animate-slide-out";

          return (
            <div key={index} className="absolute top-0 left-0">
              <h2
                className={` text-3xl mb-4  font-bold  line-clamp-2  transition-all  w-full ${className}`}
              >
                {title}{" "}
              </h2>
              <p className={`text-xl   line-clamp-4 w-full ${className}`}>
                {description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
