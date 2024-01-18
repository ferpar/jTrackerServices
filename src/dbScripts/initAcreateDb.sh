#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE jobTrackerDb;
    \\c jobTrackerDb
    CREATE TABLE JobApplications (
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
EOSQL