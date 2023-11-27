const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const books = require("./booksFile");

const PORT = process.env.BOOKS_PORT;

const authenticateJWT = require("./authMiddleware");

const app = express();

app.use(bodyParser.json());

app.get("/books", authenticateJWT, (req, res) => {
    res.json(books);
})

app.get("/", (req, res) => {
    res.send("You reached the books service");
}
);

app.listen(PORT, () => {
    console.log(`Books service is running on port ${PORT}`)
})
