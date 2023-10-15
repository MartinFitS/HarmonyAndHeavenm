
export const requireAuth = (req,res,next) => {
    if(req.session.loggedIn){
        next();
    }else{
        res.redirect("/")
    }
}


export const checkRole =(role) => (req,res,next) => {
    console.log(req.user)
    if(req.session.loggedIn && req.user && req.user.name_role === role){
        next();
    }else{
        res.redirect("/")
    }
}
