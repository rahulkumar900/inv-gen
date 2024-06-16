"use client";
import React from "react";
import {
  ReceiptText,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-background  border-t ">
      <div className="max-w-5xl mx-auto space-y-8 py-8 px-4">
        <div className="flex flex-col md:flex-row gap-4 items-start  md:items-center  md:justify-between ">
          <div className="Logo flex items-center gap-2">
            <ReceiptText className="-ml-1 w-8 h-8 text-primary" />
            <span className="text-xl">Invoice Generator</span>
          </div>
          <div className="flex gap-4 flex-col md:flex-row  ">
            <Link className="text-md" href="/#">
              Privacy policy
            </Link>
            <Link className="text-md" href="/#">
              About
            </Link>
            <Link className="text-md" href="/#">
              Blog
            </Link>
            <Link className="text-md" href="/#">
              Sitemap
            </Link>
            <Link className="text-md" href="/#">
              Contact us
            </Link>
          </div>
          <div className="flex gap-2">
            <Twitter
              size={28}
              className="bg-secondary border border-primary-foreground rounded shadow-md p-1 text- hover:text-primary  "
            />
            <Facebook
              size={28}
              className="bg-secondary border border-primary-foreground rounded shadow-md p-1 text- hover:text-primary   "
            />
            <Instagram
              size={28}
              className="bg-secondary border border-primary-foreground rounded shadow-md p-1  text- hover:text-primary  "
            />
            <Linkedin
              size={28}
              className="bg-secondary border border-primary-foreground rounded shadow-md p-1  text- hover:text-primary  "
            />
          </div>
        </div>
        <p className="text-center text-muted-foreground">
          &#169; {new Date().getFullYear()} Invoice Generator
        </p>
      </div>
    </footer>
  );
};

export default Footer;
