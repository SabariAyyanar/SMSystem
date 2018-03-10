var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var shell = require('shelljs');
var path = require('path');
var nodemailer = require('nodemailer');
var MailData = require('../Models/maildata');
var SchoolInfo = require('../Models/schoolinfo');
var EmailInfo = require('../Models/emailinfo');
var SMSInfo = require('../Models/smsinfo');

var fileDirectorypath ='./WrittenData';
var schoolbaseFolder =  fileDirectorypath + "/schoolbaseFolder";
var emailinfobaseFolder = fileDirectorypath + "/emailinfobaseFolder";
var smsinfobaseFolder = fileDirectorypath + "/smsinfobaseFolder";


    //SCHOOL INFO 
            //BEGIN

router.get('/schooldata',function(req,res,next){
    var schoolinfo = new SchoolInfo();
        for(var key in schoolinfo){
            schoolinfo[key] = ReadData(schoolbaseFolder,key)
        }
        res.json(schoolinfo);
})

router.post('/schooldata',function(req,res,next){
    var schoolinfo = new SchoolInfo(req.body.params.schoolname,req.body.params.email
                                    ,req.body.params.password,req.body.params.location
                                    ,req.body.params.address,req.body.params.contactnumber)
    if(!schoolinfo){
        status= 400;
        res.json({
            "error": "Bad Data"
        })
    }
    else{
        for(var key in schoolinfo){
           WriteData(schoolbaseFolder,key,schoolinfo[key])
        }
        res.json("successfully updated");
    }
})


//END
//EMAIL Info 
        //BEGIN

router.get('/emailinfo',function(req,res,next){
    var emailinfo = new EmailInfo();
        for(var key in emailinfo){
            emailinfo[key] = ReadData(emailinfobaseFolder,key)
        }
        res.json(emailinfo);
})

router.post('/emailinfo',function(req,res,next){
    var emailinfo = new EmailInfo(req.body.params.deactivated,req.body.params.studentemplateregistration
                                    ,req.body.params.employeeemplateregistration,
                                    req.body.params.studentemplatefee
                                    ,req.body.params.employeeemplatepayroll)
    if(!emailinfo){
        status= 400;
        res.json({
            "error": "Bad Data"
        })
    }
    else{
        for(var key in emailinfo){
           WriteData(emailinfobaseFolder,key,emailinfo[key])
        }
        res.json("successfully updated");
    }
})
        //END
//SMS INFO
    //BEGIN
router.get('/smsinfo',function(req,res,next){
    var smsinfo = new SMSInfo();
        for(var ke in smsinfo){
            smsinfo[ke] = ReadData(smsinfobaseFolder,ke)
        }
        res.json(smsinfo);
})

router.post('/smsinfo',function(req,res,next){
    var smsinfo = new SMSInfo(req.body.params.deactivated,req.body.params.studenttemplateregistration
                                    ,req.body.params.employeetemplateregistration,req.body.params.studenttemplatefee
                                    ,req.body.params.employeetemplatepayroll)
    if(!smsinfo){
        status= 400;
        res.json({
            "error": "Bad Data"
        })
    }
    else{
        for(var key in smsinfo){
           WriteData(smsinfobaseFolder,key,smsinfo[key])
        }
        res.json("successfully updated");
    }
})
    //END



function WriteData(basefolder,filename,filedata){   
        if(!fs.existsSync(basefolder)){
            shell.mkdir("-p",basefolder);
        }
       var readme=  fs.writeFileSync(basefolder + "/" + filename + ".txt",filedata);
       return("Data written successfully");
}

function ReadData(basefolder,filename){   
    var fileDirectorypath = basefolder +  '/' + filename + '.txt';
    if(!fs.existsSync(fileDirectorypath)){
        shell.mkdir("-p",basefolder);
        fs.writeFileSync(fileDirectorypath,"");
        return("");
    }
    else{
   var readme=  fs.readFileSync(fileDirectorypath,'utf8');
   return(readme);
    }
}

module.exports = router;