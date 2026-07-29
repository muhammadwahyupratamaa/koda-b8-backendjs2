const BASE_URL = "http://localhost:8080";

export async function getNotes() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}
