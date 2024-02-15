const express = require("express");

const app = express();
const Port = process.env.NODEJS_PORT || 8080;
var cors = require("cors");

const Student = require("./server/api/student");
const Course = require("./server/api/course");
const Auth = require("./server/api/auth");
const Lecturer = require("./server/api/lecturer");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/student", Student);
app.use("/course", Course);
app.use("/lecturer", Lecturer);
app.use("/", Auth);

app.listen(Port, () => {
  console.log(["Info"], `Server started on port ${Port}`);
});
