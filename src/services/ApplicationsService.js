const ApplicationsRepo = require('../repos/applicationsRepo');

class ApplicationsService {
    applicationsRepo;
    constructor() {
        this.applicationsRepo = new ApplicationsRepo();
    }

    async getApplications(userId) {
        const applications = await this.applicationsRepo.getApplications(userId);
        return applications
    }

    async saveApplication(applicationDto) {
        return await this.applicationsRepo.saveApplication(applicationDto);
    }
}

const applicationsService = new ApplicationsService();

module.exports = { applicationsService };