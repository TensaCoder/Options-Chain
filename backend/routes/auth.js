// // Option 1
// // const express = require('express')
// // const router = express.Router();

// // import { Router } from "express";   //Cannot use import outside a module, use require instead

// // Option 2
// const Router = require('express')
// const router = Router();
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const fetchuser = require('../middleware/fetchuser')
// require("dotenv").config();

// // Create a user using POST at "/api/auth/createuser". Doesnt require auth

// router.post('/create-user',
//     [
//         body('name').isLength({ min: 3 }),
//         body('email').isEmail(),
//         body('password', 'Password should be atleast 8 character').isLength({ min: 8 })
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         try {
//             let user = await User.findOne({ email: req.body.email });
//             if (user) {
//                 return res.status(400).json({ error: "A User with the email already exists!!!" })
//             }

//             // Once detail validation is done, we go on to encrypt the password and store the new encrypted password on the database using salt and hash function.
//             let salt = await bcrypt.genSalt(10);
//             let hash = await bcrypt.hash(req.body.password, salt);

//             // creating the user in the database
//             user = await User.create({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: hash
//             });

//             // Creating a Authentication Token
//             const data = {
//                 user: {
//                     id: user.id
//                 }
//             }
//             const authToken = jwt.sign(data, process.env.JWT_Secret)
//             // console.log(data);

//             // Send the AuthToken to the User
//             res.json({ authToken });

//         } catch (err) {
//             // Send error to user
//             return res.status(500).json({ error: err.message })

//         }
//     });


// // Authenticate using POST at "/api/auth/login". Doesnt require auth

// router.post('/login',
//     [
//         body('email', "Enter a valid Email ID").isEmail(),
//         body('password', "Password cannot be blank!!!").exists()
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         let { email, password } = req.body;

//         try {
//             // Check to see if the user exists in the Database
//             let user = await User.findOne({ email });
//             if (!user) {
//                 return res.status(500).json({ error: "Enter correct credentials!!!" })
//             }

//             // Now check if the credentials match or not
//             let checkPassword = await bcrypt.compare(password, user.password);
//             if (!checkPassword) {
//                 res.status(400).json({ error: "Enter correct credentials!!!" })
//             }

//             // Creating a Authentication Token
//             const data = {
//                 user: {
//                     id: user.id
//                 }
//             };

//             const authToken = jwt.sign(data, process.env.JWT_Secret)

//             // Send the AuthToken to the User
//             res.json({ authToken });

//         } catch (error) {
//             // send the error message to the user
//             return res.status(500).json({ error : error.message});
//         }
//     });

// // 3: Get LoggedIn user details using POST : /api/auth/getuser
// router.post('/getuser', fetchuser, async (req, res) => {
//     try {
//         userId = req.user.id;
//         const user = await User.findById(userId)
//         res.send(user)
//     } catch (error) {
//         return res.status(500).json({ error: "Some Internal Error Occured!!!" });
//     }
// });


// module.exports = router