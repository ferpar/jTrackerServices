#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE jobTrackerDb;
    \\c jobTrackerDb
    CREATE TABLE JobApplications (
        userId INT,
        id SERIAL PRIMARY KEY,
        jobTitle VARCHAR(100),
        company VARCHAR(100),
        location VARCHAR(100),
        appliedDate DATE,
        contactPerson VARCHAR(100),
        contactEmail VARCHAR(100),
        notes TEXT,
        resumeLink VARCHAR(255),
        jobDescriptionLink VARCHAR(255)
    );
    CREATE TABLE ApplicationStatus (
        statusId SERIAL PRIMARY KEY,
        applicationId INT,
        status VARCHAR(100),
        statusDate DATE,
        notes TEXT,
        FOREIGN KEY (applicationId) REFERENCES JobApplications(id)
    );
    INSERT INTO JobApplications (userId, jobTitle, company, location, appliedDate, contactPerson, contactEmail, notes, resumeLink, jobDescriptionLink)
    VALUES 
        (1, 'Software Engineer', 'TechCorp', 'San Francisco, CA', '2023-01-15', 'John Doe', 'john.doe@techcorp.com', 'Met at a tech conference', 'http://example.com/resume/123.pdf', 'http://example.com/job/456'),
        (1, 'Data Analyst', 'DataCorp', 'New York, NY', '2023-01-20', 'Jane Smith', 'jane.smith@datacorp.com', 'Referred by a colleague', 'http://example.com/resume/124.pdf', 'http://example.com/job/457');
    INSERT INTO ApplicationStatus (applicationId, status, statusDate, notes)
    VALUES 
        (1, 'applied', '2023-01-15', 'Application submitted online'),
        (1, 'interview', '2023-01-22', 'Received call for interview'),
        (2, 'applied', '2023-01-20', 'Submitted application via email');

EOSQL