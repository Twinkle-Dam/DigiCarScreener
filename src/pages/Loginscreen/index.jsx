import { Helmet } from "react-helmet";
import { Img, Text, Button, CheckBox, Input, Heading } from "../../components";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginscreenPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };
  return (
    <>
      <Helmet>
        <title>Login screen</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="relative h-[640px] w-full content-center bg-white-a700 md:h-auto">
        <div className="mx-auto flex flex-1 items-center md:flex-col">
          <Img
            src="images/img_ellipse_2.png"
            alt="Image"
            className="h-full w-[80%] object-contain md:w-full"
          />
          <div className="relative ml-[-156px] flex w-[24%] flex-col items-center gap-[22px] bg-white-a700 p-5 shadow-xs md:ml-0 md:w-full md:px-5 z-[1]">
            <Text as="p" className="!font-kronaone">
              <img src="images/company_logo.png" alt="" />
            </Text>
            <a href="#">
              <Heading as="h1">Log In</Heading>
            </a>
            <div className="flex flex-col items-center gap-4 self-stretch">
              <div className="flex flex-col gap-5 self-stretch">
                <div className="flex flex-col items-start gap-3">
                  <Text as="p" className="!text-[14px]">
                    Username
                  </Text>
                  <Input
                    type="text"
                    name="userName"
                    placeholder={`Enter username`}
                    value={userName}
                    onChange={handleInputChange}
                    className="flex h-[48px] items-center self-stretch bg-gray-100 px-3.5 text-[14px] text-blue_gray-400"
                  />
                </div>
                <div className="flex flex-col items-start gap-3">
                  <Text as="p" className="!text-[14px]">
                    Password
                  </Text>
                  <Input
                    type="password"
                    name="password"
                    placeholder={`Enter password`}
                    suffix={
                      <Img
                        src="images/img_eye.svg"
                        alt="Eye"
                        className="h-[18px] w-[18px]"
                      />
                    }
                    className="flex h-[48px] items-center justify-between gap-4 self-stretch bg-gray-100 px-3.5 text-[14px] text-blue_gray-400"
                  />
                </div>
              </div>
              <CheckBox
                name="rememberme"
                label="Remember me"
                id="rememberme"
                className="flex gap-2.5 self-start text-[14px] dark:text-dark-base  text-black-900"
              />
              <Button
                onClick={(e) => {
                  navigate("/homepagenew");
                }}
                className="flex h-[46px] flex-row items-center justify-center self-stretch border border-solid border-black-900 px-[33px] text-center font-lato1 text-[14px] font-semibold uppercase tracking-[-0.27px] dark:text-dark-base  text-black-900 sm:px-5"
              >
                Log In
              </Button>
              <a href="#">
                <Text as="p" className="!text-[14px]">
                  Forgot Password
                </Text>
              </a>
            </div>
          </div>
        </div>
        <Img
          src="images/img_image_7.png"
          alt="Imageseven"
          className="absolute bottom-0 left-0 m-auto object-contain"
        />
      </div>
    </>
  );
}
