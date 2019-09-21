const express = require("express");
const hbs = require("express-handlebars");
const upload = require("express-fileupload");
const http = require("http");
const path = require("path");
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);
const passport = require("passport");
//const validator = require("express-validator")

//const db = require("./db");

/**
 Devlopment
*/
const reload = require('reload');
const watch = require('watch');




// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload());


const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'users',
};

const sessionStore = new MySQLStore(options);


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  //cookie: { secure: true }
}));


app.use(passport.initialize());
app.use(passport.session());

/**
 *  soket.io
 * */
require(path.join(__dirname,"renders/soket"))(server, sessionStore);


const render = require(path.join(__dirname, "renders/index"));
const api = require(path.join(__dirname, "renders/api"));

app.use(express.static(path.join(__dirname, "public")));

app.engine("hbs", hbs({
    defaultLayout: "main",
    extname: "hbs"
}));
app.set("view engine", "hbs");

app.use("/", render);
//app.use("/api", api);

//server.listen(port, ()=>console.log("server runing..."))



/**
 * Devlopment
 * */
reload(app).then(reloadReturned =>{
  // reloadReturned is documented in the returns API in the README
  watch.watchTree(__dirname, function (f, curr, prev) {
    // Fire server-side reload event
    reloadReturned.reload();
  });
  // Reload started, start web server
  server.listen(port, () =>
    console.log('server listening on port: ' + port)
  );
}).catch(err =>
  console.error('Reload could not start, could not start server/sample app', err)
);



