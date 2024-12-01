import FormNew from "@/components/formnew";
import clsx from "clsx";
import React from "react";

export default function Page() {
  return (
    <>
      <div
        className={clsx(
          "md:w-3/5 w-full px-8 grid items-center bg-background md:overflow-y-scroll scrollbar-none",
          {
            // block: !editorMode,
            // hidden: editorMode,
          }
        )}
      >
        <FormNew />
      </div>
    </>
  );
}
