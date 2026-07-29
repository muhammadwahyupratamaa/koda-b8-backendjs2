import { FaRegBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <header className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-2">
          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search notes..."
            className="bg-transparent outline-none"
          />
        </div>

        <button className="rounded-full bg-gray-100 p-3 hover:bg-gray-200">
          <FaRegBell />
        </button>

        <button className="rounded-full bg-blue-600 p-2 text-white">
          <FaUserCircle size={26} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
