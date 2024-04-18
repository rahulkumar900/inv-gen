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
      <section className="grid  grid-cols-12">
        <div className="my-8 col-span-full md:col-start-1 md:col-end-8">
          <Form />
        </div>
        <div className=" hidden md:block col-start-8 col-end-13">
          <Test />
        </div>
      </section>
    </main>
  );
}
