const mongoose = require("mongoose");


const categorytagSchema = new mongoose.Schema({

    typecategory: {
        type:Object ,
        require :  false 
    },
    name: {
        type: String ,
        require : true 

    }





});


module.exports = mongoose.model("CategoryTag", categorytagSchema);
