import React, { useState, useRef, useEffect } from 'react';
import { socialMediaStyles } from '../styles/Appstyles';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CustomSelect = ({ id, value, onChange, socialMediaPlatforms }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const PlatformIcon = socialMediaStyles[value]?.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="selected font-instrument-sans text-[16px] focus:shadow-custom-focus bg-white font-normal leading-[24px] text-left text-[#333333] w-full pt-3 pb-3 pl-10 pr-4 border border-gray-300 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {PlatformIcon && (
          <PlatformIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 text-2xl text-gray-400" />
        )}
        {value || "Select a platform"}
        <span className="absolute top-1/2 transform -translate-y-1/2 right-3 text-[#633CFF]">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border hover:text-[#633CFF] border-gray-300 rounded-md shadow-lg max-h-60 focus:shadow-custom-focus overflow-auto">
          {socialMediaPlatforms.map((platform) => {
            const PlatformIcon = socialMediaStyles[platform]?.icon;
            return (
              <div
                key={platform}
                className="font-instrument-sans text-[16px] font-normal leading-[24px] text-left text-[#333333] border-b-[#333333] w-full pt-3 pb-3 pl-10 pr-4 hover:text-[#633CFF] cursor-pointer relative"
                onClick={() => {
                  onChange(platform);
                  setIsOpen(false);
                }}
              >
                {PlatformIcon && (
                  <PlatformIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 text-2xl text-gray-400  " />
                )}
                {platform}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;