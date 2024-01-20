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

    async deleteApplicationById(applicationId) {
        return await this.applicationsRepo.deleteApplicationById(applicationId);
    }

    async findApplicationById(applicationId) {
        return await this.applicationsRepo.findApplicationById(applicationId);
    }

    async saveStatus(statusDto) {
        return await this.applicationsRepo.saveStatus(statusDto);
    }

}

const applicationsService = new ApplicationsService();

module.exports = { applicationsService };