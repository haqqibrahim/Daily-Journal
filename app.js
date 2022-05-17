// jshint esversion: 6

// IMPORTING MODULES
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

// CONSTANT CONTENTS
const homeStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus faucibus est lacinia dictum. Sed a ligula id ligula ultricies euismod. Morbi efficitur non arcu id finibus. Sed condimentum aliquet lacus, in accumsan ex cursus sed. Nullam a ultricies sapien. Fusce interdum turpis id pharetra congue. Vestibulum vel neque non libero accumsan luctus at a enim. Vivamus sit amet erat eget nunc rutrum fringilla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus faucibus est lacinia dictum. Sed a ligula id ligula ultricies euismod. Morbi efficitur non arcu id finibus. Sed condimentum aliquet lacus, in accumsan ex cursus sed. Nullam a ultricies sapien. Fusce interdum turpis id pharetra congue. Vestibulum vel neque non libero accumsan luctus at a enim. Vivamus sit amet erat eget nunc rutrum fringilla.";
const aboutContent =
  "Quisque sit amet metus sed mi pretium tempus nec a eros. Vestibulum tincidunt, nunc in tincidunt imperdiet, odio felis finibus nibh, lacinia sodales tellus ante in tortor. Nulla urna risus, luctus suscipit molestie at, sollicitudin vel justo. Donec vestibulum libero nec justo euismod pharetra ut cursus tortor. Maecenas libero neque, dictum in nibh vel, suscipit dignissim odio. Aenean volutpat tortor vel magna aliquam, non convallis arcu efficitur. Nunc porta tellus ante, et bibendum metus luctus eget. Nullam condimentum a augue ac posuere.";
const contactContent =
  "Sed euismod, nisi eget consectetur consectetur, nisl nisl consectetur nisl, eget consectetur nisl nisl eget nisl. Nulla euismod, nisl eget consectetur consectetur, nisl nisl consectetur nisl, eget consectetur nisl nisl eget nisl. Nulla euismod, nisl eget consectetur consectetur, nisl nisl consectetur nisl, eget consectetur nisl nisl eget nisl. Nulla euismod, nisl eget consectetur consectetur, nisl nisl consectetur nisl, eget consectetur nisl nisl eget nisl. Nulla euismod, nisl eget consectetur consectetur, nisl nisl consectetur nisl, eget consectetur nisl nisl eget nisl. Nulla euismod, nisl eget consectetur consectetur, nisl nisl consectetur nisl, eget consectetur nisl nisl eget nisl. Nulla euismod, nisl eget consectetur consectetur, nisl nisl consectetur nisl, eget consectetur nisl nisl eget nisl. Nulla euismod, nisl eget consectetur consectetur, nisl nisl consectetur nisl, eget consectetur nisl nisl eget nisl. Nulla euismod, nisl eget consectetur consectetur, nisl nisl consectetur nisl, eget consectetur nisl nisl eget nisl. Nulla euismod, nisl eget consectetur consectetur, nisl nisl consectetur nisl, eget consectetur nisl nisl eget nisl. Nulla euismod, nisl eget consectetur consectetur, nisl nisl consectetur nisl, eget con";

// ALL POSTS
const posts = [];
// CREATING EXPRESS APP
const app = express();
// SETTING VIEW ENGINE
app.set("view engine", "ejs");

// SETTING UP PARSER
app.use(bodyParser.urlencoded({ extended: true }));
// SETTING UP PUBLIC FOLDER
app.use(express.static("public"));

// ROUTES
app.get("/", (req, res) => {
  res.render("home", {
    homeContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactUsContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;
  const post = {
    title: postTitle,
    content: postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});



// SERVER PORT
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
