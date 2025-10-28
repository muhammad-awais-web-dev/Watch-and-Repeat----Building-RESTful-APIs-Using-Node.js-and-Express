const express = require('express');
const routes = express.Router();
const authController = require('./authController');

routes.post('/register',(req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "Name, email and password are required"});
        }

        const userDetails = {name, email, password};
        authController.registerUser(userDetails, (err, result) => {
            if(err){
                // return 409 for already-existing user, otherwise a 500
                if(err === 'User already exists'){
                    return res.status(409).json({message: err});
                }
                return res.status(500).json({message: err});
            }
            return res.status(201).json({message: "User registered successfully", user: result});
        });
    }
    catch(err){
        return res.status(500).json({message: "Internal server error"});
    }
});

module.exports = routes;