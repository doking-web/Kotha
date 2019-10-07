"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const soket_1 = require("./renders/soket");
dotenv_1.default.config();
const app = express_1.default();
const __PROJECT_DIR = path_1.default.join(__dirname, "../");
// eslint-disable-next-line new-cap
const server = new http_1.default.Server(app);
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const sessionStore = new express_mysql_session_1.default({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD || "",
    database: "kotha",
});
const sessionOptions = {
    secret: process.env.SECRET_KEY_BASE || "Hello World",
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
};
app.use(express_session_1.default(sessionOptions));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// SOKET.IO
soket_1.webSoket(server, sessionStore);
const render = require(path_1.default.join(__dirname, "renders/index"));
app.use(express_1.default.static(path_1.default.join(__PROJECT_DIR, "public")));
console.log(process.env.DB_PASSWORD);
/*
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
            watch.watchTree(__PROJECT_DIR, function(f, curr, prev) {
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
*/ 
