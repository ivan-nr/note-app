import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex justify-center md:flex-row">
      <Sidebar isOpen={isSidebarOpen} />
      <main className={`w-full ${isSidebarOpen ? "blur-sm" : ""}`}>
        {children}
      </main>
      <Button
        className="lg:hidden absolute top-3 md:top-4 right-4 md:right-8"
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </Button>
    </div>
  );
};

export default Layout;
