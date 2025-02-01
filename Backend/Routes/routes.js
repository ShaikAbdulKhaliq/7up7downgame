
const express=require("express")
const router=express.Router()
const {RollDice,checkResults,UpdatePoints}=require("../controllers/controller")

router.post("/roll_dice",RollDice)
router.post("/check_result",checkResults)
router.post("/update_points",UpdatePoints)

module.exports=router