import { Link } from "react-router-dom";
export default function Home() {
const hour = new Date().getHours();
  let greeting = "Hello / Hola :)";
  if (hour < 12) greeting = "Good morning / Buenos días";
  else if (hour < 18) greeting = "Good afternoon / Buenas tardes";
  else greeting = "Good evening / Buenas noches";

return (
    <section className="home">
      <div className="home-text">
        <h1>{greeting}</h1>
        <h1>I'm <span className="highlight">Camila Pazmiño</span></h1>
        <h2>Software Engineering Student</h2>
        <p>
          Welcome to my portfolio! Here you can find information about me, my 
          services, and projects I have worked on.
        </p>
        <h2 className="section-title">Mission</h2>
        <p className="mission">
          My mission is to build clean, accessible and friendly web experiences while I keep learning.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <div className="cta-buttons"> 
      <Link to="/about" className="cta-btn">About Me</Link>
      <Link to="/contact" className="cta-btn">Get in Touch</Link>
      <Link to="/signin" className="auth-btn">Sign In</Link>
      <Link to="/signup" className="auth-btn">Sign Up</Link>
      </div>
      </div>
      </div>
    </section>
  );
}
