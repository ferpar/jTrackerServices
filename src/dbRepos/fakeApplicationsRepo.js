
class FakeApplicationsRepo {
  constructor() {
    this.db = [];
  }

  async getApplications(userId) {
    return false
  }

  async saveApplication(applicationDto) {
    return false
  }

  async saveApplications(applicationsDto) {
    return false
  }
}

module.exports = FakeApplicationsRepo;