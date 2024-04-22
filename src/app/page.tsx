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

export default function Home() {
  return (
    <main className="min-h-screen ">
      <section className="mt-[100px] grid grid-cols-12">
        <div className="col-start-2 mb-12 col-end-12  min-h-80 flex items-center justify-center">
           <div className="content text-center space-y-4  -mt-4">
        <h1 className=" leading-none mt-0 color-black text-7xl text-secondary-foreground font-extrabold text-center">
            Free <span className="bg-gradient-to-r from-primary to-orange-300 bg-clip-text text-transparent">invoice</span> maker.
          </h1>
          <p className="text-lg max-w-2xl text-center font-semibold text-muted-foreground ">
            Create an invoice online customized for your brand or business using
            an Adobe Express free invoice template.
          </p>
          </div>
          </div>
      </section>
      <section className="grid  grid-cols-12">
        <div className="  col-span-full md:col-start-1 md:col-end-8">
          <Form />
        </div>
        <div className=" h-[100vh-64px] hidden md:block col-start-8 col-end-13">
          <Test />
        </div>
      </section>
    </main>
  );
}
