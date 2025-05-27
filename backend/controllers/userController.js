const express = require('express');
const SignUPModel = require('../model/signup');
const UserModel = require('../model/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/sign-up', async (req, res) => {
   try {
        let user = req.body;
        const isAlreadyExist = await SignUPModel.findOne({ username: user?.username })
        if (isAlreadyExist) return res.status(401).send("User already exist")
        const createdUser = await SignUPModel.create(user)
        res.json(createdUser)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

router.post('/sign-in', async (req, res) => {
    try {
        const user = req.body;
        const userExist = await SignUPModel.findOne({ username: user?.username })
        console.log(userExist);
        if (!userExist) return res.status(401).send("User not found")
        if (userExist?.password !== user?.password) res.status(401).send("Invalid password")

        const token = await jwt.sign({ user: userExist }, 'auth');
        res.json({
            user: userExist,
            token
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;