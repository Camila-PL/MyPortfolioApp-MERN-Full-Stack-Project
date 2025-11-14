import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function Home() {
const theme = useTheme();
return (
<Card sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
<Typography
variant="h6"
sx={{ px: 2.5, pt: 3, pb: 2, color: theme.custom?.openTitle || theme.palette.primary.main }}
>
Home Page
</Typography>
<CardContent>
<Typography variant="body1">
Welcome to the MERN Portfolio App.
</Typography>
</CardContent>
</Card>
);
}