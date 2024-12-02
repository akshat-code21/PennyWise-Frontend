const express = require("express");
const ejs = require("ejs");
const path = require("path");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, 'static')));
app.use("/style", express.static(path.join(__dirname, "style"))); // Serve CSS
app.use("/scripts", express.static(path.join(__dirname, "scripts"))); // Serve JS

// Render the dashboard
app.get("/", (req, res) => {
    res.render("index");
});
app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/dashboard', (req, res) => {
    res.render("dashboard")
})
app.get("/detailExpense", (req, res) => {
    res.render("detailExpense");
});
app.get("/404", (req, res) => {
    res.render("404");
});
// Start the server
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

