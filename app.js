const express = require("express");
const hbs = require("express-handlebars");
const upload = require("express-fileupload");
const http = require("http");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
require("dotenv").config();

const app = express();
// eslint-disable-next-line new-cap
const server = http.Server(app);
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(upload());

const sessionStore = new MySQLStore({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD || "",
    database: "kotha",
});

app.use(
    session({
        secret: process.env.SECRET_KEY_BASE,
        resave: false,
        store: sessionStore,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// SOKET.IO
require(path.join(__dirname, "renders/soket"))(server, sessionStore);

const render = require(path.join(__dirname, "renders/index"));

app.use(express.static(path.join(__dirname, "public")));

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
    const reload = require("reload");
    const watch = require("watch");
    require("./db");
    reload(app, {
        port: 0,
    })
        .then((reloadReturned) => {
            // reloadReturned is documented in the returns API in the README
            watch.watchTree(__dirname, function(f, curr, prev) {
                // Fire server-side reload event
                reloadReturned.reload();
            });
            // Reload started, start web server
            server.listen(port, () =>
                console.log("server listening on port: " + port)
            );
        })
        .catch((err) =>
            console.error(
                "Reload could not start, could not start server/sample app",
                err
            )
        );
} else {
    server.listen(port, () => console.log("server listening on port: " + port));
}
