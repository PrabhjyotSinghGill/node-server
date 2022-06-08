const express = require("express");
const app = express();
const port = 3000;

const courses = [
  { id: 1, name: "Digital Electronics" },
  { id: 2, name: "Data Structures" },
  { id: 3, name: "Compiler" },
  { id: 4, name: "Algorithms" },
  { id: 5, name: "Theory of Computation" },
  { id: 6, name: "Computer Architecture" },
];

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/echo/:para", (req, res) => {
  res.send("Echo! " + req.params.para);
});

app.get("/dob/:date/:month/:year", (req, res) => {
  res.send(req.params);
});

app.get("/courses", (req, res) => {
  res.send(courses);
});

app.get("/courses/:id", (req, res) => {
  const course = courses.find((val) => val.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Not found!"); // response 404
  res.send(course);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
