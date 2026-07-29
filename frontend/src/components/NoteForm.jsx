import { useState } from "react";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      title,
      content,
    });
  };

  return (
    <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">Add New Note</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium">
            Title
          </label>

          <input
            id="title"
            type="text"
            placeholder="Enter note title..."
            className="rounded-xl border p-3 outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="font-medium">
            Content
          </label>

          <textarea
            id="content"
            rows="5"
            placeholder="Write your note..."
            className="resize-none rounded-xl border p-3 outline-none focus:border-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Add Note
          </button>
        </div>
      </form>
    </section>
  );
}

export default NoteForm;
