const Report = require('../models/report.model');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// console.log('Cloudinary API Key:', process.env.CLOUDINARY_API_KEY);
class ReportService {
    uploadService = async (file, otherFields, id) => {
        if (!file) {
            throw new Error('Please Provide the Image Evidence');
        }

       const evidence = await new Promise((resolve, reject) => {
           const stream = cloudinary.uploader.upload_stream({ folder: 'evidence' }, (error, result) => {
               if (error) return reject(error);
               resolve(result);
           });
           stream.end(file.buffer);
       });

        const report = await Report.create({
            userId: id,
            ...otherFields,
            evidence: evidence.secure_url
        });

        return report;
    };
}

module.exports = ReportService;
