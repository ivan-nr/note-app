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
import {
  deleteNotes,
  getNote,
  getNotes,
  postNotes,
  updateNotes,
} from "@/hooks/notes";
import { Edit, Loader2, NotebookPen, Trash2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const getDataNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      // setNotes(data.notes);
      // console.log(data.notes);
      const { notes } = data;
      setNotes(notes);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataNotes();
  }, []);

  const resetForm = () => {
    setTitle("");
    setNote("");
  };

  const handleAddNote = async () => {
    setLoading(true);

    try {
      const payload = {
        title: title,
        note: note,
      };

      const response = await postNotes(payload);
      if (response) {
        console.log(response);
        setAddDialogOpen(false);
        toast.success(response.message);
        getDataNotes();

        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteNote = async (id) => {
    setLoading(true);

    try {
      const response = await deleteNotes(id);
      if (response) {
        setDeleteDialogOpen(false);
        toast.success(response.message);
        getDataNotes();

        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openAddDialog = () => {
    resetForm();
    setAddDialogOpen(true);
    setIsEditing(false);
  };

  const handleClickDelete = (id) => {
    setIdDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleClickEdit = async (id) => {
    setAddDialogOpen(true);
    setIdDelete(id);
    setIsEditing(true);

    try {
      const data = await getNote(id);
      const { title, note } = data.note;

      setTitle(title);
      setNote(note);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async () => {
    setLoading(true);

    try {
      const payload = {
        title: title,
        note: note,
      };

      const response = await updateNotes(idDelete, payload);
      if (response) {
        setAddDialogOpen(false);
        toast.success(response.message);
        getDataNotes();
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Layout>
      <div className="w-full h-screen p-8 flex flex-col gap-4 overflow-y-auto">
        <div className="flex justify-around items-center mx-8 border-b pb-2">
          <h2 className="scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight first:mt-0 w-full">
            Home
          </h2>

          <Button
            variant="outline"
            className="flex gap-2 justify-center items-center"
            onClick={openAddDialog}
          >
            <NotebookPen size={20} />
            <span className="hidden md:block">Add Note</span>
          </Button>
        </div>

        <div className="flex w-full justify-center gap-2 flex-wrap">
          {loading ? (
            <div className="h-[600px] flex flex-col gap-2 justify-center items-center">
              <Loader2 className="w-10 h-10 animate-spin" />
              <span>Fetching Data . . .</span>
            </div>
          ) : (
            notes.map((note) => (
              <Card
                key={note.note_id}
                className="w-[300px] md:w-[240px] lg:w-[280px] flex flex-col justify-between"
              >
                <div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold line-clamp-1">
                      {note.title}
                    </CardTitle>
                    <CardDescription>by: {note.user_name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="min-h-[5em] line-clamp-5 text-[14px]">
                      {note.note}
                    </p>
                  </CardContent>
                </div>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleClickEdit(note.note_id)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleClickDelete(note.note_id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
              </DialogHeader>
              <div className="text-sm">
                This action cannot be undone. This will permanently delete your
                note and remove your data from our servers.
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
                  onClick={() => handleDeleteNote(idDelete)}
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
        </div>
      </div>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Note" : "Create Note"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Edit your note here. Click save when you're done."
                : "Create a new note here. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title" className="text-left">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Note Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="note" className="text-left">
                Note
              </Label>
              <Textarea
                placeholder="Note"
                id="note"
                onChange={(e) => setNote(e.target.value)}
                value={note}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={loading || !title || !note}
              type="submit"
              onClick={isEditing ? handleUpdateNote : handleAddNote}
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Loading . . .</span>
                </div>
              ) : isEditing ? (
                "Update"
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

export default Home;
