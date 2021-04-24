const express = require("express");
const userController= require("../controllers/users.controller")
const router = express.Router();

router.get("/",userController.getUsers);
router.post("/",userController.postUsers);
router.get("/:id",userController.getUser)
router.put("/:id/credit",userController.updateCredit)
router.put("/:id/deposit",userController.deposit)
router.put("/:id/withdraw",userController.Withdraw)

module.exports = router;
