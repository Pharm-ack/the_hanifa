"use client";

import React from "react";
import { StateContext } from "../context/state";
import { useContext } from "react";
import { socialMediaStyles} from "../styles/Appstyles";
import { FaArrowRight } from "react-icons/fa";

const DisplaySelectedPlatforms = () => {
  const { socialCards } = useContext(StateContext);

 



  return (
    <div className="w-full space-y-2">
      {socialCards.map((card:any) => {
        if (card.platform && card.link) {
          const platformStyle = socialMediaStyles[card.platform] || {};
          const PlatformIcon = platformStyle.icon;
        

          return (
            <div
              key={card.id}
              className="w-full h-[44px] rounded-[12px] bg-[#EEEEEE] flex justify-between items-center pl-3 pr-3"
              style={{ backgroundColor: platformStyle.bgColor || "#EEEEEE" }}
            >
              <div className="flex">
              {PlatformIcon && (
                <PlatformIcon
                  className="mr-2 text-xl"
                  style={{ color: platformStyle.color }}
                />
              )}
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-instrument-sans text-[16px] font-normal"
                style={{ color: platformStyle.color }}
              >
                {card.platform}
              </a>
              </div>
              <FaArrowRight className="text-white" />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default DisplaySelectedPlatforms;



