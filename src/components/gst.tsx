import React from "react";

interface GstProps {
  name: "cgst" | "sgst" | "igst";
  isIgst: boolean;
  summary: { [key: string]: any };
}

export const Gst: React.FC<GstProps> = ({ name, isIgst, summary }) => {
  return (
    <div>
      {Object.entries(summary).map(([key, value]) => {
        return (
          <div
            key={key}
            className={`text-muted-foreground border-b p-2 overflow-hidden grid grid-cols-7 ${
              isIgst
                ? "md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]"
                : "md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr]"
            }`}
          >
            <div
              className={`col-span-5 text-right ${
                isIgst ? "md:col-span-5" : "md:col-span-6"
              }`}
            >
              {` ${name.toLocaleUpperCase()} ${key} %`}
            </div>
            <div className="text-center col-span-2 md:col-span-1">{value}</div>
          </div>
        );
      })}
    </div>
  );
};
