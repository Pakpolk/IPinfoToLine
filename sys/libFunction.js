const { response } = require('express');


function GetDateTime(){
    // install module before : =>   npm install date-and-time --save
    const date = require('date-and-time')
    const now  =  new Date();
    const value = date.format(now,'YYYY/MM/DD HH:mm:ss');

return value;
}

function SendLine(text){
    const request = require('request');
    const dotenv = require('dotenv');
    dotenv.config();
    const url_line_notification = "https://notify-api.line.me/api/notify";
    request({
        method: 'POST',
        uri: url_line_notification,
        header: {
            'Content-Type': 'multipart/form-data',
        },
        auth: {
            bearer: process.env.TOKENline,
        },
        form: {
            message: text
        },
    }, (err, httpResponse, body) => {
        if (err) {
            console.log(err)
        } else {
            //console.log(body)
        }
    });
return text;
}

function GetIPv6(req){
    // install module before : =>  npm install request-ip --save
    const requestIp = require('request-ip');
    var clientIp = requestIp.getClientIp(req)
return clientIp;
}

function GetIP(){
    // install module before : =>  npm install ip --save
    const IP = require('ip');
    const ipAddress = IP.address();
return ipAddress;
}

async function GetIPinfo(){
    const request = await fetch("https://ipinfo.io/json?token="+process.env.TOKENip)
    const jsonResponse = await request.json()

return jsonResponse.ip;
}


async function GetDetail(){
    const request = await fetch("https://ipinfo.io/json?token="+process.env.TOKENip)
    //const jsonResponse = await request.json()
    //const url = await fetch("https://ipinfo.io/"+jsonResponse.ip+"?token="+process.env.TOKENip)
    const result = await request.json()
    let txt = 'IP(info) :'+ result.ip +  '\r\n'
    + "City : " + result.city + '\r\n'
    + "region : " + result.region + '\r\n'
    + "country : " + result.country + '\r\n'
    + "Latitude, Longitude : " + result.loc + '\r\n'
    + "org : " + result.org + '\r\n'
    + "postal : " + result.postal + '\r\n'
    + "timezone : " + result.timezone + '\r\n'
    + "Google Map (IpInfo) : https://www.google.com/maps/?q=" + result.loc

return txt;
}

module.exports = { GetDateTime, SendLine,GetIPinfo,GetIPv6,GetDetail,GetIP };