
const { jsonDb } = require("./jsonDb");

class ApplicationsRepo {
  constructor(dbName = "applicationsFile.json") {
    this.dbName = dbName;
    this.db = new jsonDb(this.dbName);
  }

  async getApplications(userId) {
    const allApplications = await this.db.readDb();
    const filteredByUser = allApplications.filter((application) => application.userId === userId);
    return filteredByUser;
  }

  async saveApplication(applicationDto) {
    const applications = await this.getApplications();
    applications.push(applicationDto);
    return await this.db.writeDb(applications);
  }

  async saveApplications(applicationsDto) {
    const applications = await this.getApplications();
    applications.push(...applicationsDto);
    return await this.db.writeDb(applications);
  }
}

module.exports = ApplicationsRepo;