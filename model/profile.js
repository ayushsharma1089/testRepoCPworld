let connection=require('../utilities/connection');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require('node-fetch');

let modelObj={};

//fetch All the contest from database
modelObj.getSolvedProblemsDetails = async()=>{
    try{
        console.log("inside MODD");
        var url="https://competitive-coding-api.herokuapp.com/api/codechef/deva_mahere";
        var obj=await fetch(url)
                      .then(res => res.json())
                      .then(json =>{return json});
        return obj;
    }
    catch(error){
        let err= new Error("No Profile Found");
        err.status=404;
        throw err;
    }
}
module.exports= modelObj;