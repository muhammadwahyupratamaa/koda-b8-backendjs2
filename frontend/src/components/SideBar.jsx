import { FaStickyNote, FaRegStickyNote } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");

  navigate("/login");
};
  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r bg-white p-6">
      <div>
        <div className="mb-10 flex items-center gap-3">
          <FaStickyNote className="text-3xl text-blue-600" />

          <h1 className="text-2xl font-bold text-blue-600">TULISAN</h1>
        </div>

        <nav>
          <ul className="space-y-3">
            <li>
              <button className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white">
                <FaRegStickyNote size={18} />
                Notes
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <button onClick={handleLogout} className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600">
        <FiLogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
