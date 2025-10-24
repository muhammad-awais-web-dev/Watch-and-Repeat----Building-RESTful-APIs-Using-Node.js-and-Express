const express = require('express')
const routes = express.Router();

const userController =  require('./userController');

routes.get("/",(req,res) => {
    try{
        userController.getUsers(function(err,users){
            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send({status: "OK", data: users});
            };
        });
    }catch(err){
        return res.status(500).send('Try after some time');
    }
})
routes.get("/:id",(req,res) => {
    try{
        const userId = parseInt(req.params.id);
        userController.getUserById(userId, function(err,user){
            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send({status: "OK", data: user});
            };
        });
    }catch(err){
        return res.status(500).send('Unexpected Error. Try after some time');
    }
});
routes.put("/:id",(req,res) => {
    try {
        const userId = parseInt(req.params.id);
        const userName = req.body.userName;
        userController.updateUserDetails(userId, userName, function(err,message){
            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send({status: "OK", data: message});
            };
        });
    } catch (err) {
        return res.status(500).send('Unexpected Error. Try after some time');
    }
})
routes.post("/",(req,res) => {
    try {
        const newUser = req.body;
        userController.createUser(newUser, function(err,message){
            if(err){
                res.status(400).send(err);
            }else{
                res.status(201).send({status: "OK", data: message});
            };
        });
    } catch (err) {
        return res.status(500).send('Unexpected Error. Try after some time');
    }
})
routes.delete("/:id",(req,res) => {
    try {
        const userId = parseInt(req.params.id);
        userController.deleteUser(userId, function(err,message){
            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send({status: "OK", data: message});
            };
        });
    } catch (err) {
        return res.status(500).send('Unexpected Error. Try after some time');
    }
})

module.exports = routes;