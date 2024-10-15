"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  useEffect,
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { CgProfile } from "react-icons/cg";
import { FaLink } from "react-icons/fa6";
import "./page.css";
import { HiOutlinePhoto } from "react-icons/hi2";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import SocialMediaForm from "../components/SocialMediaForm";
import { StateContext } from "../context/state";
import DisplaySelectedPlatforms from "../components/DisplaySelectedPlatforms";
import AddLinkButton from "../components/AddLinkButton";
import { useSession } from "next-auth/react";
import { useUploadThing } from "../lib/uploadthing";
import createDetails from "../actions/actions";

export default function Home() {
  const { socialCards, updateSocialCard, removeSocialCard } =
    useContext(StateContext);
  const { data: session } = useSession();

  const [imgFile, setImgFile] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  console.log("from Preview", imagePreview);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("Error occurred", err);
    },
    onUploadBegin: () => {
      alert("Upload has begun 🚀!");
    },
  });

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File;
    const formData = new FormData();
    formData.append("image", file);
    if (!file) {
      return;
    }
    try {
      const res = await startUpload([file]);
      if (res && res.length > 0) {
        console.log(res);
        // Updated condition to check if res is defined
        setImagePreview(res[0].url);
        setImgFile(res[0].url);
        // setUserProfileState((prev) => ({ ...prev, image: res[0].url }));
        // toast.success("Image uploaded successfully");
      }
    } catch (e) {
      // toast.error("Error uploading image");
    }
  };

  const handleSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    // Ensure lastName is a string before appending
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);

    // Ensure imgFile is a Blob before appending
    if (imgFile) {
      formData.append("imgFile", imgFile);
    }

    const response = await createDetails(formData);

    if (response?.error) {
      alert("Could not update details. Please try again.");
      return;
    }

    if (!response?.error) {
      alert("Details updated successfully!");
    }
  };

  const {
    name,
    setName,
    Lname,
    setLName,
    emailad,
    setEmailad,
    selectedPlatform,
    setSelectedPlatform,
    saveSocialLinks,
  } = useContext(StateContext);
  const [showProfile, setShowprofile] = useState<boolean>(true);
  const [showLinks, setShowlinks] = useState<boolean>(false);

  const {
    name: contextName,
    setName: contextsetName,
    Lname: contextLName,
    setLName: contextsetLName,
    emailad: contextemailad,
    setEmailad: contextsetEmailad,
  } = useContext(StateContext);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const session:any = sessionStorage.getItem('user');
  //     setUserSession(session);
  //   }
  // }, []);

  // console.log({ user, userSession });
  // console.log({user})

  // if (!user && !userSession){
  //  return  router.push('/sign-up')
  // } ;

  const handleShowprofile = () => {
    setShowprofile(true);
    setShowlinks(false);
  };

  const handleShowlinks = () => {
    setShowprofile(false);
    setShowlinks(true);
  };

  const handleSave = async () => {
    try {
      // if (!session?.user?.id) {
      //   throw new Error("User not authenticated");
      // }

      await saveSocialLinks(session?.user?.id, socialCards);
      console.log(socialCards);
    } catch (error) {
      console.error("Error saving social links:", error);
    }
  };

  // const handleSave = async () => {
  //   await saveSocialLinks();
  // };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100">
      <nav className="w-full max-w-[1440px] h-[126px] p-[24px] flex items-center justify-between bg-gray-100">
        <div className="w-full max-w-[1392px] h-[78px] pl-[24px] pr-[16px] pt-[16px] pb-[16px] flex items-center justify-between gap-[8px] bg-white rounded-[12px]">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="logo"
              width={27}
              height={27}
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-bold text-[#333333] sm:block hidden">
              devlinks
            </h2>
          </div>

          <div className="flex items-center md:gap-2 gap-0">
            <button
              onClick={handleShowlinks}
              className={`w-auto nav-btn flex  items-center justify-between h-auto px-[27px] py-[11px] gap-[8px] rounded-[8px] font-instrument-sans text-[16px] font-semibold leading-[24px] text-left bg-none text-[#737373] hover:text-[#633CFF] ${
                showLinks ? "bg-[#EFEBFF] text-[#633CFF]" : ""
              }`}
            >
              <FaLink
                className={`font-extrabold text-[24px] ${
                  showLinks ? "text-[#633CFF]" : ""
                } `}
              />
              <span
                className={`sm:block hidden ${
                  showLinks ? "text-[#633CFF]" : ""
                } `}
              >
                Links
              </span>
            </button>
            <button
              onClick={handleShowprofile}
              className={`w-auto nav-btn flex  items-center justify-between h-auto px-[27px] py-[11px] gap-[8px] rounded-[8px] font-instrument-sans text-[16px] font-semibold leading-[24px] text-left bg-none text-[#737373] hover:text-[#633CFF] ${
                showProfile ? "bg-[#EFEBFF] text-[#633CFF]" : ""
              }`}
            >
              <CgProfile
                className={`font-extrabold  text-[24px] ${
                  showProfile ? "text-[#633CFF]" : ""
                }`}
              />
              <span
                className={`sm:block hidden ${
                  showProfile ? "text-[#633CFF]" : ""
                } `}
              >
                Profile Details
              </span>
            </button>
          </div>

          <div className="flex items-center">
            <button className="w-auto h-auto sm:px-[27px] px-4 hover:bg-[#EFEBFF]  py-[11px] gap-[8px] rounded-[8px] font-instrument-sans text-[16px] font-semibold leading-[24px] text-left bg-none border border-[#633CFF] text-[#633CFF]">
              <MdOutlineRemoveRedEye className="font-extrabold sm:hidden block text-[24px]" />{" "}
              <span className="sm:block hidden">Preview</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex w-full max-w-[1440px] h-[858px] p-[24px] gap-[24px] mx-auto pt-0 ">
        <div className="relative w-[40%] h-[834px] pt-[24px] rounded-[12px] bg-white hidden md:block">
          <div className="mock-up absolute inset-0 flex items-center justify-center">
            <svg
              width="308"
              height="632"
              viewBox="0 0 308 632"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z"
                stroke="#737373"
              />
              <path
                d="M12 55.5C12 30.9233 31.9233 11 56.5 11H80.5C86.8513 11 92 16.1487 92 22.5C92 30.5081 98.4919 37 106.5 37H201.5C209.508 37 216 30.5081 216 22.5C216 16.1487 221.149 11 227.5 11H251.5C276.077 11 296 30.9233 296 55.5V576.5C296 601.077 276.077 621 251.5 621H56.5C31.9233 621 12 601.077 12 576.5V55.5Z"
                fill="white"
                stroke="#737373"
              />
            </svg>
          </div>

          <form></form>
          <div className="absolute inset-0 flex flex-col items-center justify-center w-full">
            <div className="tops mb-4 flex flex-col items-center justify-center ">
              {!contextName && !contextLName ? (
                <div className="h-[96px] w-[96px] rounded-full bg-[#EEEEEE] mb-4"></div>
              ) : (
                ""
              )}

              {!contextName && !contextLName ? (
                <div className="w-[160px] h-[16px] rounded-[12px] bg-[#EEEEEE] mb-2 placeholder"></div>
              ) : (
                <p className="font-instrument-sans text-lg font-semibold leading-[27px] text-center name text-[#333333]">
                  {contextName} {contextLName}
                </p>
              )}

              {!contextemailad ? (
                <div className="w-[72px] h-[8px] rounded-[12px] bg-[#EEEEEE] placeholder"></div>
              ) : (
                <p className="font-instrument-sans text-sm font-normal leading-[21px] text-center text-[#737373] name">
                  {contextemailad}
                </p>
              )}
            </div>

            <div className="tops w-[40%] h-[300px] flex flex-col items-center gap-6 mt-6">
              <DisplaySelectedPlatforms />
              <div className="w-full h-[44px] rounded-[12px] bg-[#EEEEEE] "></div>
              <div className="w-full h-[44px] rounded-[12px] bg-[#EEEEEE] "></div>
              <div className="w-full h-[44px] rounded-[12px] bg-[#EEEEEE] "></div>
              <div className="w-full h-[44px] rounded-[12px] bg-[#EEEEEE] "></div>
              <div className="w-full h-[44px] rounded-[12px] bg-[#EEEEEE] "></div>
            </div>
          </div>
        </div>

        {showProfile && (
          <div className=" md:w-[60%] w-[100%] sm:h-[834px] h-[fit-content] rounded-[12px] bg-white ">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full h-[auto] sm:h-[739px] p-[40px] gap-[40px] flex flex-col ">
                <div>
                  <p className="text-[#333333] font-instrument-sans text-[24px]  md:text-[32px] font-bold leading-[48px] text-left">
                    Profile details
                  </p>
                  <p className="text-[#737373] font-instrument-sans  text-[16px] font-normal leading-[24px] text-left">
                    Add your details to create a personal touch to your profile.
                  </p>
                </div>

                <div className="w-full h-auto flex flex-col justify-between gap-[24px] ">
                  <div className="w-full h-auto p-[20px]  rounded-[12px] bg-[#FAFAFA] flex flex-col sm:flex-row justify-between items-start md:items-center  ">
                    <p className="text-[#888888] font-[Instrument Sans] text-[16px] font-normal leading-[24px] text-left mb-3 md:mb-0">
                      Profile picture
                    </p>

                    <div className="md:w-[432px] w-[70%] flex flex-col sm:flex-row  justify-between items-start lg:w[60%]  md:items-center">
                      <label className="relative cursor-pointer w-[193px] h-[193px] rounded-[12px] bg-[#EFEBFF] text-[#633CFF] mb-3 md:mb-0 flex flex-col justify-center items-center">
                        <HiOutlinePhoto className="text-[32px]" />

                        <input
                          type="file"
                          name="image"
                          id="image"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        {imagePreview && (
                          <>
                            <Image
                              width={200}
                              height={200}
                              src={imagePreview}
                              alt="Preview"
                              className="mb-4 max-w-xs absolute w-full h-full object-cover rounded-xl top-0"
                            />
                            <div className="absolute inset-0 bg-black/50 rounded-xl"></div>
                          </>
                        )}
                        <span className="font-instrument-sans text-[16px] font-semibold leading-[24px] ">
                          +Upload Photo
                        </span>
                      </label>
                      <p className="font-instrument-sans text-[12px] md:w-[40%]  font-normal w-full lg:w-[215px] leading-[18px] text-[#737373]  text-left">
                        Image must be below 1024x1024px. Use PNG or JPG format.
                      </p>
                    </div>
                  </div>

                  <div className="w-full h-auto p-[20px]  gap-[12px] rounded-[12px] bg-[#FAFAFA]">
                    <div className="flex sm:items-center items-start  justify-between flex-col sm:flex-row">
                      <label
                        htmlFor="firstName"
                        className="  font-instrument-sans text-[16px] font-medium text-[#333333]"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className=" input-page lg:w-[432px] sm:w-[70%] w-full  px-3 py-2 border focus:outline-none m-0 border-[#D9D9D9] rounded-md font-instrument-sans text-[16px] text-[#333333]"
                        placeholder="e.g John"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="flex sm:items-center items-start justify-between  flex-col sm:flex-row  ">
                      <label
                        htmlFor="lastName"
                        className="  font-instrument-sans text-[16px] font-medium text-[#333333]"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className="input-page lg:w-[432px] sm:w-[70%] w-full  px-3 py-2 border focus:outline-none border-gray-300 rounded-md font-instrument-sans text-[16px] text-[#333333]"
                        placeholder="e.g. Appleseed"
                        value={Lname}
                        onChange={(e) => setLName(e.target.value)}
                      />
                    </div>

                    <div className="flex sm:items-center items-start justify-between  flex-col sm:flex-row ">
                      <label
                        htmlFor="email"
                        className="  font-instrument-sans text-[16px] font-medium text-[#333333]"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="input-page lg:w-[432px] sm:w-[70%] m-0 w-full px-3 py-2 border focus:outline-none border-gray-300 rounded-md font-instrument-sans text-[16px] text-[#333333]"
                        placeholder="e.g example@example.com"
                        value={emailad}
                        // defaultValue={}
                        onChange={(e) => setEmailad(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-[95px] p-[40px] flex flex-col justify-center items-end border border-t-gray">
                <button className="sm:w-[91px]  w-[100%] h-[46px] p-[11px] text-white px-[27px] rounded-[8px]  bg-[#633CFF] gap-[8px]">
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {showLinks && (
          <div className="md:w-[60%] w-[100%]  sm:h-[834px] h-[fit-content] rounded-[12px] bg-white">
            <div className="w-full h-[739px] p-[40px] gap-[40px] flex flex-col justify-between ">
              <div>
                <p className="text-[#333333] font-instrument-sans text-[24px] md:text-[32px] font-bold leading-[48px] text-left">
                  Customize your links
                </p>
                <p className="text-[#737373] font-instrument-sans  text-[16px] font-normal leading-[24px] text-left">
                  Add/edit/remove links below and then share all your profiles
                  with the world!
                </p>
              </div>
              <AddLinkButton />

              <SocialMediaForm />
            </div>

            <div className="w-full h-[95px] p-[40px] flex flex-col justify-center items-end border border-t-gray">
              <button
                onClick={handleSave}
                className="sm:w-[91px] w-full h-[46px] p-[11px] text-white px-[27px] rounded-[8px] bg-[#633CFF] hover:bg-[#4f2fcf]"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
