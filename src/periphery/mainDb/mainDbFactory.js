function makeMainDb({ dbPool }) {
    return {
        insertApplication: async function (jobApplication) {
            const { jobTitle, company, location, appliedDate, contactPerson, contactEmail, resumeLink, jobDescriptionLink, status, notes } = jobApplication;
            const result = await dbPool.query(
                "INSERT INTO jobApplications (jobTitle, company, location, appliedDate, contactPerson, contactEmail, resumeLink, jobDescriptionLink, status, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [jobTitle, company, location, appliedDate, contactPerson, contactEmail, resumeLink, jobDescriptionLink, status, notes]
            );
            return result.rows[0];
        },

        retrieveApplications: async function (userId) {
            const result = await dbPool.query(
                "SELECT * FROM jobApplications WHERE userId = $1",
                [userId]
            );
            return result.rows;
        },

        findApplicationById: async function (applicationId) {
            const result = await dbPool.query(
                "SELECT * FROM jobApplications WHERE id = $1",
                [applicationId]
            );
            return result.rows[0];
        },

        updateApplicationById: async function (applicationId, jobApplication) {
            const { jobTitle, company, location, appliedDate, contactPerson, contactEmail, resumeLink, jobDescriptionLink, status, notes } = jobApplication;
            const result = await dbPool.query(
                "UPDATE jobApplications SET jobTitle = $1, company = $2, location = $3, appliedDate = $4, contactPerson = $5, contactEmail = $6, resumeLink = $7, jobDescriptionLink = $8, status = $9, notes = $10 WHERE id = $11 RETURNING *",
                [jobTitle, company, location, appliedDate, contactPerson, contactEmail, resumeLink, jobDescriptionLink, status, notes, applicationId]
            );
            return result.rows[0];
        },

        insertStatus: async function (statusObj) {
            const { applicationId, status, statusDate, notes } = statusObj;
            const result = await dbPool.query(
                "INSERT INTO statuses (applicationId, status, statusDate, notes) VALUES ($1, $2, $3, $4) RETURNING *",
                [applicationId, status, statusDate, notes]
            );
            return result.rows[0];
        },

        retrieveStatuses: async function (applicationId) {
            const result = await dbPool.query(
                "SELECT * FROM statuses WHERE applicationId = $1",
                [applicationId]
            );
            return result.rows;
        },
    }
}

module.exports = makeMainDb;