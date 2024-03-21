import Image from "next/image";
import Test from "./test";
import Counter from "@/components/counter";
import Form from "@/components/form";

export default function Home() {
  return (
    <main className="flex min-h-screen divide-x   justify-between ">
      {/* <Counter /> */}
      <section className="w-3/5 relative">
        <Form />
      </section>
      <div className="w-2/5 relative">
        <Test />
      </div>
    </main>
  );
}
