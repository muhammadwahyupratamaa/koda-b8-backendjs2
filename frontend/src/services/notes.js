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

export async function createNote(title, content) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });

  return await response.json();
}

export async function updateNote(id, title, content) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });

  return await response.json();
}

export async function deleteNote(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.status);

  const data = await response.json();

  console.log(data);

  return data;
}
