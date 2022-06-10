const Joi = require("joi");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const courses = [
  { id: 1, name: "Digital Electronics" },
  { id: 2, name: "Data Structures" },
  { id: 3, name: "Compiler" },
  { id: 4, name: "Algorithms" },
  { id: 5, name: "Theory of Computation" },
  { id: 6, name: "Computer Architecture" },
];
// GET METHODS EXPLAINED
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

// POST METHODS EXPLAINED
app.post("/courses", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  console.log(result);

  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("Error 400 Bad Request"); //400 Bad Request
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// PUT METHOD
app.put("/courses/:id", (req, res) => {
  // Look for the course
  const course = courses.find((val) => val.id === parseInt(req.params.id));
  // IF NOT EXISTING, return 404
  if (!course) res.status(404).send("Not found!"); // response 404

  //VALIDATE
  // IF INVALID, return 400 -Bad request
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  // UPDATE COURSE
  course.name = req.body.name;
  // RETURN THE UPDATED COURSE
  res.send(course);
});

//DELETE REQUEST
app.delete("/courses/:id", (req, res) => {
  //Look up the course
  const course = courses.find((val) => val.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Not found!");
  //Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  //Return the same course
  res.send(course);
});

// APP RUNNING ON PORT 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
