

export const authuser = () =>{
    return (req: any, res: any, next: Function)=>{
        if(req.isAuthenticated())
            return next();
        return res.redirect('/login');
    };
};





