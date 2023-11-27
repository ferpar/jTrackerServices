const { jsonDb } = require("./jsonDb");

class BooksGateway {
  constructor(dbName = "booksFile.json") {
    this.dbName = dbName;
    this.db = new jsonDb(this.dbName);
  }

  async getBooks() {
    return await this.db.readDb();
  }

  async saveBook(bookDto) {
    const books = await this.getBooks();
    books.push(bookDto);
    return await this.db.writeDb(books);
  }

  async saveBooks(booksDto) {
    const books = await this.getBooks();
    books.push(...booksDto);
    return await this.db.writeDb(books);
  }
}

module.exports = BooksGateway;