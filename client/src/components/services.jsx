import codeImg from "../assets/services/code.jpg";
import webImg from "../assets/services/web.jpg";
import dbImg from "../assets/services/database.png";

export default function Services() {
  return (
    <>
      <h2 className="section-title">My Services</h2>
      <div className="cards">
        <div className="card">
          <img src={codeImg} alt="Programming" width="60" />
          <h3>General Programming</h3>
          <p>Clean, structured, and reusable code across multiple programming languages.</p>
        </div>

        <div className="card">
          <img src={webImg} alt="Web Development" width="60" />
          <h3>Web Development</h3>
          <p>Building responsive and modern websites using React, JavaScript, and CSS.</p>
        </div>

        <div className="card">
          <img src={dbImg} alt="Database Fundamentals" width="60" />
          <h3>Database Fundamentals</h3>
          <p>Design and management of relational databases, SQL queries, and data modeling principles.</p>
        </div>
      </div>
    </>
  );
}
