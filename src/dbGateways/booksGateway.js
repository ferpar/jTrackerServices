const { jsonDb } = require("./jsonDb");

class BooksGateway {
  constructor(dbName = "booksFile.json") {
    this.dbName = dbName;
    this.db = new jsonDb(this.dbName);
  }

  getBooks() {
    return this.db.readDb();
  }

  saveBook(bookDto) {
    const books = this.getBooks();
    books.push(bookDto);
    return this.db.writeDb(books);
  }

  saveBooks(booksDto) {
    const books = this.getBooks();
    books.push(...booksDto);
    return this.db.writeDb(books);
  }
}

module.exports = BooksGateway;