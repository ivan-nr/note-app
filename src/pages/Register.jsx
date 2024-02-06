import React from "react";
import LoginImg from "../assets/img/login.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <div className="flex min-h-screen w-full justify-center items-center gap-32">
        <div className="hidden lg:block">
          <img src={LoginImg} alt="" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-10">Sign Up</h2>
          <form className="flex flex-col gap-6 w-[300px]">
            <Input type="text" placeholder="Full Name" />
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
          </form>
          <Button className="btn w-full mt-8">Sign Up</Button>
          <div className="flex justify-center items-center mt-4">
            <p>Already have an account?</p>
            <Link to={"/login"}>
              <Button variant="link">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
