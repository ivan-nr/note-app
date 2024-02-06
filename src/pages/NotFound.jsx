import React from "react";
import NotFoundImg from "../assets/img/404.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-5 md:gap-8 h-screen items-center justify-center text-center">
      <img className="w-[320px]" src={NotFoundImg} alt="" />
      <h2 className="scroll-m-20 pb-2 text-xl md:text-3xl lg:text-4xl font-bold tracking-tight">
        Whoops! That page doesn’t exist.
      </h2>
      <Link to={"/"}>
        <Button
          variant="secondary"
          className="flex gap-1 justify-center items-center"
        >
          <ArrowLeft size={18} />
          Go Back
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
