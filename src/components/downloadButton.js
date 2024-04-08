"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import DownloadLink from "../components/reports/downloadLink";

const DownloadButton = () => {
  // Assuming `useAppSelector` is correctly implemented to select state from Redux
  const { base64String, loading, error } = useAppSelector(
    (state) => state.counter // Adjust this selector according to your Redux state structure
  );

  return <DownloadLink base64Data={base64String} fileName="invoice" />;
};

export default DownloadButton;
