const mongoose = require("mongoose")

const NgoSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    img1:{
        type:String,
        required:true,
        unique:true
    },
    img2:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    website:{
        type:String,
        unique:true
    },
    

});

module.exports = mongoose.model("NGO", NgoSchema)