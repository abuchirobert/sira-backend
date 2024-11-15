const jwt = require('jsonwebtoken');
const handleValidationError = (res, error, fields) => {
    // Iterate over each field name in the `fields` array
    // for (const field of fields) {
        if (error.errors[fields]) {
            // Respond with the first matching field's error message
            res.status(406).json({
                status: false,
                message: error.errors[fields].message
            });
            return; // Exit the function after the first error is found
        }
    // }
    // Optionally, handle the case if no specific field errors were found
    // res.status(406).json({
    //     status: false,
    //     message: 'Validation failed'
    // });
};


module.exports = handleValidationError;
