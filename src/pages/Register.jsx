import React, { useState } from "react";
import LoginImg from "../assets/img/login.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { register } from "@/hooks/auth";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    try {
      const payload = {
        name: name,
        user: user,
        pass: pass,
      };

      const data = await register(payload);

      if (data) {
        toast.success(data.message);
        resetForm();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const resetForm = () => {
    setName("");
    setUser("");
    setPass("");
    setShowPassword(false);
  };

  return (
    <div>
      <div className="flex min-h-screen w-full justify-center items-center gap-32">
        <div className="hidden lg:block">
          <img src={LoginImg} alt="" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-10">Sign Up</h2>
          <form
            className="flex flex-col gap-6 w-[300px]"
            onSubmit={handleRegister}
          >
            <Input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
              />
              <button
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 hover:text-gray-700"
                onClick={toggleShowPassword}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </form>
          <Button
            disabled={loading || !user || !pass}
            className="btn w-full mt-8"
            type="submit"
            onClick={handleRegister}
          >
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
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
