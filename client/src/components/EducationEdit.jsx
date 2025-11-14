import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import auth from "../lib/auth-helper.js";
import { readEdu, updateEdu } from "../lib/api-education.js";

export default function EducationEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();
  const token = jwt?.token;

  const [values, setValues] = useState({
    school: "", program: "", startYear: "", endYear: "", error: ""
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await readEdu(id);
        setValues((v) => ({
          ...v,
          school: data.school || "",
          program: data.program || "",
          startYear: data.startYear || "",
          endYear: data.endYear || "",
        }));
      } catch (err) {
        setValues((v) => ({ ...v, error: err.message || "Failed to load" }));
      }
    })();
  }, [id]);

  const onChange = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  const save = async () => {
    try {
      await updateEdu(id, {
        school: values.school,
        program: values.program,
        startYear: values.startYear,
        endYear: values.endYear,
      }, token);
      navigate("/education");
    } catch (err) {
      setValues((v) => ({ ...v, error: err.message || "Failed to save" }));
    }
  };

  return (
    <Card sx={{ maxWidth: 700, mx: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Edit Education
        </Typography>
        <TextField label="School" fullWidth margin="normal" value={values.school} onChange={onChange("school")} />
        <TextField label="Program" fullWidth margin="normal" value={values.program} onChange={onChange("program")} />
        <TextField label="Start Year" fullWidth margin="normal" value={values.startYear} onChange={onChange("startYear")} />
        <TextField label="End Year" fullWidth margin="normal" value={values.endYear} onChange={onChange("endYear")} />
        {values.error && <Typography color="error" variant="body2">{values.error}</Typography>}
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={save}>Save</Button>
        <Button onClick={() => navigate("/education")}>Cancel</Button>
      </CardActions>
    </Card>
  );
}
