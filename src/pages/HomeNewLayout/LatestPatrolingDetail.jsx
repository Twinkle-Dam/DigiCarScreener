import React from "react";
import { Text, Heading } from "../../components";

export const LatestPatrolingDetail = ({ label, detail }) => {
  return (
    <div className="flex items-start gap-1">
      <Heading as="p" className="font-bold text-black-900 whitespace-nowrap">
        {label}
      </Heading>
      <Text
        as="p"
        className="text-black-900 dark:text-black-900 whitespace-nowrap"
      >
        {detail || "--"}
      </Text>
    </div>
  );
};
