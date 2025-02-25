 
import React, { useEffect, useState } from 'react';

const Darkmodetoggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  // When isChecked changes, add or remove the 'dark' class on the <html> element.
  useEffect(() => {
    if (isChecked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Debug: log the current mode
    console.log("Dark mode enabled:", isChecked);
  }, [isChecked]);

  const handleCheckboxChange = () => {
    setIsChecked(prev => !prev);
  };

  return (
    <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="sr-only"
      />
      <span
        className={`slider mx-2 flex h-6 w-[40px] items-center rounded-full p-1 duration-200 ${
          isChecked ? 'bg-[#ffffff]' : 'bg-[#010101]'
        }`}
      >
        <span
          className={`dot h-4 w-4 rounded-full duration-200 ${
            isChecked ? 'translate-x-[19px] bg-black' : 'bg-white'
          }`}
        ></span>
      </span>
    </label>
  );
};

export default Darkmodetoggle;
