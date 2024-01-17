const UsersRepo = require("../dbRepos/usersRepo");

class UsersGateway {
  usersRepo;
  constructor() {
    this.usersRepo = new UsersRepo();
  }

  async getUsers() {
    return await this.usersRepo.getUsers();
  }

  async matchUser(email, password) {
    return await this.usersRepo.matchUser(email, password);
  }
}
const usersGateway = new UsersGateway();

module.exports = { usersGateway };
