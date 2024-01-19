
const { jsonDb } = require("./jsonDb");
const mainDb = require("../periphery/mainDb");

class ApplicationsRepo {
  constructor(dbName = "applicationsFile.json") {
    this.dbName = dbName;
    this.db = new jsonDb(this.dbName);
  }

  async getApplications(userId) {
    // const allApplications = await this.db.readDb();
    // return allApplications
    const applications = await mainDb.retrieveApplications(userId);
    console.log(applications);
    const statuses = await mainDb.retrieveStatuses(userId);
    console.log(statuses)
    return applications;
  }

  async saveApplication(applicationDto) {
    const applications = await this.getApplications();
    applications.push(applicationDto);
    return await this.db.writeDb(applications);
  }

  // async saveApplications(applicationsDto) {
  //   const applications = await this.getApplications();
  //   applications.push(...applicationsDto);
  //   return await this.db.writeDb(applications);
  // }
}

module.exports = ApplicationsRepo;