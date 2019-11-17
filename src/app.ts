// Declare require function
declare function require(moduleName: string): any;
// Get the envament variables
require("dotenv").config()

// Imports
import express from "express"; // Request hander framwork
import hbs from "express-handlebars"; // View engine
import http from "http"; // HTTP for server
import path from "path"; // For files or directory path joining
import session from "express-session"; // For session
import MySQLStore from "express-mysql-session"; // Session store
import passport from "passport"; // For Authentication
import { webSoket } from "./renders/soket" // For WebSoket
import { router as render } from "./renders" // For Routs

// Setup new express app
const app = express();
// Get the root directory for this project
const __PROJECT_DIR = path.join(__dirname, "../");

// eslint-disable-next-line new-cap
const server = new http.Server(app);
// Get the ableble port for server
const port = process.env.PORT;


// Setup express Body parser
app.use(express.json()); // Body parser for json
app.use(express.urlencoded({ extended: false })); // Nested object post

// Setup setion options
const sessionStore: session.BaseMemoryStore = new MySQLStore({
    host: "localhost",
    port: 3306,
    user: "kotha",
    password: process.env.DB_PASSWORD || "",
    database: "kotha",
});

// Session options
const sessionOptions = {
    secret: process.env.SECRET_KEY_BASE || "Hello World",
    resave: false,
    store: sessionStore as session.Store,
    saveUninitialized: false,
}

// Setup express session
app.use(session(sessionOptions));

// Setup auth by passport
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Setup passport session

// SOKET.IO
webSoket(server, sessionStore as session.Store); // Soket.io with server and setion store

app.use(express.static(path.join(__PROJECT_DIR, "public"))); // Static files

// Setup Handelbars as hbs
app.engine("hbs", hbs({
    defaultLayout: "main",
    extname: "hbs", // File extentions are .hbs
}));

// Defult engine as Handelbars
app.set("view engine", "hbs");

app.use(render); // Handel Routs

// Devlopment Hot reload
if (process.env.DEVELOPMENT) {
    const reload = require("reload")
    const watch = require("watch")
    reload(app)
        .then((reloadReturned: any) => {
            // reloadReturned is documented in the returns API in the README
            watch.watchTree(path.join(__PROJECT_DIR, "public"), () => reloadReturned.reload());
            // Reload started, start web server
            server.listen(port, () =>
                console.log("server listening on port: " + port)
            );
        })
        .catch((err: Error) => console.error("Reload could not start", err));
}
// Listent the server on port
else server.listen(port, () => console.log("server listening on port: " + port));

