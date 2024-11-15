const multer = require('multer');


const storage = multer.memoryStorage()
const upload = multer({storage})

const uploadTask = upload.single('evidence');

module.exports = uploadTask

