const BASE = "/api/education"; 

const handle = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
};

export const createEdu = async (payload, token) =>
  handle(await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: JSON.stringify(payload),
  }));

export const listEdu = async () =>
  handle(await fetch(BASE));

export const readEdu = async (id) =>
  handle(await fetch(`${BASE}/${id}`));

export const updateEdu = async (id, payload, token) =>
  handle(await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: JSON.stringify(payload),
  }));

export const removeEdu = async (id, token) =>
  handle(await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  }));
