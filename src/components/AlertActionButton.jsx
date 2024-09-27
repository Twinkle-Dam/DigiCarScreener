import React from "react";

export const AlertActionButton = ({ label, className }) => {
  return (
    <button className={`px-2 py-2 border-2 ${className}`}>
      {label}
    </button>
  );
};