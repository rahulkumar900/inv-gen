"use client";

import React from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "../lib/hooks";
import { increment, decrement } from "../lib/features/invoice/invoiceSlice";
const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div
      aria-label="counter"
      className="inline-flex overflow-hidden border rounded-lg border-slate-200"
    >
      <button
        onClick={() => dispatch(decrement())}
        className="flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-slate-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>
      <span className="flex items-center justify-center w-20 h-10 text-2xl font-bold">
        {count}
      </span>
      <button
        onClick={() => dispatch(increment())}
        className="flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-slate-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Counter;
