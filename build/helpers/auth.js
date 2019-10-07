"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authuser = () => {
    return (req, res, next) => {
        if (req.isAuthenticated())
            return next();
        return res.redirect('/login');
    };
};
