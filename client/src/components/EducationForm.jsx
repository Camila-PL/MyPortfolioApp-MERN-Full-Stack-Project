import { useState, useEffect } from "react";
import auth from "../lib/auth-helper.js";

export default function EducationForm() {
  const jwt = auth.isAuthenticated();
  const currentEmail = jwt?.user?.email || "";

  const [educations, setEducations] = useState([]);
  const [form, setForm] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: currentEmail,
    completion: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {
    fetch("/api/qualifications")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEducations(data);
        } else {
          setEducations([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load education entries.");
      });
  }, []);

  const myEducations = currentEmail
    ? educations.filter((edu) => edu.email === currentEmail)
    : educations;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      title: "",
      firstname: "",
      lastname: "",
      email: currentEmail,
      completion: "",
      description: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = editingId
        ? `/api/qualifications/${editingId}`
        : "/api/qualifications";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to save education");
      }

      if (editingId) {
        setEducations((prev) =>
          prev.map((edu) => (edu._id === editingId ? data : edu))
        );
      } else {
        setEducations((prev) => [...prev, data]);
      }

      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Something went wrong. Try again.");
    }
  };

  const handleEdit = (edu) => {
    setEditingId(edu._id);
    setForm({
      title: edu.title || "",
      firstname: edu.firstname || "",
      lastname: edu.lastname || "",
      email: edu.email || currentEmail,
      completion: edu.completion
        ? new Date(edu.completion).toISOString().slice(0, 10)
        : "",
      description: edu.description || "",
    });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this entry?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/qualifications/${id}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete education");
      }

      setEducations((prev) => prev.filter((edu) => edu._id !== id));

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Could not delete entry.");
    }
  };

  return (
    <div className="page">
      <h1 className="section-title">My Education</h1>
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
            Completion Date
            <input
              type="date"
              name="completion"
              value={form.completion}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="row">
          <label>
            First Name*
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name*
            <input
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label>
          Email*
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        {error && <p className="err">{error}</p>}

        <button type="submit">
          {editingId ? "Update Education" : "Save Education"}
        </button>
        {editingId && (
          <button
            type="button"
            style={{ marginLeft: "0.75rem" }}
            onClick={resetForm}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <hr />

      <h2 className="section-title">Saved Educations</h2>
      {myEducations.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          No education entries for your account yet.
        </p>
      ) : (
        <ul
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "left",
            paddingLeft: 0,
            listStyle: "none",
          }}
        >
          {myEducations.map((edu) => (
            <li
              key={edu._id}
              style={{
                marginBottom: "0.75rem",
                padding: "0.5rem 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <strong>{edu.title}</strong> — {edu.firstname} {edu.lastname}{" "}
                {edu.completion
                  ? `(${new Date(edu.completion).toLocaleDateString()})`
                  : ""}
                {edu.description ? ` — ${edu.description}` : ""}
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <button
                  type="button"
                  onClick={() => handleEdit(edu)}
                  style={{ marginRight: "0.5rem" }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(edu._id)}
                  style={{ backgroundColor: "#fca5a5" }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
