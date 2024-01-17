function getApplicationsStub() {
  return [
    {
      userId: 1,
      id: 123,
      jobTitle: "Software Developer",
      company: "TechCorp",
      location: "New York, NY",
      appliedDate: "2024-01-10",
      contactPerson: "Jane Doe",
      contactEmail: "jane.doe@techcorp.com",
      notes: "Met at a tech conference.",
      resumeLink: "http://example.com/resume/123.pdf",
      jobDescriptionLink: "http://example.com/job/456",
      statuses: [
        {
          statusId: 1,
          applicationId: 123,
          status: "applied",
          statusDate: "2024-01-10",
          notes: "Application submitted through company website.",
        },
        {
          statusId: 2,
          applicationId: 123,
          status: "interview",
          statusDate: "2024-01-20",
          notes: "Received call for interview.",
        },
      ],
    },
    {
      userId: 2,
      id: 456,
      jobTitle: "Software Developer",
      company: "TechCorp",
      location: "New York, NY",
      appliedDate: "2024-01-11",
      contactPerson: "Jane Smith",
      contactEmail: "jane.smith@techcorp.com",
      notes: "Met at a tech conference.",
      resumeLink: "http://example.com/resume/456.pdf",
      jobDescriptionLink: "http://example.com/job/789",
      statuses: [
        {
          statusId: 3,
          applicationId: 456,
          status: "applied",
          statusDate: "2024-01-11",
          notes: "Application submitted through company website.",
        },
        {
          statusId: 4,
          applicationId: 456,
          status: "interview",
          statusDate: "2024-01-21",
          notes: "Received call for interview.",
        },
      ],
    },
  ];
}

module.exports = { getApplicationsStub };