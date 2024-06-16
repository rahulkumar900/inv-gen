"use client";
import Image from "next/image";
import React, { ReactEventHandler } from "react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
interface Tilt {
  tiltX: number;
  tiltY: number;
  tiltZ: number;
}
export default function HeroImage() {
  const [tilt, setTilt] = useState<Tilt>({ tiltX: 0, tiltY: 0, tiltZ: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        console.clear();
        console.log(`centerX ${centerX}, centerY ${centerY}, ${x}, ${y}`);
        const tiltX = ((y - centerY) / centerY) * 5; // Adjust the multiplier for more/less tilt
        const tiltY = ((x - centerX) / centerX) * 5; // Adjust the multiplier for more/less tilt
        const tiltZ =
          (Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) /
            Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2))) *
            50 -
          5; // Adjust the multiplier for more/less depth

        setTilt({ tiltX, tiltY, tiltZ });
      }
    };

    const handleMouseLeave = () => {
      setTilt({ tiltX: 0, tiltY: 0, tiltZ: 0 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove as EventListener);
      container.addEventListener(
        "mouseleave",
        handleMouseLeave as EventListener
      );
    }

    return () => {
      if (container) {
        container.removeEventListener(
          "mousemove",
          handleMouseMove as EventListener
        );
        container.removeEventListener(
          "mouseleave",
          handleMouseLeave as EventListener
        );
      }
    };
  }, []);

  return (
    <section className="relative w-full ">
      <div className="max-w-5xl  w-full  mx-auto relative group  ">
        <div
          ref={containerRef}
          style={{
            transition: `transform 1s cubic-bezier(0.22, 0.78, 0.24, 0.98)`,
            transform: `rotateX(${tilt.tiltX}deg) rotateY(${tilt.tiltY}deg) translateZ(${tilt.tiltZ}px) translate3d(${tilt.tiltX}px,${tilt.tiltY}px,${tilt.tiltZ}px)`,
          }}
          className="w-full  relative p-4 ring-2 ring-accent shadow-md h-full bg-secondary rounded-xl overflow-hidden  "
        >
          <div className=" hidden group-hover:grid z-20 w-full h-full  bg-opacity-5 bg-blend-multiply bg-green-300 absolute top-0 left-0 place-items-center">
            {" "}
            <Link href="/editor">
              <Button className="rounded-xl">Create Now</Button>
            </Link>
          </div>
          <Image
            style={{
              transformStyle: "preserve-3d",
              transition: `transform 1s cubic-bezier(0.22, 0.78, 0.24, 0.98)`,
              transform: `rotateX(${tilt.tiltX}deg) rotateY(${tilt.tiltY}deg) translateZ(${tilt.tiltZ}px) translate3d(${tilt.tiltX}px,${tilt.tiltY}px,${tilt.tiltZ}px)`,
            }}
            src="/hero-template.png"
            alt="online-invoice-generator"
            width={1024}
            height={700}
            className=" shadow-lg z-10  rounded-xl object-cover object-center ring-1 ring-gray-200 "
          />
        </div>
      </div>
    </section>
  );
}
