export const multipleRoleCheck =(req,res,next) => {
    if(req.session.loggedIn && (req.session.userRole === "admin" || req.session.userRole === "master")){
        next()
    }else{
        console.log("Necesitas permisos de admin")
        res.redirect("/")
    }
} 

export const multipleRoleCheckVendedor =(req,res,next) => {
    if(req.session.loggedIn && (req.session.userRole === "admin" || req.session.userRole === "master" || req.session.userRole === "vendedor")){
        next()
    }else{
        console.log("Necesitas permisos de admin")
        res.redirect("/")
    }
} 