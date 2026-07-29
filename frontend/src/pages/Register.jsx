import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      name,
      email,
      password,
    });
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-200">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">
            Daftar ke <span className="text-blue-600">TULISAN</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nama</label>

            <input
              id="name"
              type="text"
              placeholder="Masukkan nama anda..."
              className="rounded-lg border p-2 outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
            Register
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
