const ApplicationsGateway = require('../dbGateways/applicationsGateway');

class ApplicationsRepository {
    ApplicationsGateway;
    constructor() {
        this.ApplicationsGateway = new ApplicationsGateway();
    }

    async getApplications(userId) {
        return await this.ApplicationsGateway.getApplications(userId);
    }

    async saveApplication(applicationDto) {
        return await this.ApplicationsGateway.saveApplication(applicationDto);
    }
}

const applicationsRepository = new ApplicationsRepository();

module.exports = { applicationsRepository };