import express from "express";
import hbs from "express-handlebars";
import http from "http";
import path from "path";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import passport from "passport";
import dotenv from "dotenv"
import { webSoket } from "./renders/soket"
// DEVELOPMENT
import "./extra-module/modules"
import reload from "reload"
import watch from "watch"


dotenv.config()

const app = express();
const __PROJECT_DIR = path.join(__dirname, "../");


// eslint-disable-next-line new-cap
const server = new http.Server(app);
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({extended: false}));


const sessionStore: session.BaseMemoryStore = new MySQLStore({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD || "",
    database: "kotha",
});


const sessionOptions = {
    secret: process.env.SECRET_KEY_BASE || "Hello World",
    resave: false,
    store: sessionStore  as session.Store,
    saveUninitialized: false,
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

// SOKET.IO
webSoket(server, sessionStore as session.Store);


const render = require(path.join(__dirname, "renders/index"));
app.use(express.static(path.join(__PROJECT_DIR, "public")));
console.log(process.env.DB_PASSWORD)

app.engine(
    "hbs",
    hbs({
        defaultLayout: "main",
        extname: "hbs",
    })
);

app.set("view engine", "hbs");

app.use("/", render);

if (process.env.DEVELOPMENT) {

    // require("./db");
    reload(app, {
        port: 0
    })
        .then((reloadReturned: any) => {
            // reloadReturned is documented in the returns API in the README
            watch.watchTree(__PROJECT_DIR, () => reloadReturned.reload());
            // Reload started, start web server
            server.listen(port, () =>
                console.log("server listening on port: " + port)
            );
        })
        .catch((err: Error) =>
            console.error(
                "Reload could not start, could not start server/sample app",
                err
            )
        );
} else {
    server.listen(port, () => console.log("server listening on port: " + port));
}
