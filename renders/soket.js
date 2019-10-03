const passport = require("passport");
const socket = require("socket.io");
const passportSocketIo = require("passport.socketio");
const cookieParser = require("cookie-parser");
const db = require("../db");


module.exports = (server, sessionStore) => {
    const io = socket(server);
    // io.use();
    io.use(passportSocketIo.authorize({
        key: "connect.sid",
        secret: process.env.SECRET_KEY_BASE,
        store: sessionStore,
        passport: passport,
        cookieParser: cookieParser,
    }));

    io.on("connection", (socket) => {
        console.log("conected");
        if (socket.request.user) {
            console.log(socket.request.user);
        }


        socket.on("chat message", (msg) => {
            console.log("message: " + msg);
            const user = socket.request.user;

            if (user) {
                const sql = `INSERT INTO messeges (
                    messege_text)
                    VALUES (?)`;

                const id = db.query(sql, msg);

                console.log({id});
            }
        });


        socket.on("disconnect", () => {
            console.log("user disconnected");
            if (socket.request.user) {
                console.log(socket.request.user);
            }
        });
    });
};
