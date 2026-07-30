import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import NoteModal from "../components/NoteModal";
import Sidebar from "../components/SideBar";
import { deleteNote, getNotes } from "../services/notes";
import DeleteModal from "../components/DeleteModal";

function Home() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const colors = [
    "bg-yellow-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-pink-100",
    "bg-orange-100",
  ];

  async function loadNotes() {
    const data = await getNotes();
    setNotes(data.data);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleDelete() {
    await deleteNote(selectedNote.id);

    await loadNotes();

    setIsDeleteModalOpen(false);
    setSelectedNote(null);
  }
  return (
    <main className="flex h-screen bg-gray-600">
      <Sidebar />

      <section className="flex-1 overflow-y-auto p-8">
        <Navbar />

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              setSelectedNote(null);
              setIsModalOpen(true);
            }}
            className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            + Add Note
          </button>
        </div>

        <NoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm
            selectedNote={selectedNote}
            onSuccess={() => {
              loadNotes();
              setIsModalOpen(false);
            }}
          />
        </NoteModal>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedNote(null);
          }}
          onDelete={handleDelete}
        />

        <div className="mt-8">
          <h2 className="mb-5 text-2xl font-bold">My Notes</h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {notes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                color={colors[index % colors.length]}
                onEdit={() => {
                  setSelectedNote(note);
                  setIsModalOpen(true);
                }}
                onDelete={() => {
                  setSelectedNote(note);
                  setIsDeleteModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
