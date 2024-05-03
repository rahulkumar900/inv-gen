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
    <footer className="w-full  py-16 border-t">
      <div className="max-w-5xl mx-auto space-y-10">

      <div className="flex items-center justify-between ">
        <div className="Logo flex items-center gap-2">
          <ReceiptText className=" w-8 h-8 text-primary" />
          <span className="text-xl">Invoice Generator</span>
        </div>
        <div className="space-x-8  ">
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
          <Twitter size={20} />
          <Facebook size={20} />
          <Instagram size={20} />
          <Linkedin size={20} />
        </div>
      </div>
      <p className="text-center text-muted-foreground">&#169; 2024 Invoice Generator</p>
      </div>

    </footer>
  );
};

export default Footer;
