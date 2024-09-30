import { Switch } from "components";
import React, { useState } from "react";

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center relative z-50">
      <button onClick={toggleMenu} className="">
        <img
          src="images/MenuIcon.svg"
          alt="Menu"
          className="w-full h-full mx-auto"
        />
      </button>
      {isMenuOpen && (
        <div className="absolute left-[70px] bottom-[0px] shadow-lg rounded-md mt-2 p-4 w-56 bg-white-a700 dark:bg-dark-700 dark:text-white-a700">
          <ul className="space-y-2 bg-white rounded-lg">
            <li className="flex items-center p-3 hover:bg-blue-100 rounded border-b border-blue-100 last:border-b-0">
              <img
                src="images/ChatBot.png"
                alt="ChatBot"
                className="w-6 h-6 mr-6"
              />
              <span>ChatBot</span>
            </li>
            <li className="flex items-center p-3 mr-4 hover:bg-blue-100 rounded border-b border-blue-100 last:border-b-0">
              <div className="flex items-center gap-3  mr-6 ">
                <Switch />
              </div>
              <span>Dark Theme</span>
            </li>
            <li className="flex items-center p-3 hover:bg-blue-100 rounded border-b border-blue-100 last:border-b-0">
              <img
                src="images/Profile.png"
                alt="Profile"
                className="w-6 h-6 mr-6"
              />
              <span>Profile</span>
            </li>
            <li className="flex items-center p-3 hover:bg-blue-100 rounded border-b border-blue-100 last:border-b-0">
              <img
                src="images/Setting.png"
                alt="Settings"
                className="w-6 h-6 mr-6"
              />
              <span>Settings</span>
            </li>
            <li className="flex items-center p-3 hover:bg-blue-100 rounded">
              <img
                src="images/Logout.png"
                alt="Logout"
                className="w-6 h-6 mr-6"
              />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
