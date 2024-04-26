import Image from "next/image";
import Test from "./test";
import Counter from "@/components/counter";
import Form from "@/components/form";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <section className="mt-[65px] min-h-[50vh] flex flex-col justify-center">
        <div className="max-w-2xl mx-auto  flex flex-col gap-4 px-6">
          <h1 className=" leading-none mt-0 color-black text-6xl text-secondary-foreground font-extrabold text-center">
            Free{" "}
            <span className="bg-gradient-to-r from-primary to-orange-300 bg-clip-text text-transparent">
              invoice
            </span>{" "}
            maker.
          </h1>
          <p className="text-base  text-center font-semibold text-muted-foreground ">
            Create an invoice online customized for your brand or business using
            an Adobe Express free invoice template.
          </p>
          <a href="#editor" className="flex justify-center mt-4">
            <Button size="lg" className="rounded-full h-14 text-base">
              Create Now
            </Button>
          </a>
        </div>
      </section>

      <section className="grid  grid-cols-12 border-b">
        <div
          id="editor"
          className="  col-span-full md:col-start-1 md:col-end-8"
        >
          <Form />
        </div>
        <div className=" h-[100vh-64px] hidden md:block col-start-8 col-end-13">
          <Test />
        </div>
      </section>

      <section className="mt-20">
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
      
              <Image className="border shadow-md hover:scale-110 transition-all  w-full h-auto" src="/template1.jpg" alt="template1" width={200} height={300} />
              <Image className="border shadow-md hover:scale-110 transition-all  w-full h-auto" src="/template1.jpg" alt="template1" width={200} height={300} />
              <Image className="border shadow-md hover:scale-110 transition-all  w-full h-auto" src="/template1.jpg" alt="template1" width={200} height={300} />
              <Image className="border shadow-md hover:scale-110 transition-all  w-full h-auto" src="/template1.jpg" alt="template1" width={200} height={300} />
              <Image className="border shadow-md hover:scale-110 transition-all  w-full h-auto" src="/template1.jpg" alt="template1" width={200} height={300} />
              <Image className="border shadow-md hover:scale-110 transition-all  w-full h-auto" src="/template1.jpg" alt="template1" width={200} height={300} />
              <Image className="border shadow-md hover:scale-110 transition-all  w-full h-auto" src="/template1.jpg" alt="template1" width={200} height={300} />
              <Image className="border shadow-md hover:scale-110 transition-all  w-full h-auto" src="/template1.jpg" alt="template1" width={200} height={300} />
             
            
            
            
          </div>
        </div>
      </section>
    </main>
  );
}
