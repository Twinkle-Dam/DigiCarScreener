import React from "react";
import { Text, Heading } from "../../components";

export const LatestPatrolingDetail = ({ label, detail }) => {
  return (
    <div className="flex items-start justify-between ">
      <p className="text-black-900 dark:text-white-a700  whitespace-nowrap text-[14px] font-medium leading-[19.12px]">
        {label}:
      </p>
      <Text
        as="p"
        className="text-black-900 whitespace-nowrap dark:text-white-a700"
      >
        {detail || "--"}
      </Text>
    </div>
  );
};
