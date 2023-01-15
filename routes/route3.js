const express = require('express'); 
const router = express.Router(); 
const servProfile=require('../service/profile');

router.use(express.json());

//get whole profile data
router.get("/getSolvedProblemsDetails",async(req,res,next)=>{
    console.log("rest2 i");
    let dt=await servProfile.getSolvedProblemsDetails();
    res.send(dt);   
});

module.exports=router;