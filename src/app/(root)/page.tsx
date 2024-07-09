

import Image from "next/image";

// import Form from "@/components/form";

import { Button } from "@/components/ui/button";
import Faq from "@/components/faq";

import dynamic from "next/dynamic";
import Test from "../test";
import Form from "@/components/form";
import Link from "next/link";
import HeroImage from "@/components/heroImage";

export default function Home() {


  return (
    <main className="min-h-screen ">
      <section className="mt-[65px] min-h-[70vh] flex flex-col justify-center ">
        <div className="max-w-2xl mx-auto   flex flex-col gap-5 px-6">
          <h1 className=" leading-none font-bold mt-0 color-black text-5xl text-secondary-foreground  text-center">
            Effortless Billing With Our Online Invoice Generator
          </h1>
          <p className="text-base  text-center font-semibold text-muted-foreground ">
            Discover the ultimate solution for your invoicing needs with our
            online invoice generator and maker. Easily create, manage, and send
            professional invoices in minutes.
          </p>
          <Link href="/editor" className="flex justify-center mt-4">
            <Button
              size="lg"
              variant="default"
              className=" rounded-xl text-base "
            >
              Create Now
            </Button>
          </Link>
        </div>
      </section>
 <HeroImage />
      

      <section className="mt-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className=" font-bold text-foreground mt-10 scroll-m-20 text-center   text-4xl  tracking-tight transition-colors first:mt-0">
            Start with free invoice templates from Adobe Express.
          </h2>
          <p className=" text-muted-foreground font-semibold tracking-normal text-justify leading-7 [&:not(:first-child)]:mt-6">
            Make invoices quickly and easily with the Adobe Express online
            invoice creator. Explore our wide range of invoice templates and
            choose one that best matches your industry, niche, or aesthetic. Use
            Adobe Stock icons, graphics, shapes, and more to outline item costs
            and the goods or services you provide. To leave a lasting impression
            on buyers and clients, upload your brand logo, colors scheme, and
            fonts to your invoice. No experience required.
          </p>
          <div className="grid  grid-cols-4 gap-5 mt-8">
            <Image
              className="border shadow-md hover:scale-110 transition-all w-full h-auto"
              src="/zero.jpg"
             
              alt="template1"
              width={200}
              height={300}
            />
            <Image
              className="border shadow-md hover:scale-110 transition-all  w-full h-auto"
              src="/one.jpg"
              alt="template1" 
              width={200}
              height={300}
            />
            <Image
              className="border shadow-md hover:scale-110 transition-all  w-full h-auto"
              src="/template1.jpg"
              alt="template1"
              width={200}
              height={300}
            />
            <Image
              className="border shadow-md hover:scale-110 transition-all  w-full h-auto"
              src="/template1.jpg"
              alt="template1"
              width={200}
              height={300}
            />
            <Image
              className="border shadow-md hover:scale-110 transition-all  w-full h-auto"
              src="/template1.jpg"
              alt="template1"
              width={200}
              height={300}
            />
            <Image
              className="border shadow-md hover:scale-110 transition-all  w-full h-auto"
              src="/template1.jpg"
              alt="template1"
              width={200}
              height={300}
            />
            <Image
              className="border shadow-md hover:scale-110 transition-all  w-full h-auto"
              src="/template1.jpg"
              alt="template1"
              width={200}
              height={300}
            />
          </div>
        </div>
      </section>
      <section className="my-20 ">
        <div className="max-w-5xl mx-auto py-10">
          <h2 className=" font-bold text-foreground  scroll-m-20 text-center my-10  text-4xl  tracking-tight transition-colors first:mt-0">
            Frequenty asked questions
          </h2>
          <Faq />
        </div>
      </section>
    </main>
  );
}
