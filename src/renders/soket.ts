import passport from "passport";
import socket from "socket.io";
import passportSocketIo from "passport.socketio";
import { Store } from "express-session"
import { Server } from "http"
import MySQLStore from "express-mysql-session"
import { connection as db } from "../db";

export const webSoket = (server: Server, sessionStore: Store) => {
    const io = socket(server);
    // io.use();


    io.use(passportSocketIo.authorize({
        key: "connect.sid",
        secret: process.env.SECRET_KEY_BASE,
        store: sessionStore ,
        passport: passport,
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

                db.query(sql, [msg, conversationId], (err, result)=>{
                    if ( err ) {
                        console.log(err);
                    } else {
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


