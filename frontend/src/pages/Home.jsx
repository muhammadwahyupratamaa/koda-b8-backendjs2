import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import Sidebar from "../components/SideBar";
import { useEffect, useState } from "react";
import { getNotes } from "../services/notes";

function Home() {
  const [notes, setNotes] = useState([]);

  const colors = [
    "bg-yellow-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-pink-100",
    "bg-orange-100",
  ];

  useEffect(() => {
    async function loadNotes() {
      const data = await getNotes();

      setNotes(data.data);
    }

    loadNotes();
  }, []);
  return (
    <main className="flex h-screen bg-gray-100">
      <Sidebar />

      <section className="flex-1 p-8 overflow-y-auto">
        <Navbar />

        <NoteForm />

        <div className="mt-8">
          <h2 className="mb-5 text-2xl font-bold">My Notes</h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {notes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                color={colors[index % colors.length]}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
