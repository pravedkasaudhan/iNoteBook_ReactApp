const express = require("express");
const User = require('../models/User')
const fetchData = require('../Middleware/fetchdata')

const router = express.Router();
const { body, validationResult } = require('express-validator');

let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let SECRET_TOKEN = 'praved123'

//ROUTE 1:- CREATE USER
// use 'post' for better data security 
//add the validator for the data validation as per the body 
router.post("/createUser",
    [
        body('name', "enter the valid name").isLength({ min: 5 }),
        body('email', "enter the valid email").isEmail(),
        body('password', "enter the valid length password").isLength({ min: 5 }),
    ],
    async (req, res) => {
        let success=false;
        //if there are errors return bad error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //set the databse with data entry as per the schema defined
        // User.create({
        //     name: req.body.name,
        //     email:req.body.email,
        //     password: req.body.password,
        //   }).then(user => res.json(user))
        //   .catch(err=>{
        //       console.log(err);
        //       res.json({error:"please enter the valid unique email",message:err.message})
        //   })

        //just enter the user data in databse
        // const user = User(req.body);
        // user.save();
        // res.send(req.body);


        // set the data as per the manual filter of already present email user using await
        try {
            //get the user if there already in databse , it returns promise so we use await
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).send("user with this email already present")
            }
            else {
                //for hashing the password into hash code with bcryptjs
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(req.body.password, salt);

                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: secPass,
                })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, SECRET_TOKEN);
            console.log(authToken)
            success=true;
            res.json({ success,authToken });
        }
        catch (error) {
            console.log(error.message);
            res.status(502).send("INTERNAL SERVER ERROR");
        }

    })

//ROUTE 2 :- LOGIN
router.post("/login",
    [
        body('email', "enter the valid email").isEmail(),
        body('password', "enter the valid length password").isLength({ min: 5 }),
    ],
    async (req, res) => {
        let success=false;
        //if there are errors return bad error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        // console.log(email,password);
        try {

            const userExist = await User.findOne({ email: email });
            // console.log(userExist);
            if (!userExist) {
                return res.status(400).json({success:success, error: "PLEASE ENTER THE VALID LOGIN CREDENTIALS" });
            }

            const passwordCheck = await bcrypt.compare(password, userExist.password);
            if (!passwordCheck) {
                return res.status(400).json({success:success, error: "PLEASE ENTER THE VALID LOGIN CREDENTIALS" });
            }

            const payLoad = {
                userExist: {
                    id: userExist.id
                }
            }
            const authToken = jwt.sign(payLoad, SECRET_TOKEN);
            success=true;
            console.log(authToken)
            res.json({success, authToken });
        }
        catch (error) {
            console.log(error.message);
            res.status(502).send("INTERNAL SERVER ERROR");
        }
    }
)

router.post("/getUser", fetchData, async (req, res) => {
    try {

        const userId = req.user.id;
        const data = await User.findById(userId).select("-password");
        res.json(data);
    } catch (error) {
        console.log(error.message);
        res.status(502).send("INTERNAL SERVER ERROR");
    }
})
module.exports = router