"use client";
import React from "react";

const DownloadLink = ({ base64Data, fileName }) => {
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

  return <button onClick={handleDownload}>Download PDF</button>;
};

export default DownloadLink;
