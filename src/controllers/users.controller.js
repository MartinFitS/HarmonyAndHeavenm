import connection from "../bd/bdConfig";
import bcrypt from "bcrypt"
import {ADMINROLEPASSWORD, VENDEDORROLEPASSWORD} from "../config"
import session from "express-session";
export const renderLogin = async(req,res) => {
    res.render("index.hbs")
}

export const loginUser = async(req,res) => {
    const {username, password} = req.body;

    await connection.query('SELECT * FROM users WHERE username = ?', [username], async(err, results)=>{
        if(err){
            console.err(err);
            return res.status(500).json({error: 'Error al iniciar sesión'})
        }

        if(results.length === 0){
            return res.status(401).json({error: 'Ususario no encontrado'})
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password)
        
        if(passwordMatch){
            req.session.loggedIn = true;
            req.session.userId = user.id;
            return res.status(200).json({ message: 'Inicio de sesión exitoso' });
        }else {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
    })
}

export function authenticate(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    res.status(401).json({
        error: 'no autenticado'
    })
}

export const renderRegister = async(req,res) => {
    res.render("register.hbs")
}

export const registerUser = async(req,res) => {
    try{
        const {username, password,roles} = req.body;

        const hashedPassword = await bcrypt.hash(password ,10)

        const hashedRoles = await bcrypt.hash(roles, 10)

        if(await bcrypt.compare(ADMINROLEPASSWORD, hashedRoles)){
            await connection.query('INSERT INTO users set ?', { username: username, password: hashedPassword, roles:hashedRoles, name_role: "admin"}, (err, user)=>{
                console.log(user)
                res.render('index.hbs')
            })
        }else if(await bcrypt.compare(VENDEDORROLEPASSWORD, hashedRoles)){
            await connection.query('INSERT INTO users set ?', { username: username, password: hashedPassword, roles:hashedRoles, name_role: "vendedor"}, (err, user)=>{
                console.log(user)
                res.render('index.hbs')
            })
        }else{
            await connection.query('INSERT INTO users set ?', { username: username, password: hashedPassword, roles:hashedRoles, name_role: "invitado"}, (err, user)=>{
                console.log(user)
                res.render('index.hbs')
            })
        }
    }catch(e){
        console.err(e)
    }
}