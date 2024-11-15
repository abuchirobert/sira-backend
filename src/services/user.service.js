const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


class UserService {
    async createUserService(email, password) {
    
        const password_hash = password ?  bcrypt.hashSync(password, 10) : '';
        
        const user = new User({ email, password: password_hash });
        return await user.save();
    }

    async checkUserExistsService(email) {
        const userEmailExists = await User.findOne({ email });
        return userEmailExists !== null;
    }

    async loginService(email, password) {
        const user = await User.findOne({ email });
        // console.log(user);

        if (!user) {
            throw new Error('User not found');
        }

        const comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            throw new Error('Email or Password does not match');
        }

        // console.log(token);
        return user;
    }

   
}

module.exports = UserService;
