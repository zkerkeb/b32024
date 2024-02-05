const userModel = require('../models/userModel');

const login = async (req, res) => {
    const { email, password } = req.body;
   

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // TODO: Implemnter l'authentification

    const token = await userModel.generateAuthToken();
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    res.setHeader('Authorization', token);
    res.status(200).send({
        message: 'Login successful',
    });
}

module.exports = {
    login,
};