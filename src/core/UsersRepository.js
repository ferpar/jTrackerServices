const UsersGateway = require("../dbGateways/usersGateway");

class UsersRepository {
  usersGateway;
  constructor() {
    this.usersGateway = new UsersGateway();
  }

  async getUsers() {
    return await this.usersGateway.getUsers();
  }

  async matchUser(email, password) {
    return await this.usersGateway.matchUser(email, password);
  }
}
const usersRepository = new UsersRepository();

module.exports = { usersRepository };
