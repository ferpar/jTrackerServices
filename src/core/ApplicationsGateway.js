const ApplicationsRepo = require('../dbRepos/applicationsRepo');

class ApplicationsGateway {
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

const applicationsGateway = new ApplicationsGateway();

module.exports = { applicationsGateway };