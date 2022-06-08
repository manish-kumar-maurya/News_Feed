const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require("../../../models/users/usersModel");


const validationRegisterInput = require('../../../validation/profile');
  
    const postUser = async(req, res) => {
        console.log(req.body);

        try{
        
        // const { errors, isValid } = validationRegisterInput(req.body)
    
        // if(!isValid){
        //     return res.status(400).json(errors);
        // }

        // Get Fields
        console.log("Inside Try---here 1")
        await User.findOne({email: req.body.email})
            .then(async(data)=>{
                console.log("here 1*********************")
                if(data){
                    console.log("here 2*********************")
                    return res.status(400).json({email: 'email already exists'})
                }
                else{
                    console.log("here 3*********************")
                    const newUser = new User({
                        userName: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        phoneNumber: req.body.phoneNumber,
                        dateOfBirth: req.body.dob,
                        timeOfBirth: req.body.tob,
                        gender: req.body.gender,
                        maritalStatus: req.body.mariageStatus,
                        language: req.body.language,
                        profilePicture: req.body.profilePicture,
                    });
                    console.log({newUser});
                    console.log("here 1*********************")
                    bcrypt.genSalt(10, (err, salt)=> {
                        console.log("here 1*********************")
                        bcrypt.hash(newUser.password, salt, async(err, hash)=> {
                            console.log("here 1*********************")
                            if(err) throw err;

                            // Store hash in your password DB.
                            newUser.password = hash;
                            const registeredUser = await newUser.save();
                                // .then(user=>res.json({user}))
                            console.log({registeredUser})
                            return res.status(200).json({msg:"Successfull saved to DB"});
                                

                        });
                    });

                }
            })
    } catch(err){
        console.log(err)
        res.status(500).json(err.message);
    }
}

module.exports = postUser;