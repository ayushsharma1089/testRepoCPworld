const {Schema} = require("mongoose")
const mongoose = require("mongoose")

const allContestsSchema = Schema({
    name: {type:String},
    platform: {type:String},
    startDate: {type:String},
    endDate: {type:String}
})

const userSchema = Schema({
    uname: {type:String},
    pwd: {type:String}
})

const allDiscussionsSchema = Schema({
    questionId: {type:String},
    title: {type:String},
    question: {type:String},
    userId: {type:String},
    queryDate: {type:String},
    upVotes: {type:Number},
    downVotes: {type:Number},
    views: {type:Number},
    comments: [ {
             answer:{type:String} , likes:{type:Number} , 
             dislikes:{type:Number} , isVerified:{type:String},
             userIdAnswered:{type:String}, answerId:{type:String}
            } ]

})


let collection={};

const e="mongodb://localhost:27017/contests";

let connectionOptions={
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}

//map with allContestsDatabase
collection.getContestModel = async()=>{
    try{
        let db=await mongoose.connect(e,connectionOptions);
        let aM=await db.model('allContests',allContestsSchema);
        return aM;
    }
    catch(error){
        let err=new Error('Cannot connect with database');
        err.status=500;
        throw err;
    }
}

//map with allDiscussionsDatabase
collection.getDiscussModel = async()=>{
    try{
        let db=await mongoose.connect(e,connectionOptions);
        let aM=await db.model('allDiscussions',allDiscussionsSchema);
        return aM;
    }
    catch(error){
        let err=new Error('Cannot connect with database');
        err.status=500;
        throw err;
    }
}

collection.getLoginModel = async()=>{
    try{
        let db=await mongoose.connect(e,connectionOptions);
        let aM=await db.model('login',userSchema);
        return aM;
    }
    catch(error){
        let err=new Error('Cannot connect with database');
        err.status=500;
        throw err;
    }
}


module.exports=collection;