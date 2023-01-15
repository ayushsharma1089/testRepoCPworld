let getAllDataModel= require('../model/contests');
const bcrypt = require("bcryptjs");

let serv={};

serv.getr = async(uname,pwd)=>{
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(pwd, salt);
        let contests=await getAllDataModel.getr(uname,password);
        return contests;
}

serv.getl = async(uname,pwd)=>{
        let contests=await getAllDataModel.getl(uname,pwd);
        return contests;
}

serv.getAllContests = async()=>{
        let contests=getAllDataModel.getAllContests();
        return contests;
}

serv.getDiscuss = async()=>{
        let discussions=await getAllDataModel.getDiscuss();
        return discussions;
}

serv.increaseVotes = async(questionId,answerId)=>{
        let increaseVotes=await getAllDataModel.increaseVotes(questionId,answerId);
        return increaseVotes;
}
serv.decreaseVotes = async(questionId,answerId)=>{
        let decreaseVotes=await getAllDataModel.decreaseVotes(questionId,answerId);
        return decreaseVotes;
}
serv.postComment = async(questionId,newCommentText)=>{
        let postComment=await getAllDataModel.postComment(questionId,newCommentText);
        return postComment;
}
serv.postQuestion = async(newCommentText,newCommentTitle)=>{
        let postQuestion=await getAllDataModel.postQuestion(newCommentText,newCommentTitle);
        return postQuestion;
}
serv.viewsIncrease = async(questionId)=>{
        let viewsIncrease=await getAllDataModel.viewsIncrease(questionId);
        return viewsIncrease;
}
serv.upVotes = async(questionId)=>{
        let upVotes=await getAllDataModel.upVotes(questionId);
        return upVotes;
}
serv.downVotes = async(questionId)=>{
        let upVotes=await getAllDataModel.downVotes(questionId);
        return downVotes;
}
module.exports= serv;