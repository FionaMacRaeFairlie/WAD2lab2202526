import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, "public");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  // res.send("Hello! Welcome to my application.");
  res.sendFile(path.join(publicPath, "home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(publicPath, "about.html"));
});

app.get("/guestbook", (req, res) => {
  res.send("<h1>Guestbook Messages</h1>");
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(publicPath, "contactForm.html"));
});

// POST endpoint
app.post("/handleform", (req, res) => {
  console.log("Form submission received.");
  console.log(req.body); // Log the form data to the console

  const { name, email, phone, newsletter, message } = req.body;

  // Output in json format
  // res.json({
  //   received: true,
  //   name,
  //   email,
  //   newsletterStatus:
  //     newsletter === "subscribe" ? "Subscribed" : "Unsubscribed",
  // });

  // Output in HTML format
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form Submission Received</title>
    <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
    <main class="container">
        <h1>Thank You, ${name}</h1>
        <p>We have received your submission with the following details:</p>
        <ul>
            <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Newsletter Subscription:</strong> ${
              newsletter === "subscribe" ? "Subscribed" : "Unsubscribed"
            }</li>
          <li><strong>Your message:</strong> ${message}</li>
        </ul>

        <a class="but" href="/contact">Go Back to Contact Form</a>
    </main>
</body>
</html>`);
});

app.use((req, res) => {
  res.status(404).send("Oops! We didn't find what you are looking for.");
});

app.listen(3000, () => {
  console.log("Server started on port 3000. Ctrl^c to quit.");
});
