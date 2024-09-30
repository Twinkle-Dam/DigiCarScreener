import React from "react";
import { Text, Heading } from "../../components";

export const LatestPatrolingDetail = ({ label, detail }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <Heading
        as="p"
        className=" text-black-500 dark:text-white-a700 whitespace-nowrap"
      >
        {label}:
      </Heading>
      <Text
        as="p"
        className="text-black-500 whitespace-nowrap dark:text-white-a700 text-right"
      >
        {detail || "--"}
      </Text>
    </div>
  );
};
