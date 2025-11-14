import { useState, useEffect } from "react";
import auth from "../lib/auth-helper.js";

export default function Project() {
  const [form, setForm] = useState({
    title: "",
    link: "",
    description: "",
  });
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null); 

  const getAuthHeader = () => {
    const jwt = auth.isAuthenticated();
    return jwt && jwt.token ? { Authorization: "Bearer " + jwt.token } : {};
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/projects", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
        });

        const data = await res.json();
        if (res.ok) {
          setProjects(data);
        } else {
          setError(data.error || "Could not load projects");
        }
      } catch (err) {
        console.error(err);
        setError("Could not load projects");
      }
    };

    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const jwt = auth.isAuthenticated();
    if (!jwt || !jwt.token) {
      setError("You must be signed in to save a project.");
      return;
    }

    const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt.token,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (editingId) {
          setProjects((prev) =>
            prev.map((p) => (p._id === editingId ? data : p))
          );
        } else {
          setProjects((prev) => [...prev, data]);
        }

        setForm({ title: "", link: "", description: "" });
        setEditingId(null);
      } else {
        setError(data.error || "Project validation failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  const handleEditClick = (proj) => {
    setEditingId(proj._id);
    setForm({
      title: proj.title || "",
      link: proj.link || "",
      description: proj.description || "",
    });
    setError("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", link: "", description: "" });
    setError("");
  };

  const handleDelete = async (id) => {
    const jwt = auth.isAuthenticated();
    if (!jwt || !jwt.token) {
      setError("You must be signed in to delete a project.");
      return;
    }

    if (!window.confirm("Delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt.token,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
        if (editingId === id) {
          handleCancelEdit();
        }
      } else {
        setError(data.error || "Could not delete project");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while deleting.");
    }
  };

  return (
    <div className="page">
      <h1 className="section-title">My Projects</h1>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="row">
          <label>
            Title*
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Link
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://github.com/... or live demo"
            />
          </label>
        </div>

        <label>
          Description*
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>

        {error && <p className="err">{error}</p>}

        <button type="submit">
          {editingId ? "Update Project" : "Save Project"}
        </button>
        {editingId && (
          <button
            type="button"
            style={{ marginLeft: "0.5rem" }}
            onClick={handleCancelEdit}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <hr />

      <h2 className="section-title">Saved Projects</h2>
      {projects.length === 0 ? (
        <p>No projects saved yet.</p>
      ) : (
        <ul>
          {projects.map((p) => (
            <li key={p._id} style={{ marginBottom: "0.6rem" }}>
              <strong>{p.title}</strong>
              {p.link && (
                <>
                  {" "}
                  —{" "}
                  <a href={p.link} target="_blank" rel="noreferrer">
                    View
                  </a>
                </>
              )}
              <br />
              {p.description}
              <br />
              <button
                type="button"
                style={{ marginTop: "0.25rem", marginRight: "0.5rem" }}
                onClick={() => handleEditClick(p)}
              >
                Edit
              </button>
              <button
                type="button"
                style={{ marginTop: "0.25rem" }}
                onClick={() => handleDelete(p._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}