import { Home, LogOut, NotebookPen, User, Users } from "lucide-react";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
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

const Sidebar = ({ isOpen }) => {
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

  const initials = userName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <nav
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 h-full w-64 md:w-80 bg-background text-base-content transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col justify-between border-r-2 z-50`}
    >
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
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={`/users/${userId}`}>
                <Button variant="ghost" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </Button>
              </Link>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full hover:bg-destructive/80"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
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
