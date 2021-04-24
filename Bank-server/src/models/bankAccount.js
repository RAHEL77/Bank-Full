const mongoose = require("mongoose");
//const validator = require('validator');

const bankAccountSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true,
      },
    cash: {
        type: Number,
        required: true,
        default:0
        
      },
      credit: {
        type: Number,
        required: true,
        default:0

      },
    })
   module.exports=mongoose.model("bankAccount",bankAccountSchema)