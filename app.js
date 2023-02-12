const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//for static file
app.use(express.static("public"));

app.set("view engine", "ejs");
var item = [];
var workitem = [];
app.get("/", function (req, res) {
  var today = new Date();
  var todaydate = today.getDay();
  var day = "";
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  day = today.toLocaleDateString("en-US", options);

  res.render("list", { todayDay: day, newList: item });
});
app.listen(3000, function (req, res) {
  console.log("server started at port 3000");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/work", function (req, res) {
  res.render("list", { todayDay: "newday", newList: workitem });
});

app.post("/", function (req, res) {
  newitem = req.body.todo;
  console.log(req.body);
  if (req.body.button === "newday") {
    workitem.push(newitem);
    res.redirect("/work");
  } else {
    item.push(newitem);
    res.redirect("/");
  }
});
app.delete("/", function (req, res) {
  console.log("entered for deletion");
  item.pop;
  res.redirect("/");
});
