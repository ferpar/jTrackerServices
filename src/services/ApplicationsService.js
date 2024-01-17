const ApplicationsRepo = require('../dbRepos/applicationsRepo');

class ApplicationsService {
    applicationsRepo;
    constructor() {
        this.applicationsRepo = new ApplicationsRepo();
    }

    async getApplications(userId) {
        return await this.applicationsRepo.getApplications(userId);
    }

    async saveApplication(applicationDto) {
        return await this.applicationsRepo.saveApplication(applicationDto);
    }
}

const applicationsService = new ApplicationsService();

module.exports = { applicationsService };