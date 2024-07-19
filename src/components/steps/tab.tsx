import React from 'react';
import Timer from './timer';

interface TabProps {
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
}

const Tab: React.FC<TabProps> = ({ index, isActive, onClick }) => {
  return (
    <div
      className={`relative w-8 h-8  items-center justify-center `}
      onClick={() => onClick(index)}
    >
   
      <Timer isActive={isActive} index={index+1} />
    </div>
  );
};

export default Tab;
