const express = require("express");

const app = express();
const Port = process.env.NODEJS_PORT || 8080;

const Student = require("./server/api/student");
const Auth = require("./server/api/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/student", Student);
app.use("/", Auth);

app.listen(Port, () => {
  console.log(["Info"], `Server started on port ${Port}`);
});
