"use server";
import { readFile } from "fs";
import { auth, signIn } from "../auth";
import prisma from "../lib/db";

type ResponseData = {
  success: boolean;
  message: string;
};

export async function saveSocialLinks(userId: string, socialCards: any[]) {
  const session = await auth();
  console.log(session);
  // if (!userId) {
  //   console.error("Invalid userId provided.");
  //   throw new Error("User ID is required to save social links.");
  // }

  // Verify that the userId exists in the User table
  // const userExists = await prisma.user.findUnique({
  //   where: { id: userId },
  // });

  // if (!userExists) {
  //   console.error(`User with ID ${userId} does not exist.`);
  //   throw new Error("User ID does not exist.");
  // }

  console.log(socialCards);
  try {
    // Create new links
    const links = socialCards.map((card) => ({
      userId: userId,
      platform: card.platform,
      url: card.link,
    }));

    await prisma.link.createMany({
      data: links,
    });
    console.log("saved");
    return { success: true };
  } catch (error) {
    console.error("Error saving social links:", error);
    throw error;
  }
}

export async function fetchSocialLinks(userId: string) {
  try {
    const socialLinks = await prisma.link.findMany({
      where: { userId },
    });
    return socialLinks;
  } catch (error) {
    console.error("Error fetching social links:", error);
    return [];
  }
}

export async function registerUser(
  email: string,
  password: string
): Promise<ResponseData> {
  try {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    console.log("User created successfully!");
    return {
      success: true,
      message: "User created successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "User creation failed",
    };
  }
}

export async function signInUser(
  email: string,
  password: string
): Promise<ResponseData> {
  try {
    await signIn("credentials", {
      email,
      password,
    });
    console.log("User signed in successfully");
    return {
      success: true,
      message: "User signed in successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "User creation failed",
    };
  }
}

export default async function createDetails(formData: FormData) {
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    imgUrl: formData.get("imgFile"),
    email: formData.get("email"),
  };

  // Validate data here before destructing below

  // const { firstName, lastName, imgUrl, email } = data;

  try {
    await prisma.user.create({
      data: {
        first_name: data.firstName as string,
        last_name: data.lastName as string,
        email: data.email as string,
        image: data.imgUrl as string,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to update post." };
  }
}
