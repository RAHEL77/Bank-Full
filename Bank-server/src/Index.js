const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const mongoose  =require("mongoose")
require("dotenv").config();
const app = express();


app.use(cors());
const usersRouter=require("./routes/users.router")
// atlas adress
const dbPath=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_SIFRE}@cluster0.uxlqe.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//to atlas
mongoose.connect(dbPath, {useNewUrlParser:true}).then(()=>console.log("db connected")).catch(err=>console.log(err))
//app routes
app.use("/users", usersRouter);
app.listen(process.env.SERVER_PORT);




// ***Transferring
// -Can transfer money from one user to another with cash(can
//  transfer money until the cash and credit run out. Your cash can
//  be in minus up to the credit limit)

// ***Show details of user
// -Can fetch all details of a particular user
// -Show details of all users
// -Can fetch all details of all the users

// -Use cases:
// 1. Cannot add duplicate users
// 2. When fetching users, make sure they exist.
// 3. Any other use cases?(hint: there are!)
// If the use cases are not sufficient send an appropriate error
//    message to the client.

// • Save all data to a json file.
// • Create express end points that handle the logic
// • Test your work with postman

// Hero:
// Filter the users
// 1. Can fetch users by amount of cash they have.
// 2. Think of something else to filter.
// Ninja:
// Add a new field for a user: IsActive
// IsActive determines if the account is active or not.
// 1. If the user is not active, you cannot do anything with that
// user.
// 2. Fetch the users that are active and have a specified amount
// of cash.

