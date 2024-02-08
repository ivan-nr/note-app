import Layout from "@/layouts/Layout";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { deleteUsers, getUser, updateUsers } from "@/hooks/users";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { api } from "@/utils/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const userId = localStorage.getItem("userID");
  const navigate = useNavigate();

  const getUserData = async () => {
    setLoading(true);

    try {
      const data = await getUser(userId);
      const { name, user } = data.user;
      // console.log(name, user);
      setName(name);
      setUser(user);
      setLoading(false);
      setPass("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleUpdateUser = async () => {
    setLoading(true);

    try {
      const payload = {
        name: name,
        user: user,
        pass: pass,
      };

      const response = await updateUsers(userId, payload);
      if (response) {
        localStorage.setItem("userName", name);
        toast.success(response.message);
        setDialogOpen(false);
        setLoading(false);
        getUserData();
        setPass("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);

    try {
      const response = await deleteUsers(userId);
      if (response) {
        toast.success(response.message);

        setDialogOpen(false);
        setLoading(false);
        navigate("/login", { replace: true });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        localStorage.removeItem("userName");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openEditDialog = () => {
    setIsEditing(true);
    setDialogOpen(true);
  };

  const openDeleteDialog = () => {
    setIsEditing(false);
    setDialogOpen(true);
  };

  return (
    <Layout>
      <div className="w-full h-screen p-8 flex flex-col gap-4 overflow-y-auto">
        <div className="flex items-center mx-8 border-b pb-2">
          <h2 className="scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight first:mt-0 w-full">
            User Profile
          </h2>
        </div>

        <div className="mx-8 mt-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                This is how others will see you on the site.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input
                  disabled={loading}
                  id="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="user" className="text-left">
                  Username
                </Label>
                <Input
                  disabled={loading}
                  id="user"
                  placeholder="Username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start gap-2 relative">
                <Label htmlFor="pass" className="text-left">
                  New Password
                </Label>
                <Input
                  disabled={loading}
                  id="pass"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                />
                <button
                  className="absolute right-0 bottom-0 px-3 py-2 text-gray-500 hover:text-gray-700"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loading || !name || !user || !pass}
                type="submit"
                onClick={openEditDialog}
              >
                {loading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Loading . . .</span>
                  </div>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mx-8">
          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>
                This will permanently delete your account.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="destructive" onClick={openDeleteDialog}>
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Update Confirmation" : "Delete Confirmation"}
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm">
            This action cannot be undone. This will{" "}
            {isEditing ? "update" : "delete"} your data.
          </div>
          <DialogFooter className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant={isEditing ? "default" : "destructive"}
              type="submit"
              onClick={isEditing ? handleUpdateUser : handleDeleteUser}
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : isEditing ? (
                "Update"
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Profile;
