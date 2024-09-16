import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "pages/NotFound";
import Homepage from "pages/Homepage";
import Home from "pages/HomeNewLayout";

import LoginscreenPage from "pages/Loginscreen";
import SplashscreenRow from "pages/Splashscreen/SplashscreenRow";
import PlatesList from "pages/PlatesList";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <SplashscreenRow /> },
    { path: "*", element: <NotFound /> },
    {
      path: "login",
      element: <LoginscreenPage />,
    },
    {
      path: "homepage",
      element: <Homepage />,
    },

    {
      path: "homepageNew",
      element: <Home />,
    },
    {
      path: "list",
      element: <PlatesList />,
      //element:<PredefinedList />
    },
  ]);

  return element;
};

export default ProjectRoutes;
