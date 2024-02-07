import { Home, NotebookPen, Users } from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { api } from "@/utils/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userID");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    try {
      const response = api.post("/api/logout");
      response.then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          navigate("/login", { replace: true });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          localStorage.removeItem("token");
          localStorage.removeItem("userID");
          localStorage.removeItem("userName");
        }
        console.log(res);
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <nav className="hidden w-80 min-h-screen bg-base-200 text-base-content md:flex flex-col justify-between border-r-2">
      <div className="flex flex-col w-full my-4 px-4 py-4 gap-2">
        <div className="flex justify-center items-center gap-4 mb-8">
          <NotebookPen size={32} className="text-primary" />
          <h2 className="text-2xl text-primary font-bold">Note App</h2>
        </div>
        <NavLink
          to={"/"}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            location.pathname === "/" ? "bg-primary text-white" : ""
          }`}
        >
          <Home size={24} />
          <span className="text-[16px] font-medium">Home</span>
        </NavLink>
        {userId === "1" && (
          <NavLink
            to={"/users"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              location.pathname === "/users" ? "bg-primary text-white" : ""
            }`}
          >
            <Users size={24} />
            <span className="text-[16px] font-medium">Users</span>
          </NavLink>
        )}
      </div>
      <div className="flex justify-between items-center px-2 py-2 gap-2 border-t-2">
        <div className="flex gap-2 items-center ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" variant="default">
                    Sign Out
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to logout?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="text-[14px] font-medium line-clamp-1">
            {userName}
          </span>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
