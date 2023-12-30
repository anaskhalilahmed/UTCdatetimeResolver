/* Basically this project is small but helpful, when we want to get the date on server in UTC form 
from the frontend, so that thing is easily be done on local production environment with just use of a 
Date() constructor object but does not work in the deployed production environment like on vercel, the server 
does not convert the local date time into utc  by its own, like local production does, so here we defined 
a way of getting local date time from the frontend into the UTC form without the use of any other methods 
like first getting a timezoneoffset value then doing a minus plus like we did on the project 
D:/projects deployed/ElectionVotingSystem
*/


var express=require("express");
var app=express();
 
// express.json() is a middleware function that parses JSON payload, if any, in the incoming API requests
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",function(req,res){
    res.status(200).sendFile(__dirname+"/public"+"/home.html");
});

/* Getting a UTC date from the frontend and used inside a date contructor for making it ready for applying 
methods properties etc.*/
app.post("/utcdatetime_resolver",function(req,res){
    /* we already got a utc date time from the frontend but used in constructor for using the date methods and
    properties*/
    var srvr_utcdatetime=new Date(req.body.frntend_utc);
    console.log("the local date coming from front-end then converting into"+ 
    "utc then on server is "+srvr_utcdatetime);
    res.status(200).json({"serverutcdatetime":""+srvr_utcdatetime+""});
    /* now outputs when console on browser with date 29-12-2023 with time 07:00PM is
    Fri Dec 29 2023 19:00:00 GMT+0500 (Pakistan Standard Time)
    and when console on server is
    2023-12-29T14:00:00.000Z
    */
});

app.listen(process.env.PORT||3000);