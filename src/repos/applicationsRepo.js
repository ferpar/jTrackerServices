
const mainDb = require("../periphery/mainDb");
class ApplicationsRepo {

  async getApplications(userId) {
    const applications = await mainDb.retrieveApplications(userId);
    const statuses = await mainDb.retrieveStatuses(userId);
    console.log(statuses)
    const applicationsWithStatuses = applications.map(application => {
      const applicationStatuses = statuses.filter(status => status.applicationid === application.id);
      return {
        ...application,
        statuses: applicationStatuses
      }
    })
    console.log(applicationsWithStatuses)
    return applicationsWithStatuses;
  }

  async saveApplication(applicationDto) {
    const response = await mainDb.insertApplication(applicationDto);
    return response
  }

  async findApplicationById(applicationId) {
    return await mainDb.findApplicationById(applicationId);
  }

  async deleteApplicationById(applicationId) {
    return await mainDb.deleteApplicationById(applicationId);
  }
}

module.exports = ApplicationsRepo;