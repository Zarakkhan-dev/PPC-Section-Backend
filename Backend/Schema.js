const mongoose = require("mongoose");

const Schema  = new mongoose.Schema({

    username:String,
    email:String,
    password:String,
    token:String

})

const model = mongoose.model("UserData",Schema);

module.exports = model ;