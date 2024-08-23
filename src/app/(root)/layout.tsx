import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header/>
      <main className="mt-24 min-h-dvh ">{children}</main>
      <Footer />
    </>
  );
}
