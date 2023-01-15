const express = require('express'); 
const routing = express.Router(); 
const serv=require('../service/contests');
const jwt = require('jsonwebtoken');

routing.use(express.json());

//get list of All contests
routing.get("/getAllContests",async(req,res,next)=>{
    let contests=await serv.getAllContests();
    res.send(contests);    
});

//get list of All discussions
routing.get("/getDiscuss",async(req,res,next)=>{
    let discussions=await serv.getDiscuss();
    res.send(discussions);    
});

routing.post("/register",async(req,res,next)=>{
        console.log("HITT -IN POST ",req.body.uname," ",req.body.pwd);
    let discussions=await serv.getr(req.body.uname,req.body.pwd);
    res.json({user:discussions});
});
routing.post("/login",async(req,res,next)=>{
    console.log("logged  ",req.body.uname,req.body.pwd);
    let discussions=await serv.getl(req.body.uname,req.body.pwd);
    if(discussions){
    const token = jwt.sign(
        {
          name: req.body.uname
        },
        "abc123"
      );
      res.header("auth-token", token).json({
        error: null,
        data: {
          token,
        },
      });
    }
    else{
        res.header("auth-token" ).json({
            error: 1,
            data:"You are Not Registered With Us",
          });
    }
});

//increase Votes
routing.get("/increaseVotes/:questionId/:answerId",async(req,res,next)=>{
    let  increaseVotes=await serv.increaseVotes(req.params.questionId,req.params.answerId);
    res.send(true);    
});

//increase Votes
routing.get("/decreaseVotes/:questionId/:answerId",async(req,res,next)=>{
    let  decreaseVotes=await serv.decreaseVotes(req.params.questionId,req.params.answerId);
    res.send(true);    
});

//post new Comment
routing.get("/postComment/:questionId/:newCommentText",async(req,res,next)=>{
    let  postComment=await serv.postComment(req.params.questionId,req.params.newCommentText);
    res.send(true);    
});

//post new Question
routing.get("/postQuestion/:newCommentText/:newCommentTitle",async(req,res,next)=>{
    console.log(req.params.newCommentText," = ",req.params.newCommentTitle);
    let  postQuestion=await serv.postQuestion(req.params.newCommentText,req.params.newCommentTitle);
    res.send(true);    
});

//increase total views on a post 
routing.get("/viewsIncrease/:questionId",async(req,res,next)=>{
    console.log('inc hit');
    let  viewsIncrease=await serv.viewsIncrease(req.params.questionId);
    res.send(true);    
});
//increase upVotes on a post 
routing.get("/upVotes/:questionId",async(req,res,next)=>{
    let  upVotes=await serv.upVotes(req.params.questionId);
    res.send(true);    
});
//increase downVotes on a post 
routing.get("/downVotes/:questionId",async(req,res,next)=>{
    let  downVotes=await serv.downVotes(req.params.questionId);
    res.send(true);    
});


module.exports=routing;