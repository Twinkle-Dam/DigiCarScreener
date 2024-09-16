import { Img, Text, Heading, Switch } from "./..";
import React from "react";

export default function Header({ ...props }) {
  return (
    <header
      {...props}
      className={`flex self-stretch items-center p-1 bg-white-a700 dark:bg-dark-700 shadow-xs`}
    >
      <div className="mx-auto flex w-full ml-2 mr-2 items-center justify-between gap-5 sm:flex-col">
        <span className="bg-white-a700 p-2">
          <Img
            src="images/company_logo.png"
            alt="Headerlogo"
            className="h-[40px] w-[112px] object-contain "
          />
        </span>
        <div className="flex items-center justify-center gap-5 sm:w-full">
          <div className="flex rotate-[-180deg] items-center gap-2.5">
            <Text
              as="p"
              className="rotate-[180deg] !font-lato1 !font-medium text-black-900 dark:text-white-a700"
            >
              Light Theme
            </Text>
            <Switch value={false} />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-1 items-center justify-center gap-2.5">
              <a href="#">
                <Img
                  src="images/img_ellipse_7.png"
                  alt="Image"
                  className="h-[42px] w-[42px] rounded-full object-cover border border-gray-300 dark:border-gray-600"
                />
              </a>
              <div className="flex flex-1 flex-col items-start mr-[20px]">
                <Heading
                  as="h6"
                  className="!font-lato1 !font-bold text-black-900 dark:text-white-a700"
                >
                  James Murphy
                </Heading>
                <Text
                  as="p"
                  className="!font-lato1 !font-medium text-black-900 dark:text-white-a700"
                >
                  Officer
                </Text>
              </div>
            </div>
            <Img
              src="images/img_arrow_down.svg"
              alt="Arrowdown"
              className="h-[20px] w-[20px]"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
