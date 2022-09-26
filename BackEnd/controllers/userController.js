const user = require('../models/user');

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports.login = async (req, res, next) => {
    let { email, password } = req.body;

    let result = await user.findOne({ email: email });
    if (result == null) {
        next(new Error('Invalid Credentials'));
    }
    if (result) {
        result = result._doc;
    }


    //Check the password in Hashed.
    if (await bcrypt.compare(password, result.password)) {
        //Generate the token
        const token = jwt.sign({
            data: { id: result._id, email: result.email }
        }, process.env.Token_Secret, { expiresIn: '12h' });

        res.json({ ...result, password: null, token: token });
    }
    else {
        next(new Error('Invalid Credentials'));
    }

}

module.exports.SignUp = async (req, res, next) => {

    //check if email already exist.

    let result = await user.find({ email: req.body.email });
    if (result.length > 0) {
        next(new Error('email already exist'));
        return;
    }
    //Hash the password before save it in the db.
    req.body.password = await bcrypt.hash(req.body.password, 5);
    await user.create(req.body);
    res.json({ success: 1 })
}

module.exports.update = async (req, res, next) => {

    let obj = req.body;

    const password = await bcrypt.hash(obj.password, 5);
    let result = await user.updateOne({ _id: req.params.id }, {
        $set: { 'firstName': obj.firstName, 'lastName': obj.lastName, 'password': password }
    });
    res.json({ success: 1 })
}

