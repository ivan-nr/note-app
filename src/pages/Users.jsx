import Layout from "@/layouts/Layout";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUsers, getUser, getUsers, updateUsers } from "@/hooks/users";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2, Menu, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getDataUsers = async () => {
    setLoading(true);

    try {
      const data = await getUsers();
      const { users } = data;
      setUsers(users);
      console.log(users);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDataUsers();
  }, []);

  const reverseDateFormat = (dateString) => {
    const [year, month, day] = dateString.split("-");

    return `${day}-${month}-${year}`;
  };

  const handleClickDelete = (id) => {
    setIdDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);

    try {
      const response = await deleteUsers(id);
      if (response) {
        setDeleteDialogOpen(false);
        toast.success(response.message);
        getDataUsers();

        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClickUpdate = async (id) => {
    setEditDialogOpen(true);
    setIdDelete(id);
    setLoading(true);

    try {
      const data = await getUser(id);
      const { name, user } = data.user;
      setName(name);
      setUser(user);
      setLoading(false);
      setPass("");
    } catch (error) {
      toast.error(error.message);
    }
  };

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

      const response = await updateUsers(idDelete, payload);
      if (response) {
        setEditDialogOpen(false);
        toast.success(response.message);
        getDataUsers();
        setLoading(false);
        resetForm();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setName("");
    setUser("");
    setPass("");
  };

  return (
    <Layout>
      <div className="w-full h-screen p-4 lg:p-8 flex flex-col gap-4 overflow-y-auto">
        <div className="flex justify-between items-center md:mx-4 lg:mx-8 border-b pb-3">
          <h2 className="scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight first:mt-0 w-full">
            Users
          </h2>
        </div>

        <div className="flex justify-center gap-2">
          {loading ? (
            <div className="h-[600px] flex flex-col gap-2 justify-center items-center">
              <Loader2 className="w-10 h-10 animate-spin" />
              <span>Fetching Data . . .</span>
            </div>
          ) : (
            <div className="w-full md:mx-4 lg:mx-8 my-10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead>Updated at</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                {users.map((user) => (
                  <TableBody key={user.id}>
                    <TableRow>
                      <TableCell>{user.id}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.user}</TableCell>
                      <TableCell>
                        {user.created_at
                          ? reverseDateFormat(user.created_at.split("T")[0])
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {user.updated_at
                          ? reverseDateFormat(user.updated_at.split("T")[0])
                          : "-"}
                      </TableCell>
                      <TableCell className="flex justify-end gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleClickUpdate(user.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleClickDelete(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </div>
          )}
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <div className="text-sm">
            This action cannot be undone. This will permanently delete your note
            and remove your data from our servers.
          </div>
          <DialogFooter className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="destructive"
              type="submit"
              onClick={() => handleDeleteUser(idDelete)}
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Edit the user data here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
          </div>
          <DialogFooter>
            <Button
              disabled={loading || !name || !user || !pass}
              type="submit"
              onClick={handleUpdateUser}
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Loading . . .</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
        <DialogFooter></DialogFooter>
      </Dialog>
    </Layout>
  );
};

export default Users;
