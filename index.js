import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, "public");

const app = express();
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.send("Hello! Welcome to my application.");
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(publicPath, "about.html"));
});

app.get("/guestbook", (req, res) => {
  res.send("<h1>Guestbook Messages</h1>");
});

app.use((req, res) => {
  res.status(404).send("Oops! We didn't find what you are looking for.");
});

app.listen(3000, () => {
  console.log("Server started on port 3000. Ctrl^c to quit.");
});
