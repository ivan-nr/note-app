import Sidebar from "@/components/Sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
