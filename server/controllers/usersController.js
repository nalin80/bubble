const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userSchema');

exports.signUp = async (req, res) => {

    try {
        const { userName: name , email, password, confirm_password } = req.body;

        if (!name || !email || !password || !confirm_password) {
            return res.status(406).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(406).json({ message: 'User already exists' });
        }

        if (password != confirm_password) {
            return res.status(406).json({ message: 'Please enter the same password' });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const createUser = await User.create({ name, email, password: hashPassword });

        return res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

exports.signIn = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(406).json({ message: 'All fields are required', profile: null });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(406).json({ message: 'Invalid credentials', profile: null });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(406).json({ message: 'Invalid credentials', profile: null });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({ message: 'Sign In Successfully', profile: { token, id: user._id, email: user.email, name: user.name } });
    
    } catch (error) {
        return res.status(500).json({ message:error.message, profile:null });

    }

}