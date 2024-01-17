const { applicationsRepository } = require("../core/ApplicationsRepository");
const { getApplicationsStub } = require("../testTools/getApplicationsStub");
const { getApplications } = require("./applications");
describe("Applications", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    })
    it("should return 200 if applications are returned successfully", async () => {
        // arrange
        const req = {
            user: {
                userId: 1
            }
        }
        const res = {
            json: jest.fn()
        }
        applicationsRepository.getApplications = jest.fn().mockReturnValue(getApplicationsStub);
        // act
        await getApplications(req, res);
        // assert
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            result: {
                message: "Applications returned successfully",
                status: 200,
                data: getApplicationsStub
            }
        })
    })
        
})