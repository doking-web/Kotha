// eslint-disable-next-line new-cap
import { Router } from "express";
import bcrypt from "bcryptjs";
import { connection as db } from "../db"
import mysql, { queryCallback, MysqlError } from "mysql";
import { router as user } from "./user"
import { authuser } from "../helpers"
import passport from "passport"


export const router = Router()
const saltRounds = 10;
const pass = "s0heo88D";

interface User {
    name: string,
    username: string,
    email: string,
    password: string
}


/**
 * ADD user to DATABASE
 * @param {JSON} param0 user thats contents Name Username E-mail and Password
 * @param {function} callback function
 */
function addUser({name, username , email, password}: User, callback: Function) {
    password += pass;
    const sql = `INSERT INTO users (
        full_name, user_name, email, password)
        VALUES (?,?,?,?)`;
    bcrypt.hash(password, saltRounds, function(_err, hash) {
        db.query(sql,
            [name, username, email, hash],
            callback as queryCallback);
    });
}


router.use("/user"/*, authuser()*/, user)



router.post("/addconversetions", (req: any, res: any)=>{
    const user = req.body.user;
    req.user = 1
    const sql = `INSERT INTO conversetion (
        user1_id, user2_id)
        VALUES (?,?)`;
    db.query(sql,[req.user, user], (err: any,result: any)=>{
        if(err) res.json(err)
        res.json(result)
    })
})



// Home page
router.get("/", authuser(), (req: any, res) => {
    res.render("home", {title: "Home"});
});

router.get("/io", authuser(), (_req, res)=> res.render("io"));


router.get("/register",
    (req: any, res) => res.render("register",
        {title: "Register", error: req.error}));

router.post("/register", (req: any, res) => {
    let {name, username, email, password} = req.body;
    name = name.trim();
    username = username.trim();
    email = email.trim();
    password = password.trim();

    const passRegExp =
     /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,25})(?=.*[!@#\$%\^&])/;
    const emailRegExp =
     /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~\-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    if (name.length === 0 ||
    !passRegExp.test(password) ||
    !emailRegExp.test(email)) {
        req.error = ["Some thing not right."];
        console.log("err 68")
        return res.render("register", {title: "Register", error: req.error || undefined});
    }


    addUser({name, username, email, password}, (err: MysqlError, result: any) => {
        if (err) {
            console.log(err);
            console.log("err 76")

            return res.render("register", {title: "Register"});
        }
        req.login({id: result.insertId}, (err: MysqlError) => {
            if (err) {
                console.error(err);
                console.log("err 85")

                return res.render("register",
                    {title: "Register", error: req.error});
            }
            return res.redirect("/");
        });
    });
});


router.get("/logout", function(req:any, res) {
    req.logout();
    req.session.destroy(function(_err: any) {
        res.redirect("/");
    });
});


router.get("/login", (req, res) => {
    res.render("login", {title: "Login"});
});


router.post("/login", (req:any, res: any) => {
    const error = "Your username or password not valid";

    if(!req.body || !req.body.username || !req.body.username) return res.render("login", {title: "Login", error});

    const loginData = req.body;
    console.log(req.body)
    const username: string = loginData.username.trim();
    let password: string = loginData.password.trim();

    const passRegExp =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,25})(?=.*[!@#\$%\^&])/;

    if (username.length < 3 ||
       !passRegExp.test(password)) {
        req.error = ["Some thing not right."];
        return res.render("login", {title: "Register", error: req.error});
    }


    const query = "SELECT _id, password FROM users WHERE user_name = ? ";

    password += pass;

    db.query(query, [username], (_err, result)=>{
        // console.log({err, result});


        if (!result || result.length === 0) {
            return res.render("login", {title: "Login", error});
        }


        const hash = result[0].password.toString();
        bcrypt.compare(password, hash, function(_err, match) {
            // console.log({match, _err});
            if (match) {
                req.login({id: result[0]._id}, (err: MysqlError) => {
                    if (err) {
                        console.log(err);
                        return res.render("login", {title: "Login", error});
                    }
                    return res.redirect("/");
                });
            } else {
                return res.render("login", {title: "Login", error});
            }
        });
    });
});


passport.serializeUser(function(user: any, done: Function) {
    // console.log(user);
    done(null, user.id);
});

passport.deserializeUser(function(id: any, done: Function) {
    done(null, id);
});

