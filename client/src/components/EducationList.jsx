import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function EducationList() {
  const [educations, setEducations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const res = await fetch("/api/qualifications");
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to load education entries");
        }
        const data = await res.json();
        setEducations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error loading education entries");
      }
    };

    fetchEducations();
  }, []);

  return (
    <div className="page">
      <h1 className="section-title">My Education</h1>

      <Card sx={{ maxWidth: 900, mx: "auto", mt: 2, p: 3 }}>
        <CardContent sx={{ textAlign: "center" }}>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {educations.length === 0 ? (
            <Typography>No education entries yet.</Typography>
          ) : (
            <>
              {educations.map((edu) => (
                <Typography key={edu._id} sx={{ mb: 1 }}>
                  <strong>{edu.title}</strong>{" "}
                  — {edu.firstname} {edu.lastname}{" "}
                  {edu.completion
                    ? `(${new Date(edu.completion).toLocaleDateString()})`
                    : ""}
                  {edu.description ? ` — ${edu.description}` : ""}
                </Typography>
              ))}
            </>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            component={Link}
            to="/education/new"
            sx={{ mt: 1 }}
          >
            Add Education
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
