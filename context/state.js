// State.js
"use client";
import { createContext, useState, useEffect } from "react";
import { fetchSocialLinks } from "../actions/actions";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

export const StateContext = createContext();

export default function State({ children }) {
  const [name, setName] = useState("");
  const [Lname, setLName] = useState("");
  const [emailad, setEmailad] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  const [socialCards, setSocialCards] = useState([]);
  const [userId, setUserId] = useState(""); // Add userId state

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const fetchedSocialLinks = await fetchSocialLinks(userId);
        // Ensure fetched data has the correct structure
        const formattedSocialLinks = fetchedSocialLinks.map((link) => ({
          id: uuidv4(), // Generate a unique ID for each fetched link
          platform: link.platform,
          link: link.url,
        }));
        setSocialCards(formattedSocialLinks);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    console.log("State: socialCards updated", socialCards);
  }, [socialCards]);

  const addSocialCard = () => {
    console.log("addSocialCard called");
    setSocialCards((prevCards) => {
      const newCard = { id: uuidv4(), platform: "", link: "" };
      const updatedCards = [...prevCards, newCard];
      console.log("Updated socialCards:", updatedCards);
      return updatedCards;
    });
  };

  const updateSocialCard = (id, platform, link) => {
    setSocialCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, platform, link } : card
      )
    );
  };

  const addPlatform = (platform, link) => {
    setSelectedPlatform((prevPlatforms) => {
      if (!prevPlatforms.some((p) => p.platform === platform)) {
        return [...prevPlatforms, { platform, link }];
      }
      return prevPlatforms;
    });
  };

  const removeSocialCard = (id) => {
    setSocialCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleSaveSocialLinks = async () => {
    if (!userId) {
      console.error("No user ID found. Cannot save social links.");
      return;
    }

    try {
      const result = await saveSocialLinks(userId, socialCards); // Pass userId
      if (result.success) {
        console.log("Social links saved successfully");
      } else {
        console.error("Failed to save social links:", result.error);
      }
    } catch (error) {
      console.error("Error saving social links:", error);
    }
  };

  const context = {
    name,
    setName,
    Lname,
    setLName,
    emailad,
    setEmailad,
    selectedPlatform,
    setSelectedPlatform,
    addPlatform,
    socialCards,
    addSocialCard,
    updateSocialCard,
    removeSocialCard,
    saveSocialLinks: handleSaveSocialLinks,
    userId, // Add userId to context
    setUserId, // Add setUserId to context
  };
  return (
    <StateContext.Provider value={context}>{children}</StateContext.Provider>
  );
}
