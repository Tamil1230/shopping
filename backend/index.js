const express = require('express')
const { default: mongoose } = require('mongoose')
const mongoose = require(mongoose)
const app = express();
app.use(express.json())
app.listen(5000, () => {
    console.log("SERVER STARTED")
})