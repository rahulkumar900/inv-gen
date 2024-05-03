"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import DownloadLink from "./reports/downloadLink";

const DownloadButton = () => {
  // Assuming `useAppSelector` is correctly implemented to select state from Redux
  const { base64String, loading, error } = useAppSelector(
    (state) => state.counter // Adjust this selector according to your Redux state structure
  );

  return (
    <DownloadLink
      loading={loading}
      base64Data={base64String}
      fileName="invoice"
    />
  );
};

export default DownloadButton;
