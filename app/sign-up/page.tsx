"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./sign-up.css";
import Image from "next/image";
import { registerUser } from "../../actions/actions";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordMismatch(false);
    setPasswordLengthError(false);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatch(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    let hasError = false;
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email) {
      setEmailError(true);
      hasError = true;
    }

    if (password.length < 8) {
      setPasswordLengthError(true);
      hasError = true;
    }

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      hasError = true;
      return;
    }
    if (hasError) {
      setLoading(false);
      return;
    }
    try {
      const res = await registerUser(email, password);
      console.log({ res });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.push("/");
    } catch (e) {
      console.log(e);
      setError(e instanceof Error ? e : new Error("An unknown error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF] sm:bg-[#FAFAFA] p-[32px]">
      <div className="  h-[709px] pt-0 w-[100%] max-w-md sm:w-[476px] ">
        <div
          className="flex items-center justify-start sm:justify-center"
          style={{ marginBottom: "51px" }}
        >
          <Image
            src="/logo.svg"
            alt="logo"
            className="w-10 h-10 mr-2"
            width={27}
            height={27}
          />
          <h2 className="text-3xl md:text-4xl font-bold text-[#333333]">
            devlinks
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="sm:w-[473px] sm:h-[618px] rounded-md bg-white sm:p-[40px]  pl-[0] sm:shadow-md"
        >
          <p className="text-dark-grey font-instrument-sans text-[#333] sm:text-[32px] text-[24px] font-bold leading-48px">
            Create account
          </p>
          <p className="text-grey font-instrument-sans text-16px font-normal text-[#737373] pb-[40px] leading-24px">
            Let&apos;s get you started sharing your links!
          </p>

          <div className="flex flex-col w-[full] items-start gap-6 self-stretch">
            <div className="w-full">
              <p className="text-dark-grey font-instrument-sans text-12px font-normal leading-18px">
                Email address
              </p>

              <div
                className={`input-container border border-borders  flex items-center w-auto sm:w-[396px] py-3 px-4 ${
                  emailError ? "border-red-500" : "border-borders"
                } bg-white-custom rounded-lg p-4`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="mr-3"
                >
                  <path
                    d="M14 3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3ZM13.5 12H2.5V4.63688L7.66187 9.36875C7.75412 9.45343 7.87478 9.50041 8 9.50041C8.12522 9.50041 8.24588 9.45343 8.33813 9.36875L13.5 4.63688V12Z"
                    fill="#737373"
                  />
                </svg>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="text-body-m font-normal leading-body-m text-dark-grey font-instrument-sans w-full  focus:outline-none  focus:border-transparent hover:border-transparent active:border-transparent"
                  placeholder="ben@example.com"
                  required
                />
                {emailError && (
                  <p className="font-instrument-sans text-[12px] w-[162px] font-normal leading-[18px] text-red-500">
                    {" "}
                    Can&apos;t be empty
                  </p>
                )}
              </div>
            </div>

            <div className="w-full">
              <p className="text-dark-grey font-instrument-sans w-[auto] sm:w-[396px] text-12px font-normal leading-18px">
                Create password
              </p>

              <div
                className={`input-container border border-borders  flex items-center w-auto sm:w-[396px] py-3 px-4 ${
                  passwordLengthError ? "border-red-500" : "border-borders"
                } bg-white-custom rounded-lg p-4`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="mr-3"
                >
                  <path
                    d="M13 5H11V3.5C11 2.70435 10.6839 1.94129 10.1213 1.37868C9.55871 0.81607 8.79565 0.5 8 0.5C7.20435 0.5 6.44129 0.81607 5.87868 1.37868C5.31607 1.94129 5 2.70435 5 3.5V5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V6C14 5.73478 13.8946 5.48043 13.7071 5.29289C13.5196 5.10536 13.2652 5 13 5ZM8.5 9.91438V11.5C8.5 11.6326 8.44732 11.7598 8.35355 11.8536C8.25979 11.9473 8.13261 12 8 12C7.86739 12 7.74021 11.9473 7.64645 11.8536C7.55268 11.7598 7.5 11.6326 7.5 11.5V9.91438C7.16639 9.79643 6.88522 9.56434 6.70618 9.25914C6.52715 8.95393 6.46177 8.59526 6.5216 8.24651C6.58144 7.89776 6.76264 7.58139 7.03317 7.35332C7.3037 7.12525 7.64616 7.00016 8 7.00016C8.35384 7.00016 8.6963 7.12525 8.96683 7.35332C9.23736 7.58139 9.41856 7.89776 9.4784 8.24651C9.53823 8.59526 9.47285 8.95393 9.29382 9.25914C9.11478 9.56434 8.83361 9.79643 8.5 9.91438ZM10 5H6V3.5C6 2.96957 6.21071 2.46086 6.58579 2.08579C6.96086 1.71071 7.46957 1.5 8 1.5C8.53043 1.5 9.03914 1.71071 9.41421 2.08579C9.78929 2.46086 10 2.96957 10 3.5V5Z"
                    fill="#737373"
                  />
                </svg>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="text-body-m font-normal leading-body-m text-dark-grey font-instrument-sans w-full focus:outline-none focus:border-transparent hover:border-transparent active:border-transparent"
                  placeholder="•••••••••••••••••"
                  required
                />
                {passwordLengthError && (
                  <p className="font-instrument-sans text-[12px] w-[162px] font-normal leading-[18px] text-red-500">
                    Password must be at least 8 characters
                  </p>
                )}
              </div>
            </div>

            <div className="w-full">
              <p className="text-dark-grey font-instrument-sans  text-12px font-normal leading-18px">
                Confirm password
              </p>

              <div
                className={`input-container flex items-center w-[auto] sm:w-[396px] py-3 px-4 border border-borders bg-white-custom rounded-lg p-4 ${
                  passwordMismatch ? "border-red-500" : "border-borders"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="mr-3"
                >
                  <path
                    d="M13 5H11V3.5C11 2.70435 10.6839 1.94129 10.1213 1.37868C9.55871 0.81607 8.79565 0.5 8 0.5C7.20435 0.5 6.44129 0.81607 5.87868 1.37868C5.31607 1.94129 5 2.70435 5 3.5V5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V6C14 5.73478 13.8946 5.48043 13.7071 5.29289C13.5196 5.10536 13.2652 5 13 5ZM8.5 9.91438V11.5C8.5 11.6326 8.44732 11.7598 8.35355 11.8536C8.25979 11.9473 8.13261 12 8 12C7.86739 12 7.74021 11.9473 7.64645 11.8536C7.55268 11.7598 7.5 11.6326 7.5 11.5V9.91438C7.16639 9.79643 6.88522 9.56434 6.70618 9.25914C6.52715 8.95393 6.46177 8.59526 6.5216 8.24651C6.58144 7.89776 6.76264 7.58139 7.03317 7.35332C7.3037 7.12525 7.64616 7.00016 8 7.00016C8.35384 7.00016 8.6963 7.12525 8.96683 7.35332C9.23736 7.58139 9.41856 7.89776 9.4784 8.24651C9.53823 8.59526 9.47285 8.95393 9.29382 9.25914C9.11478 9.56434 8.83361 9.79643 8.5 9.91438ZM10 5H6V3.5C6 2.96957 6.21071 2.46086 6.58579 2.08579C6.96086 1.71071 7.46957 1.5 8 1.5C8.53043 1.5 9.03914 1.71071 9.41421 2.08579C9.78929 2.46086 10 2.96957 10 3.5V5Z"
                    fill="#737373"
                  />
                </svg>
                <input
                  type="password"
                  id="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="text-body-m font-normal leading-body-m text-dark-grey font-instrument-sans w-full focus:outline-none focus:border-transparent hover:border-transparent active:border-transparent"
                  placeholder="•••••••••••••••••"
                  required
                />
              </div>
            </div>

            <p className="text-grey font-instrument-sans text-[12px] font-normal text-[#737373]">
              Password must contain at least 8 characters
            </p>
            <div className="flex items-center justify-between w-full">
              <button
                onClick={handleSubmit}
                type="submit"
                className="signUp-btn w-full rounded-lg bg-[#633CFF]  text-white  py-2 px-4 focus:outline-none"
              >
                Create new account
              </button>
            </div>

            <p className="text-base font-normal leading-loose text-[16px] text-[#737373] font-Instrument Sans text-center self-center w-[200px] sm:w-full">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-[#633CFF]">
                Login
              </Link>
            </p>
          </div>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </div>
  );
};

export default SignUp;
