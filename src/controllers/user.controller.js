const UserService = require('../services/user.service');
const generateToken = require('../utils/generateToken');
const userService = new UserService()

class UserController {
    async createUserController(req, res) {
        const { email, password, confirmPassword } = req.body;

        try {
            if (!email || !password || !confirmPassword) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required'
                });
            }

            //    check if the user already exists
            const userExists = await userService.checkUserExistsService(email);
            if (userExists) {
                return res.status(400).json({
                    status: false,
                    message: 'User already exists'
                });
            }

            //    check if the password character is less than 8

            if (password && password.length < 8) {
                return res.status(400).json({
                    status: false,
                    message: 'Password is too short, use at leaast 8 characters'
                });
            }

            //    check if the password matches

            const passwordMatch = password === confirmPassword;

            if (!passwordMatch) {
                return res.status(400).json({
                    status: false,
                    message: 'Password does not match'
                });
            }

            const user = await userService.createUserService(email, password);

            if (user) {
                return res.status(200).json({
                    status: true,
                    message: 'User created successfully'
                });
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message,
                name: error.name,
                stack: process.env.NODE_ENV !== 'production' ? error.stack : ''
            });
        }
    }

    async loginUserController(req, res) {
        const { email, password } = req.body;

        try {
            if (!email || !password) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required'
                });
            }

            await userService.loginService(email, password).then((user) => {
                console.log(generateToken(res, user._id));
                generateToken(res, user._id);

                res.status(200).json({
                    status: true,
                    data: [
                        {
                            message: 'Login Successfully...',
                            user: user.email
                        }
                    ]
                });
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message,
                name: error.name,
                stack: process.env.NODE_ENV !== 'production' ? error.stack : ''
            });
        }

    }

    // logout method
    logoutUserController = async (req, res) => {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).json({
            status: true,
            message: 'You have Successfully logged out'
        });
    };
}

const userController = new UserController()
module.exports = userController