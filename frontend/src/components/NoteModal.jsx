function NoteModal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="mb-4 ml-auto block text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

export default NoteModal;