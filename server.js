const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = (process.env.PORT || 3000);
console.log(port);
var app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine','hbs');


hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
})

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
})

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.path}`;
    console.log(log);
    fs.appendFile("server.log",log+"\n",(err) => {
        if(err) {
            console.log(err);
        }
    })
    next();
})

app.use((req,res,next) => {
    res.render("landerPage.hbs", {
        pageTitle: "Coming Soon"
    })
    
})

app.use(express.static(__dirname+"/public"));

app.get('/', (req,res) => {
    res.render("home.hbs",{
        pageTitle: "Home",
        welcomeMsg: "Welcome to localhost",
        currentYear: new Date().getFullYear()
    })
})

app.get('/about', (req,res) => {
    res.render("about.hbs",{
        pageTitle: "About",
        currentYear: new Date().getFullYear()
    })
})

app.get('/bad', (req,res) => {
    res.send({
        error: {
            code: 400,
            message: "The request cannot be fulfilled"
        }
    })
})

app.listen(port, function() {
    console.log("Server started at port: "+port);
})