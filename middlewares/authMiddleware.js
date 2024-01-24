
"use strict"
import { UserController } from "../controllers/userController.js";
import {db} from "../server.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

let emailRegEx = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;



export async function isValidRegistration(request, response, next) {
    let {fullname, email, password, confirmPassword} = request.body;

    let usersCollection = db.collection("users");
    let candidate = await usersCollection.findOne({"email" : email});
    if (candidate) {
        return response.status(403).json({message : "a user with this email already exists"});
    }

    if (fullname.split(" ").length != 2 || fullname.length < 5) {
        return response.status(400).json({message : "Invalid fullname"});
    }

    if (!emailRegEx.test(email)) {
        return response.status(400).json({message : "Invalid email"});
    }

    if (password.length < 8 || password.length > 20) {
        return response.status(400).json({message : "Invalid password"});
    }
    
    if (password != confirmPassword) {
        return response.status(400).json({message : "confirm password"});
    }

    next();
}


export async function isValidLogin(request, response, next) {
    let {email, password} = request.body
    let userCollection = db.collection("users");
    let candidate = await userCollection.findOne({"email" : email});
    if (!candidate) {
        return response.status(404).json({message : "the user was not found"});
    }
    let passwordCompareResult = await bcrypt.compare(password, candidate.password);
    if (!passwordCompareResult) {
        return response.status(404).json({message : "invalid password"});
    }
    return next();
}



export async function checkUserAuth(request, response, next) {
    let token = request.cookies.token;
    if (!token) {
        return response.status(401).json({ error: 'Access denied' });
    } 

    try {
        const decodedToken =  jwt.verify(token, process.env.JWT_SECRET);
        let user = await UserController.userInfoById(decodedToken.id);
        delete user.password;
        request.user = user;
        next();     
     }
      catch (error) {
        response.status(401).json({ error: 'Invalid token' });
    }
};
    