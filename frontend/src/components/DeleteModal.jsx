import NoteModal from "./NoteModal";

function DeleteModal({ isOpen, onClose, onDelete }) {
  return (
    <NoteModal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-3 text-2xl font-bold">Delete Note</h2>

      <p className="mb-6 text-gray-600">
        Are you sure you want to delete this note?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={onDelete}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </NoteModal>
  );
}

export default DeleteModal;
