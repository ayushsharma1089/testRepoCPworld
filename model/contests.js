let connection=require('../utilities/connection');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require('node-fetch');
const bcrypt = require("bcryptjs");

let modelObj={};

//fetch All the contest from database
modelObj.getAllContests = async()=>{
    try{
        var url="https://kontests.net/api/v1/all";
        var obj=await fetch(url)
                      .then(res => res.json())
                      .then(json =>{return json});
        return obj;
    }
    catch(error){
        let err= new Error("No data Found");
        err.status=404;
        throw err;
    }
}

modelObj.getDiscuss = async()=>{
    try{
       let discussionModel=await connection.getDiscussModel();
        // let discussArray =await discussionModel.create
        // ({questionId:"440",title:"Demo filequestion sample question Demo filequestion sample question Demo filequestion sample question",
        // question:"Demo filequestion sample question",
        // userId:"testUser1",queryDate:"10-06-21",upVotes:374,downVotes:156,views:8534,
        // comments:[{answer:" 1 sample ans",likes:40,dislikes:8,isVerified:"Trre",
        // userIdAnswered:"answerUser1",answerId:"ANS45" }]});
    //    console.log("My  =     ",discussArray);

       let discussArray =await discussionModel.find({});
       if(discussArray.length>0) return discussArray; 
    }
    catch(error){
        console.log(error," --<<");
        let err= new Error("No data Found");
        err.status=404;
        throw err;
    }
}

modelObj.increaseVotes = async(questionId,answerId)=>{
    try{
       let discussionModel=await connection.getDiscussModel();
       let discussArray =await discussionModel.updateOne({questionId:questionId,'comments.answerId':answerId},
                                                         {$inc:{'comments.$.likes':1}});                                                         
        console.log(" in  ",discussArray.nModified," ",questionId," ",answerId);
       if(discussArray.nModified>0) return true; 
    }
    catch(error){
        let err= new Error("No data Found");
        err.status=404;
        throw err;
    }
}
modelObj.decreaseVotes = async(questionId,answerId)=>{
    try{
       let discussionModel=await connection.getDiscussModel();
       let discussArray =await discussionModel.updateOne({questionId:questionId,'comments.answerId':answerId},
                                                         {$inc:{'comments.$.dislikes':1}});                                                         
         console.log(" in  ",discussArray.nModified," ",questionId," ",answerId);
       if(discussArray.nModified>0) return true; 
    }
    catch(error){
        let err= new Error("No data Found");
        err.status=404;
        throw err;
    }
}

modelObj.postComment = async(questionId,newCommentText)=>{
    try{
        console.log(" answer posted  ",newCommentText," ",questionId);
       let newCommentObjectToPush = {"answer": newCommentText, "likes": 0, "dislikes": 0,
                                    "isVerified": "false","userIdAnswered": "answerUser8",
                                    "answerId": "ANS70"};

       let discussionModel=await connection.getDiscussModel();
       let discussArray =await discussionModel.updateMany({questionId:questionId},
                                                         {$push:{'comments':newCommentObjectToPush}});                                                         
         console.log(" in  ",discussArray.nModified," ",questionId);
       if(discussArray.nModified>0) return true; 
    }
    catch(error){
        console.log(error," ==> ");
        let err= new Error("No data Found");
        err.status=404;
        throw err;
    }
}
modelObj.postQuestion = async(newCommentText,newCommentTitle)=>{
    try{

       let newQuestionObjectToPush = {questionId:"700",title:newCommentTitle,
                                     question:newCommentText,userId:"testUserAddQue",
                                     queryDate:"10-06-21",upVotes:0,downVotes:0,views:0,
                                    };

       let discussionModel=await connection.getDiscussModel();
       let discussArray =await discussionModel.create(newQuestionObjectToPush);
       console.log(" NEW que ",discussArray," : ",newQuestionObjectToPush);
       if(discussArray.nModified>0) return true; 
    }
    catch(error){
        console.log(error," ==> ");
        let err= new Error("No data Found");
        err.status=404;
        throw err;
    }
}
modelObj.viewsIncrease = async(questionId)=>{
    try{
        console.log('inc hit',questionId);
       let discussionModel=await connection.getDiscussModel();
       let discussArray =await discussionModel.updateMany({questionId:questionId},
                                                         {$inc:{'views':1}});                                                         
         console.log(" views Inc  ",discussArray.nModified," ",questionId);
       if(discussArray.nModified>0) return true; 
    }
    catch(error){
        console.log(error," ==> ");
        let err= new Error("No data Found");
        err.status=404;
        throw err;
    }
}
modelObj.upVotes = async(questionId)=>{
    try{
       let discussionModel=await connection.getDiscussModel();
       let discussArray =await discussionModel.updateMany({questionId:questionId},
                                                         {$inc:{'upVotes':1}});                                                         
         console.log(" up[]  ",discussArray.nModified," ",questionId);
       if(discussArray.nModified>0) return true; 
    }
    catch(error){
        console.log(error," ==> ");
        let err= new Error("No data Found");
        err.status=404;
        throw err;
    }
}
modelObj.downVotes = async(questionId)=>{
    try{
       let discussionModel=await connection.getDiscussModel();
       let discussArray =await discussionModel.updateMany({questionId:questionId},
                                                         {$inc:{'downVotes':1}});                                                         
         console.log(" Inc  ",discussArray.nModified," ",questionId);
       if(discussArray.nModified>0) return true; 
    }
    catch(error){
        console.log(error," ==> ");
        let err= new Error("No data Found");
        err.status=404;
        throw err;
    }
}

modelObj.getl = async(uname,pwd)=>{
    try{
        let discussionModel=await connection.getLoginModel();
        let discussArray =await discussionModel.findOne({uname:uname}); 
        if(!discussArray) return false; //user not found
        const validPassword =  await bcrypt.compare(pwd, discussArray.pwd);
        return validPassword; 
     }
     catch(error){
         console.log(error," ==> ");
         let err= new Error("No data Found");
         err.status=404;
         throw err;
     }
}
modelObj.getr = async(uname,pwd)=>{
    try{
        let discussionModel=await connection.getLoginModel();
        let discussArray =await discussionModel.create({uname:uname,pwd:pwd});                                                         
          console.log(" register  ",discussArray," ",uname," ",pwd);
        return true; 
     }
     catch(error){
         console.log(error," ==> ");
         let err= new Error("No data Found");
         err.status=404;
         throw err;
     }
}



module.exports= modelObj;