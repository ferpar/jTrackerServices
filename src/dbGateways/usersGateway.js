const { jsonDb } = require("./jsonDb");

class UsersGateway {
    constructor(dbName = "usersFile.json") {
        this.dbName = dbName;
        this.db = new jsonDb(this.dbName);
    }

    getUsers = async () => {
        return await this.db.readDb();
    }

    async matchUser(email, password) {
        const users = await this.getUsers();
        return users.find(user => user.email === email && user.password === password);
    }
}

module.exports = UsersGateway;