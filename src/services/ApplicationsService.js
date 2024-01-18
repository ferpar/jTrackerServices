const ApplicationsRepo = require('../dbRepos/applicationsRepo');

class ApplicationsService {
    applicationsRepo;
    constructor() {
        this.applicationsRepo = new ApplicationsRepo();
    }

    async getApplications(userId) {
        const allApplications = await this.applicationsRepo.getApplications(userId);
        const filteredByUser = allApplications.filter(application => application.userId === userId);
        return filteredByUser
    }

    async saveApplication(applicationDto) {
        return await this.applicationsRepo.saveApplication(applicationDto);
    }
}

const applicationsService = new ApplicationsService();

module.exports = { applicationsService };