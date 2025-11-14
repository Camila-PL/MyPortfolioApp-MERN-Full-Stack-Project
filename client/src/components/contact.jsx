import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const e = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.email || !form.email.includes("@")) e.email = "Invalid email";
    if (!form.message) e.message = "Required";
    return e;
  }

  function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length > 0) return;

    alert(
      `Message sent!\n\nName: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`
    );

    navigate("/");
  }

  return (
    <>
      <h2 className="section-title">Contact Me</h2>

      <div className="contact-panel">
        <p><strong>Email:</strong> camila@centennial.com</p>
        <p><strong>Phone:</strong> +1 (647) 555-1234</p>
        <p><strong>Location:</strong> Toronto, ON</p>
      </div>

      <form onSubmit={onSubmit} className="contact-form">
        <div className="row">
          <label>
            First Name*
            <input name="firstName" value={form.firstName} onChange={onChange} />
            {errors.firstName && <small className="err">{errors.firstName}</small>}
          </label>

          <label>
            Last Name*
            <input name="lastName" value={form.lastName} onChange={onChange} />
            {errors.lastName && <small className="err">{errors.lastName}</small>}
          </label>
        </div>

        <div className="row">
          <label>
            Phone
            <input name="phone" value={form.phone} onChange={onChange} />
          </label>

          <label>
            Email*
            <input name="email" value={form.email} onChange={onChange} />
            {errors.email && <small className="err">{errors.email}</small>}
          </label>
        </div>

        <label>
          Message*
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            rows="5"
          />
          {errors.message && <small className="err">{errors.message}</small>}
        </label>

        <button type="submit">Send</button>
      </form>
    </>
  );
}
