// SocialMediaForm.js
"use client";

import React from "react";
import { FaLink } from "react-icons/fa";
import { useContext } from "react";
import { StateContext } from "../context/state";
import Getstarted from "./Getstarted";
import { socialMediaStyles } from "../styles/Appstyles";
import CustomSelect from "./CustomSelect";
import { useSession } from "next-auth/react";

const socialMediaPlatforms = Object.keys(socialMediaStyles);

const isValidUrl = (url: any) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const SocialMediaForm = () => {
  const {
    socialCards,
    updateSocialCard,
    removeSocialCard,
    handleSaveSocialLinks,
  } = useContext(StateContext);

  const { data: session } = useSession();

  if (socialCards.length === 0) {
    return <Getstarted />;
  }

  return (
    <div className="w-full h-[539px] flex flex-col overflow-y-auto overflow-x-hidden">
      {socialCards.map((card: any) => {
        const platformStyle = socialMediaStyles[card.platform] || {};
        const PlatformIcon = platformStyle.icon;

        return (
          <div
            key={card.id}
            className="relative w-full rounded-lg mb-4 p-4 border border-gray-200 bg-[#FAFAFA]"
          >
            <div className="absolute top-2 left-4  flex flex-col items-center justify-center">
              <span className="font-instrument-sans text-[16px] font-bold leading-[24px] text-left text-[#737373]">
                {" "}
                = Link #{socialCards.indexOf(card) + 1}
              </span>
            </div>
            <button
              onClick={() => removeSocialCard(card.id)}
              className="absolute top-2 right-4 text-gray-500 hover:text-[#633CFF]"
            >
              Remove
            </button>
            <form className="mt-6 space-y-4">
              <div>
                <label
                  className="font-instrument-sans text-[12px] font-normal leading-[18px] text-left text-[#333333]"
                  htmlFor={`platform-${card.id}`}
                >
                  Platform
                </label>
                <CustomSelect
                  id={`platform-${card.id}`}
                  value={card.platform}
                  onChange={(value: any) =>
                    updateSocialCard(card.id, value, card.link)
                  }
                  socialMediaPlatforms={socialMediaPlatforms}
                />
              </div>
              <div>
                <label
                  className="font-instrument-sans text-[12px] font-normal leading-[18px] text-left text-[#333333]"
                  htmlFor={`link-${card.id}`}
                >
                  Link
                </label>
                <div className="relative">
                  <FaLink className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                  <input
                    id={`link-${card.id}`}
                    type="text"
                    className={`font-instrument-sans text-[16px] font-normal focus:shadow-custom-focus leading-[24px] text-left text-[#333333] w-full pt-3 pb-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:border-[#633CFF] ${
                      card.link && !isValidUrl(card.link)
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="https://example.com"
                    value={card.link}
                    onChange={(e) =>
                      updateSocialCard(card.id, card.platform, e.target.value)
                    }
                  />
                </div>
                {card.link && !isValidUrl(card.link) && (
                  <span className="text-red-500 text-sm mt-1">
                    Please enter a valid URL
                  </span>
                )}
              </div>
            </form>
          </div>
        );
      })}

      <button
        onClick={handleSaveSocialLinks}
        className="mt-4 w-full h-[46px] p-[11px] text-white px-[27px] rounded-[8px] bg-[#633CFF] hover:bg-[#4f2fcf]"
      >
        Save
      </button>
    </div>
  );
};

export default SocialMediaForm;
