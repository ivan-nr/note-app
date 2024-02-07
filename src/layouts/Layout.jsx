import Sidebar from "@/components/Sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex justify-center md:justify-between">
      <Sidebar />
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Layout;
