var jwt = require('jsonwebtoken');

const express = require('express');

module.exports = (req, res, next) => {
   
    const authHeader = req.headers['authorization']
    if (authHeader == null) {
        res.status(401)
        res.send({error:'No token found'});
        return;
        
    }
    else{
        const token = authHeader.split(' ')[1];

        try {
            var decoded = jwt.verify(token, process.env.Token_Secret);
            req.user = decoded.data;
            next();
        } catch (err) {
            // err
            res.status(401)
            res.send({error:'Invalid Token'});
            next(new Error('Invalid Token'))
        }
    }
   
}
