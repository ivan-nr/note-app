import React, { useState } from "react";
import LoginImg from "../assets/img/login.svg";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { login } from "@/hooks/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const payload = {
        user: user,
        pass: pass,
      };

      const data = await login(payload);

      if (data) {
        console.log(data);
        toast.success(data.message);
        const token = data.access_token;
        const user = data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("userID", JSON.stringify(user.id));
        localStorage.setItem("userName", user.name);
        console.log("id", user.id);
        console.log("name", user.name);
        // decode token
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
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

  return (
    <div>
      <div className="flex min-h-screen w-full justify-center items-center gap-32">
        <div className="hidden lg:block">
          <img src={LoginImg} alt="" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-10">Sign In</h2>
          <form
            className="flex flex-col gap-6 w-[300px]"
            onSubmit={handleLogin}
          >
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => setUser(e.target.value)}
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
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
            onClick={handleLogin}
          >
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <div className="flex justify-center items-center mt-4">
            <p>Don’t have an account?</p>
            <Link to={"/register"}>
              <Button variant="link">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
