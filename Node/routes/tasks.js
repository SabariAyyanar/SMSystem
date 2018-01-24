var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var shell = require('shelljs');
var path = require('path');
var nodemailer = require('nodemailer');
var MailData = require('../Models/maildata');
var SchoolInfo = require('../Models/schoolinfo');


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

router.post('/sendMail',function(req,res,next){
    var schooldata = new SchoolInfo("","","");
    for(var key in schooldata){
        schooldata[key] = ReadData(key);
    }
    var maildata = new MailData(req.body.params.email,req.body.params.subject,req.body.params.message);
    if(!maildata){
        status= 400;
        res.json({
            "error": "Bad Data"
        })
       }
        else{
        res.json(SendMail(maildata,schooldata));
        }
})

function SendMail(maildata,schooldata){        
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure:false,
        port:25,
        auth: {
            user: schooldata.email,
            pass: schooldata.password
        },
        tls:{
            rejectUnauthorized:false
        }
    })

    let HelperOptions = {
        from: schooldata.name + '<' + schooldata.email + '>',
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
    var fileDirectorypath = './WrittenData/' + filename + '.txt';
    if(!fs.existsSync(fileDirectorypath)){
        shell.mkdir("-p",fileDirectorypath);
        return("");
    }
    else{
    var readme=  fs.readFileSync(fileDirectorypath,'utf8');
    return(readme);
    }
}

module.exports = router;