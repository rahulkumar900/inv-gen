import React, { useEffect, useRef, useState } from 'react';

interface TimerProps {
  isActive: boolean;
  index: number;
}

const Timer: React.FC<TimerProps> = ({ isActive,index  }) => {
  const circleRef = useRef<SVGPathElement>(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let percent = 0;
    const currentCircleRef = circleRef.current; // Capture the current ref value

    if (isActive) {
      intervalId = setInterval(() => {
        // percent += 1.66667; // 1.66667% per second for 60 seconds
        percent += 10;
        setSeconds((prevSeconds) => prevSeconds + 1);
        if (currentCircleRef) {
          currentCircleRef.style.strokeDasharray = `${(percent / 100) * 2 * Math.PI * 34}, ${2 * Math.PI * 34}`;
        }
        if (percent >= 100) {
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
      setSeconds(0);
      if (currentCircleRef) {
        currentCircleRef.style.strokeDasharray = `0, ${2 * Math.PI * 34}`;
      }
    };
  }, [isActive]);

  return (
    <svg
      className={`shadow-inner  drop-shadow-md ${isActive? "animate-bounce" : "" } shadow-black rounded-full font-bold`}
      viewBox="0 0 72 72"
    >
      <circle className={` shadow-inner fill-current  text-white `}  cx="36" cy="36" r="34"></circle>
      <path
        ref={circleRef}
        className={`fill-none transition-all  ease-linear stroke-primary  stroke-[10px] stroke-linecap-round transform rotate-[-90deg] origin-center ${isActive ? "fill-none" : "fill-none"}`}
        strokeDasharray={`0, ${2 * Math.PI * 34}`}
        d="M36 2
           a 34 34 0 0 1 0 68
           a 34 34 0 0 1 0 -68"
      />
      <text x="36" y="44" textAnchor="middle" fontSize="26" fill="black">{seconds || index}</text>
    </svg>
  );
};

export default Timer;
