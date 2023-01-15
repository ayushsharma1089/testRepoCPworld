let getAllDataModel= require('../model/profile');

let servProfile={};

servProfile.getSolvedProblemsDetails = async()=>{
        console.log("yaha tak aayaga");
        let dt=await getAllDataModel.getSolvedProblemsDetails();
        console.log(dt," u");
        return dt;
}

module.exports= servProfile;