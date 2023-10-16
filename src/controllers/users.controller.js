import connection from "../bd/bdConfig";
import bcrypt from "bcrypt"
import {ADMINROLEPASSWORD, VENDEDORROLEPASSWORD,MASTER} from "../config"

export const renderLogin = async(req,res) => {
    res.render("index.hbs")
}

export const loginUser = async(req,res) => {
    const { username, password } = req.body;

    await connection.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al iniciar sesión' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }
  
     const user = results[0];
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        req.session.loggedIn = true;
        req.session.userId = user.id;
        req.session.userRole = user.name_role;
        console.log("UsuarioActual: ", user.name_role)
        if (user.name_role === "invitado") {

          return res.redirect("/login/user/invitado/view/");
        } else if (user.name_role === "admin") {

          return res.redirect("/login/user/admin/view/");
        } else if (user.name_role === "master") {

          return res.redirect("/login/user/master/view/");
        }
      } else {
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

export const masterView = async(req,res)=>{
    connection.query('SELECT * FROM products', (err, products)=>{
        if(err){
             res.json(err)
        }
        res.render("masterPrincipalView.hbs", {products: products})
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
        req.session.destroy((err)=>{
            if(err){
                console.log("Hay un error perrito!")
            }
            res.redirect('/')
        })
}

export const renderRegister = async(req,res) => {
    res.render("register.hbs")
}

export const registerUser = async(req,res) => {
    try{
        const {username, password,roles} = req.body;
        console.log(roles)
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
        }else if(await bcrypt.compare(MASTER, hashedRoles)){
            await connection.query('INSERT INTO users set ?', { username: username, password: hashedPassword, roles:hashedRoles, name_role: "master"}, (err, user)=>{
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

export const registerFromRoot = async(req,res) => {
    try{
        const {username, password,rol} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);


    if(rol == "admin"){
        await connection.query('INSERT INTO users set ?', { username: username, password: hashedPassword, roles:"admin", name_role: "admin"}, (err, user)=>{
            console.log("se creó",user)
            res.redirect("/master/user/gestionar")
        })
    }else if(rol == "vendedor"){
        await connection.query('INSERT INTO users set ?', { username: username, password: hashedPassword, roles:"vendedor", name_role: "vendedor"}, (err, user)=>{
            console.log("se creó",user)
            res.redirect("/master/user/gestionar")
        })
    }else{
            await connection.query('INSERT INTO users set ?', { username: username, password: hashedPassword, roles:"invitado", name_role: "invitado"}, (err, user)=>{
                console.log("se creó", user)
                res.redirect("/master/user/gestionar")
            })
        
    }
    }catch(e){
        console.error(e)
    }
}

export const gestionarUsuarios = async(req,res) => {
    connection.query('SELECT * FROM users WHERE name_role <> \'master\'', (err, users) => {
        if (err) {
            res.json(err);
        }
        res.render("gestionarUsuarios.hbs", { user: users });
        console.log(users);
    });
}

async function obtenerUserById(userId){
    return new Promise((resolve,reject) =>{

      const sql = 'SELECT * FROM users WHERE id = ?';
  
      connection.query(sql, [userId], (err, result)=>{
        if(err){
          reject(err);
        }else{
          if(result.length > 0){
            resolve(result[0]);
          }else{
            resolve(null)
          }
        }
      })
    })
  }

export const editUser = async(req,res) => {
    const {id} = req.params;

    const user = await obtenerUserById(id);

    res.render("editUserFromMaster.hbs", {user})
}

export const editUserToDatabase = async(req,res) => {
    try{
        const userId = req.params.id;
        const user = req.body
        const sql = 'UPDATE users SET roles = ?, name_role = ? WHERE id = ?';
        
        connection.query(
          sql,
          [user.name_role,user.name_role, userId],(err,result) => {
            if (err) {
              console.error('Error al actualizar el producto: ' + err.message);
              res.status(500).json({ error: 'No se pudo actualizar el usuario' });
            } else {
              if(req.session.userRole === "master"){
                res.redirect("/master/user/gestionar")
              }else{
                res.redirect("/login/user/admin/view/")
              } 
            }
          }
        )
    }catch(e){
        console.error(e)
    }

}

export const deleteUser = async(req,res)=>{
    const {id} = req.params;
    
    const sql = 'DELETE FROM users WHERE id = ?'; 

    await connection.query(sql, id, (err, result) => {
        if (err) {
          console.error('Error al eliminar el producto:', err);
          res.status(500).json({ error: 'Error al eliminar el producto' });
        } else {
          if (result.affectedRows === 0) {
            // Si no se encontró ningún registro para eliminar
            res.status(404).json({ error: 'Producto no encontrado' });
          } else {
            res.redirect("/master/user/gestionar")
            console.log('Producto eliminado correctamente');
          }
        }
      });
}