import React, { useState } from "react";

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="">
      <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-transparent  ">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            !isChecked
              ? "text-white bg-[var(--orangeBackground)] rounded-[50px]"
              : "text-white"
          }`}
        >
       
          All Messages
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked
              ? "text-white bg-[var(--orangeBackground)] rounded-[50px]"
              : "text-white"
          }`}
        >
          
          Unread (0)
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
