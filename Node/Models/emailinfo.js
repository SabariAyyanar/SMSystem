var method = EmailInfo.prototype;
var deactivated = "";
var studentemplateregistration= "";
var employeeemplateregistration= "";
var studentemplatefee= "";
var employeeemplatepayroll= "";

function EmailInfo(_deactivated,_studentemplateregistration,_employeetemplateregistration
    ,_studentemplatefee,_employeetemplatepayroll){
    this.deactivated = _deactivated;
    this.studentemplateregistration = _studentemplateregistration;
    this.employeeemplateregistration = _employeetemplateregistration;
    this.studentemplatefee = _studentemplatefee;
    this.employeeemplatepayroll = _employeetemplatepayroll;
}

module.exports = EmailInfo;