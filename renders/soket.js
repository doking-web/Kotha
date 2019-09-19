const passport = require("passport");
const socket = require("socket.io");
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');



module.exports = (server, sessionStore) => {
    const io = socket(server)
    //io.use();
    io.use(passportSocketIo.authorize({
      key: 'connect.sid',
      secret: process.env.SECRET_KEY_BASE || 'keyboard cat',
      store: sessionStore,
      passport: passport,
      cookieParser: cookieParser
    }));
    
    io.on("connection", socket => {
        console.log("conected")
        if (socket.request.user) {
            console.log(socket.request.user);
        }
        
        
        
        socket.on('chat message', msg => {
            console.log('message: ' + msg)
            if (socket.request.user) {
                console.log(socket.request.user);
            }
        })
    
    
    
        socket.on('disconnect', () => {
            console.log('user disconnected')
            if (socket.request.user) {
                console.log(socket.request.user);
            }
        })
    })
    
    
    

}