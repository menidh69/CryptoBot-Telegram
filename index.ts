import express from "express";

const app = express();
const port = process.env.PORT || "8000";

app.get("/", (req, res) => {
  return res.json({ message: "Hola" });
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
