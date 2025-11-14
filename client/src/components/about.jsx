import profileImg from "../assets/aboutme/Me.jpg";
import resumePdf from "../assets/aboutme/Resume.pdf";

export default function About() {
  return (
    <>
      <h2 className="section-title">About Me</h2>

      <div className="about">
        <img src={profileImg} alt="Profile" className="about-img" />

        <div className="about-text">
          <h3>Camila Pazmiño</h3>
          <p>
            I am a student of Software Engineering Technology at Centennial College. 
            I enjoy learning programming, databases, and web development, and I 
            like to apply my skills in small projects to keep improving.
          </p>
           <a
            href={resumePdf}
            className="cta-btn"
            download  
          >
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
}
