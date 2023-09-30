
export const requireAuth = (req,res,next) => {
    if(req.session.loggedIn){
        next();
    }else{
        res.redirect("/")
    }
}
