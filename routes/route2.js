const express = require('express'); 
const router = express.Router(); 

router.use(express.json());

//get list of All contests
router.get("/",async(req,res,next)=>{
    console.log("rest");
   res.send("aya");   
});
router.get("/rest",async(req,res,next)=>{
    console.log("rest2");
   res.send("aya2");   
});

module.exports=router;