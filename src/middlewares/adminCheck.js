export const adminCheck = (req,res) => {
    if (req.user.name_role === "admin"){
        next();
    }else{
        res.status(403).send("Por favor Ingrese con una cuenta con permisos de administrador!")
    }
} 