import connection from "../bd/bdConfig";
import bcrypt from "bcrypt"
import {ADMINROLEPASSWORD, VENDEDORROLEPASSWORD} from "../config"

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
        console.log(user)
        if(passwordMatch && user.name_role == "invitado"){
            req.session.loggedIn = true;
            req.session.userId = user.id;
            
            return res.redirect("/login/user/invitado/view/");
        }else if(passwordMatch && user.name_role == "admin"){
            req.session.loggedIn = true;
            req.session.userId = user.id;
            req.user = username;
            return res.redirect("/login/user/admin/view/")
        }else {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
    })
}

export const invitadoView = async(req,res)=>{
    
    connection.query('SELECT * FROM products', (err, products)=>{
        if(err){
             res.json(err)
        }
        res.render("invitadoPrincipalView.hbs", {products: products})
        console.log(products)
    })
}

export const adminView = async(req,res)=>{
    connection.query('SELECT * FROM products', (err, products)=>{
        if(err){
             res.json(err)
        }
        res.render("adminPrincipalView.hbs", {products: products})
        console.log(products)
    })
}

export const logoutUser = async (req,res) =>{
    await req.session.destroy((err)=>{
        try{
            res.redirect('/')
        }catch(e){
            console.log("Hay un error perrito!" , e)
        }
        
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