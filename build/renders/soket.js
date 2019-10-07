"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const socket_io_1 = __importDefault(require("socket.io"));
const passport_socketio_1 = __importDefault(require("passport.socketio"));
const db_1 = require("../db");
exports.webSoket = (server, sessionStore) => {
    const io = socket_io_1.default(server);
    // io.use();
    io.use(passport_socketio_1.default.authorize({
        key: "connect.sid",
        secret: process.env.SECRET_KEY_BASE,
        store: sessionStore,
        passport: passport_1.default,
    }));
    io.on("connection", (socket) => {
        console.log("conected");
        if (socket.request.user) {
            console.log(socket.request.user);
        }
        socket.on("chat message", (msg) => {
            console.log("message: " + msg);
            const user = socket.request.user;
            const conversationId = 1;
            if (user) {
                const sql = `INSERT INTO messeges (
                    messege_text, conversetion_id)
                    VALUES (?, ?)`;
                db_1.connection.query(sql, [msg, conversationId], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // const id = result.insertId;
                    }
                });
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
