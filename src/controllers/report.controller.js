const ReportService = require("../services/report.service")
const handleValidationError  = require("../utils/validation.utils")

class ReportController {

    reportService
    constructor() {
        this.reportService = new ReportService()
    }

    addReport = async (req, res) => {
        const file = req.file
        const otherFields = req.body
        const id = req.user._id
        
        
        // console.log(otherFields);
        
        try {
            

            const reportData = await this.reportService.uploadService(file, otherFields, id)
            if (reportData) {
                res.status(201).json({
                    status: true,
                    message: 'Vehicle data was successfully uploaded...'
                });
            }
        } catch (error) {
            if (error.name === 'ValidationError') {

                if (error.errors['location']) { 
                    return res.status(406).json({
                        status: false,
                        message: error.errors['location'].message
                    })
                }
                 if (error.errors['issueType']) {
                     return res.status(406).json({
                         status: false,
                         message: error.errors['issueType'].message
                     });
                 }
                if (error.errors['description']) {
                    return res.status(406).json({
                        status: false,
                        message: error.errors['description'].message
                    });
                }
                
            } else {
                res.status(500).json({
                    status: false,
                    message: `Error while adding vehicle data: ${error.message}`,
                    stack: error.stack
                });
            }
        }

    }
}

const reportController = new ReportController()
module.exports = reportController