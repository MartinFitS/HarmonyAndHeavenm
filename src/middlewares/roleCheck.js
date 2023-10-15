export const roleCheck = (role) => (req,res,next) => {
    if(req.session.loggedIn && req.session.userRole === role){
        next()
    }else{
        console.log("Necesitas permisos de admin")
        res.redirect("/")
    }

} 
