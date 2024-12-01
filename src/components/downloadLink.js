"use client";
import React from "react";
import { Download, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadLink = ({ base64Data, loading, fileName }) => {
  const handleDownload = () => {
    // Remove whitespaces and line breaks from the base64 string
    const splitData = base64Data.split("data:application/pdf;base64,");

    const base64String = splitData[1]; // Extracting the base64 encoded string
    const cleanedBase64 = base64String.replace(/\s/g, "");

    try {
      // Decode the cleaned base64 data
      const byteCharacters = atob(cleanedBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create a temporary URL for the blob
      const url = URL.createObjectURL(blob);

      // Create an anchor element and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error decoding base64 data:", error);
    }
  };
  return (
    <Button
      onClick={handleDownload}
      variant={"default"}
      className=" space-x-2 min-w-[150px]  flex justify-center items-center"
      disabled={loading}
    >
      {!loading ? (
        <Download className=" h-4 w-4 hover:animate-bounce " />
      ) : (
        <Loader2 className=" h-4 w-4 animate-spin " />
      )}
      <span className="hidden md:block" disabled={base64Data}>
        {loading ? "Loading..." : "Download"}
      </span>
    </Button>
  );
};

export default DownloadLink;
