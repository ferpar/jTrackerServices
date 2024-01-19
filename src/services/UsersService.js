const UsersRepo = require("../repos/usersRepo");

class UsersService {
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
const usersService = new UsersService();

module.exports = { usersService };
