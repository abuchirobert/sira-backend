const express = require('express')
const reportController = require('../controllers/report.controller');
const uploadTask = require('../middlewares/evidence.middleware');
const protect = require('../middlewares/auth.middleware');

const reportRouter = express.Router()

reportRouter.route('/add-report').post(protect, uploadTask, reportController.addReport)

module.exports = reportRouter