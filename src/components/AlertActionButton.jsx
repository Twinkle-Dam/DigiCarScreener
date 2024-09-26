import React from "react";

export const AlertActionButton = ({ label, className }) => {
  return (
    <button className={`px-2 py-1 border-2 ${className}`}>
      {label}
    </button>
  );
};