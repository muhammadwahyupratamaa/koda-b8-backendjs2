import { FaEdit, FaTrash } from "react-icons/fa";

function NoteCard({ note, color }) {
  return (
    <div
      className={`${color} flex min-h-56 flex-col justify-between rounded-2xl p-5 shadow-sm transition hover:shadow-md`}
    >
      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-800">{note.title}</h2>

        <p className="text-gray-700">{note.content}</p>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm shadow hover:bg-gray-100">
          <FaEdit />
          Edit
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600">
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
