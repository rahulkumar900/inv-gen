"use client";
import { useState, useEffect } from "react";
import Tab from "./tab";

export default function HowTo() {
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTab((prevTab) => (prevTab + 1) % 5);
    }, 11000); // 10000 milliseconds = 11 seconds

    return () => clearInterval(intervalId);
  }, []);

  const contents = [
    {
    "title": "Content 1: ",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
    {
    "title": "Content 2: ",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
    {
    "title": "Content 3: ",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
    {
    "title": "Content 4: ",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
    {
    "title": "Content 5: ",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
    {
    "title": "Content 6: ",
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
    
   
  ];

  const cl = contents.length;

  return (
    <div className="relative w-full h-full  border p-10 rounded-md ">
      <h2 className="text-4xl mb-6 font-bold text-left">
        How to use the online invoice generator.
      </h2>
      <div className="flex mb-12 justify-left gap-4">
        {Array.from({length : cl}).map((_, index) => (
          <Tab
            key={index}
            index={index}
            isActive={currentTab === index}
            onClick={() => setCurrentTab(index)}
          />
        ))}
      </div>
      <div className="h-52 relative overflow-hidden">
        {contents.map(({title,description}, index) => {
          const isActive = currentTab === index;

          const className = isActive ? "animate-slide-in" : "animate-slide-out";

          return (
            <div key={index} className="absolute top-0 left-0">
              <h2  className={` text-3xl mb-4  font-bold  line-clamp-2  transition-all  w-full ${className}`}>{title} </h2>
              <p
                
                className={`text-xl   line-clamp-4 w-full ${className}`}
              >
                {description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
