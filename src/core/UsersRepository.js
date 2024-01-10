const UsersGateway = require("../dbGateways/usersGateway");

class UsersRepository {
  usersGateway;
  constructor() {
    this.usersGateway = new UsersGateway();
  }

  async getUsers() {
    return await this.usersGateway.getUsers();
  }

  async matchUser(username, password) {
    return await this.usersGateway.matchUser(username, password);
  }
}
const usersRepository = new UsersRepository();

module.exports = { usersRepository };
