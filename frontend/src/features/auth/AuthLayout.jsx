import React from "react";
import NavIcon from "./components/NavIcon";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <>
      <NavIcon />
      <Outlet />
    </>
  );
};

export default AuthLayout;
