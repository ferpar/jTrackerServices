const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");
const BooksGateway = require("./dbGateways/booksGateway");
const booksGateway = new BooksGateway();

const PORT = process.env.BOOKS_PORT;

const authenticateJWT = require("./authMiddleware");

const app = express();

app.use(bodyParser.json());

app.get("/books", authenticateJWT, (req, res) => {

const books = booksGateway.getBooks();
  console.log("returning books");
  res.json(books);
});

app.post("/books", authenticateJWT, (req, res) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.sendStatus(403);
  }

  const book = req.body;
  booksGateway.saveBook(book);
  res.send("Book added successfully");
});

app.get("/", (req, res) => {
  res.send("You reached the books service");
});

app.listen(PORT, () => {
  console.log(`Books service is running on port ${PORT}`);
});
