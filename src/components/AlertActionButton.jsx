import React from "react";

export const AlertActionButton = ({ label }) => {
  return (
    <button className="px-2 py-1 bg-slate-100 border-2 border-black-900  text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
      {label}
    </button>
  );
};
