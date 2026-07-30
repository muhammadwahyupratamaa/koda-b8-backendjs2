import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    }
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-200">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">
            Selamat Datang di <span className="text-blue-600">TULISAN</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Masukkan email anda..."
              className="rounded-lg border p-2 outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Masukkan password anda..."
              className="rounded-lg border p-2 outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
