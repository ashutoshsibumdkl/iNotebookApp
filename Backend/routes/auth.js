const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser');


const JWT_SECRET = 'SecrectKey';

//ROUTE 1: Create a user using: POST "/api/auth/createuser". No login required
router.post("/createuser",[
    body('name','enter a valid name').isLength({ min: 3 }),
    body('email','enter a valid email').isEmail(),
    body('password','password must be atleast 6 characters').isLength({ min: 6 })
], async (req, res) => {
    let success = false;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array()});
    }
    //Check whether the user with same email exists already
    try {
            let user = await User.findOne({email: req.body.email});
            if(user){
                return res.status(400).send({success, err:"Sorry a user with this email already exists"});
            }
            const salt = await bcrypt.genSalt(10);
            let secPassword = await bcrypt.hash(req.body.password,salt);
            //create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            })
            const data = {
                user:{
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            console.log(authToken);
      
    //some comment lines are available on lower part of the page
            //res.json(user);
            success = true;
            res.send({success, authToken});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("some Error occured");

        }
})


//ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required

router.post("/login",[
    body('email','enter a valid email').isEmail(),
    body('password','password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({success,authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Occured");
    }
})

//ROUTE 3: Get loggedin user details using: POST "/api/auth/getuser". login required
router.post("/getuser",fetchuser, async(req,res) =>{
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Occured");
}
})

module.exports = router;



//   .then(user => res.json(user))
    //   .catch(err => {console.log(err)
    // res.json({error: 'please enter a unique value for email',message: err.message})});
    // res.send(req.body);