var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var shell = require('shelljs');
var path = require('path');
var nodemailer = require('nodemailer');
var MailData = require('../Models/maildata');
var SchoolInfo = require('../Models/schoolinfo');
var client = require('twilio')('ACf81f3c57ad78771cbd57c84b04761c7f','c2f2275a9e5006183de32a965b44acf4');


router.get('/test',function(req,res,next){
    
    res.send("Application Is Currently Running");
})

router.post('/writeError',function(req,res,next){
   
    var task = req.body.message;
    if(!task){
        status= 400;
        res.json({
            "error": "Bad Data"
        })
    }
        else{
   res.json(LogError(task));
        }
})

router.post('/writeData',function(req,res,next){
    var task = req.body.message;
    if(!task){
        status= 400;
        res.json({
            "error": "Bad Data"
        })
    }
        else{
        res.json(WriteData(task));
        }
})

router.get('/readData',function(req,res,next){
    
    res.json(ReadData("data"));
})

router.get('/sendSMS',function(req,res,next){
    
    res.json(SendSMS());
})

router.post('/sendMail',function(req,res,next){
    var schooldata = new SchoolInfo("","","","","","");
    var n=0;
    for(var key in schooldata){
        schooldata[n] = ReadData(key);
        n++;
    }
    if(!req.body){
        status= 400;
        res.json({
            "error": "Bad Data"
        })
    }
    

    var maildata = new MailData(req.body.email,req.body.subject,req.body.message);
    if(!maildata){
        status= 400;
        res.json({
            "error": "Bad Data"
        })
       }
        else{
            console.log("succes");            
        res.json(SendMail(maildata,schooldata));
        }
})


router.post('/sendMailToSelf',function(req,res,next){
    if(!req.body){
        status= 400;
        res.json({
            "error": "Bad Data"
        })
    }
    

    var maildata = new MailData(req.body.emaill,req.body.subject,req.body.message);
    if(!maildata){
        status= 400;
        res.json({
            "error": "Bad Data"
        })
       }
        else{          
        res.json(SendMailToSelf(maildata,req.body.selfemail));
        }
})



function SendMail(maildata,schooldata){  
    
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure:false,
        port:25,
        auth: {
            user: schooldata[1],
            pass: schooldata[2]
        },
        tls:{
            rejectUnauthorized:false
        }
    })

    let HelperOptions = {
        from: schooldata[0] + '<' + schooldata[1] + '>',
        to: maildata.email,
        subject: maildata.subject,
        text: maildata.message
    };

    transporter.sendMail(HelperOptions,(error,info)=>{
        if(error){
            LogError(error);
            return("error sending mail");
        }
        else{
            return(info);
        }
    });
}


function SendMailToSelf(maildata,selfemail){  
    
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure:false,
        port:25,
        auth: {
            user: 'emmanuelansah247@gmail.com',
            pass: 'P@$#$w854erd_2'
        },
        tls:{
            rejectUnauthorized:false
        }
    })

    let HelperOptions = {
        from: maildata.email + '<' + maildata.email + '>',
        to: selfemail,
        subject: maildata.subject,
        text: maildata.message
    };

    transporter.sendMail(HelperOptions,(error,info)=>{
        if(error){
            LogError(error);
            return("error sending mail");
        }
        else{
            return(info);
        }
    });
}


function SendSMS(){
    console.log("some");
    client.messages.create({
        to:'+233571683961',
        from:'+19386666612',
        body: 'hello Quofi Ansah'
    },(err,data)=>{
        return(err + data);
    })
}


function LogError(task){
        var date = new Date(),
        locale = "en-us",
        month = date.toLocaleDateString(locale,{month: "long"}),
        fileDirectorypath ='./Exceptions/' + date.getFullYear().toString()+ "/" + month.toString() + "/" + date.getDate().toString();
        if(!fs.existsSync(fileDirectorypath)){
            shell.mkdir("-p",fileDirectorypath);
        }
       var readme=  fs.writeFileSync(fileDirectorypath + "/" + date.getHours().toString() + "_" + date.getMinutes().toString() + "_" + date.getSeconds().toString() + ".txt",JSON.stringify(task));
       return("Data written successfully");
}


function WriteData(task){   
        fileDirectorypath ='./WrittenData';
        if(!fs.existsSync(fileDirectorypath)){
            shell.mkdir("-p",fileDirectorypath);
        }
       var readme=  fs.writeFileSync(fileDirectorypath + "/data.txt",task);
       return("Data written successfully");
}

function ReadData(filename){
    var fileDirectorypath = './WrittenData/' + 'schoolbaseFolder/' + filename + '.txt';
    var fileDirectorybase = './WrittenData/' + "schoolbaseFolder/";
    if(!fs.existsSync(fileDirectorybase)){
        shell.mkdir("-p",fileDirectorybase);
        return("");
    }
    else{
    var readme=  fs.readFileSync(fileDirectorypath,'utf8');
    return(readme);
    }
}

module.exports = router;