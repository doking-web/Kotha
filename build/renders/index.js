"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line new-cap
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../db");
const router = express_1.Router();
const saltRounds = 10;
const pass = "s0heo88D";
const passport = require("passport");
const { authuser } = require("../helpers");
/**
 * ADD user to DATABASE
 * @param {JSON} param0 user thats contents Name Username E-mail and Password
 * @param {function} callback function
 */
function addUser({ name, username, email, password }, callback) {
    password += pass;
    const sql = `INSERT INTO users (
        full_name, user_name, email, password)
        VALUES (?,?,?,?)`;
    bcryptjs_1.default.hash(password, saltRounds, function (_err, hash) {
        db_1.connection.query(sql, [name, username, email, hash], callback);
    });
}
// Home page
router.get("/", authuser(), (req, res) => {
    console.log(req.user);
    res.render("home", { title: "Home" });
});
router.get("/io", authuser(), (_req, res) => res.render("io"));
router.get("/register", (req, res) => res.render("register", { title: "Register", error: req.error }));
router.post("/register", (req, res) => {
    let { name, username, email, password } = req.body;
    name = name.trim();
    username = username.trim();
    email = email.trim();
    password = password.trim();
    const passRegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,25})(?=.*[!@#\$%\^&])/;
    const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~\-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (name.length === 0 ||
        !passRegExp.test(password) ||
        !emailRegExp.test(email)) {
        req.error = ["Some thing not right."];
        return res.render("register", { title: "Register", error: req.error || undefined });
    }
    addUser({ name, username, email, password }, (err, result) => {
        if (err) {
            console.log(err);
            return res.render("register", { title: "Register" });
        }
        // console.log(result);
        req.login({ id: result.insertId }, (err) => {
            if (err) {
                console.error(err);
                return res.render("register", { title: "Register", error: req.error });
            }
            return res.redirect("/");
        });
    });
});
router.get("/logout", function (req, res) {
    req.logout();
    req.session.destroy(function (_err) {
        res.redirect("/"); // Inside a callback… bulletproof!
    });
});
router.get("/login", (req, res) => {
    // console.log(req.user);
    res.render("login", { title: "Login" });
});
router.post("/login", (req, res) => {
    const error = "Your username or password not valid";
    if (!req.body)
        return res.render("login", { title: "Login", error });
    const loginData = req.body;
    const username = loginData.username.trim();
    let password = loginData.password.trim();
    const passRegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,25})(?=.*[!@#\$%\^&])/;
    if (username.length < 3 ||
        !passRegExp.test(password)) {
        req.error = ["Some thing not right."];
        return res.render("login", { title: "Register", error: req.error });
    }
    const query = "SELECT _id, password FROM users WHERE user_name = ? ";
    password += pass;
    db_1.connection.query(query, [username], (_err, result) => {
        // console.log({err, result});
        if (!result || result.length === 0) {
            return res.render("login", { title: "Login", error });
        }
        const hash = result[0].password.toString();
        bcryptjs_1.default.compare(password, hash, function (_err, match) {
            // console.log({match, _err});
            if (match) {
                req.login({ id: result[0]._id }, (err) => {
                    if (err) {
                        console.log(err);
                        return res.render("login", { title: "Login", error });
                    }
                    return res.redirect("/");
                });
            }
            else {
                return res.render("login", { title: "Login", error });
            }
        });
    });
});
passport.serializeUser(function (user, done) {
    // console.log(user);
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    done(null, id);
});
module.exports = router;
