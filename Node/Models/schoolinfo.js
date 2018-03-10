var method = SchoolInfo.prototype;

var schoolname= "";
var email= "";
var password= "";
var location = "";
var address= "";
var contactnumber= "";

function SchoolInfo(_schoolname,_email,_password,_location,_address,_contactnumber){
    this.schoolname = _schoolname;
    this.email = _email;
    this.password = _password;
    this.location = _location;
    this.address = _address;
    this.contactnumber = _contactnumber;
}

module.exports = SchoolInfo;