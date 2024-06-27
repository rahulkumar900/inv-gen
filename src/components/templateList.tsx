"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { toggleTemplateAsync, generatePdfAndConvert } from "@/lib/features/invoice/action";
import { AppDispatch } from "@/lib/store";

export default function TemplateList() {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (template: string) => {
    dispatch(toggleTemplateAsync({ template }))
      .then(() => dispatch(generatePdfAndConvert()))
      .catch((error) => {
        console.error("Error occurred while dispatching actions:", error);
        // Handle error as needed
      });
  };

  return (
    <>
      <Button onClick={() => handleClick("zero")}>Zero</Button>
      <Button onClick={() => handleClick("one")}>One</Button>
    </>
  );
}
