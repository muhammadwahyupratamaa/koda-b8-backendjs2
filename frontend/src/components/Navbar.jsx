import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-semibold text-gray-800">{user?.name || "Guest"}</p>
        </div>

        <button className="rounded-full bg-blue-600 p-2 text-white">
          <FaUserCircle size={28} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
