import { Img, Button, Heading } from "../../components";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SplashscreenRow() {
  const navigate = useNavigate();

  return (
    <div className=" h-[640px] bg-[url(/images/img_group_2.png)] bg-cover bg-no-repeat md:h-auto">
      <div className="flex flex-col items-center">
        <div className="flex h-[390px] items-end justify-center self-stretch bg-[url(/images/img_group_1.png)] bg-cover bg-no-repeat p-14 md:h-auto md:p-5">
          <div className="mt-[74px] flex flex-col items-center">
            <Heading
              as="h1"
              className="!text-[30px] !font-normal md:!text-[28px] sm:!text-[26px]"
            >
             <img src="images/company_logo.png" alt="" />
            </Heading>
            <Heading
              size="texts"
              as="h2"
              className="mt-2 bg-gradient bg-clip-text !font-manrope !text-transparent"
            >
              Digital Car Screener
            </Heading>
            <Heading as="h3">
              &quot;Empowering Mobility with Seamless Digital Car Data
              Integration&quot;
            </Heading>
            <Button
              onClick={(e) => {
                navigate("/login");
              }}
              className="mt-5 flex h-[46px] min-w-[214px] flex-row items-center justify-center border border-solid border-black-900 px-[33px] text-center font-lato1 text-[14px] font-semibold uppercase tracking-[-0.27px] text-black-900 sm:px-5"
            >
              Get Started
            </Button>
          </div>
        </div>
        <Img
          src="images/img_image_11.png"
          alt="Imageeleven"
          className="relative mt-[-16px] h-[264px] w-[26%] object-contain"
        />
      </div>
    </div>
  );
}
