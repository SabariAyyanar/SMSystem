var method = MailData.prototype;
var email;
var subject;
var message;
function MailData(_email,_subject,_message){
    this.email = _email;
    this.subject = _subject;
    this.message = _message;
}

module.exports = MailData;