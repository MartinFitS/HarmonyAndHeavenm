//PROVEEDORES - PROVEEDORES - PROVEEDORES
import connection from "../bd/bdConfig";

export const addProveedor = async (req, res) => {
  try {
      const data = req.body;
      console.log(data);

      connection.query('INSERT INTO suppliers SET ?', data, (err, result) => {
          if (err) {
              console.error(err);
              return res.status(500).send("Error al guardar el proveedor en la base de datos");
          }

          if (req.session.userRole === "master") {
              res.redirect("/proveedores");
          } else {
              res.redirect("/proveedores");
              console.log('Proveedor agregado correctamente');
          }
      });

  } catch (e) {
      console.error(e);
      res.status(500).send("Error en el servidor");
  }
}


export const allProveedores = async (req, res) => {
  connection.query('SELECT * FROM suppliers', (err, proveedores) => {
      if (err) {
          res.json(err);
      } else {
          res.render("masterProveedorView.hbs", { proveedores });
      }
  });
};

  export const proveedorAdd = async(req,res) =>{
    res.render("addProveedor.hbs")
}

async function obtenerProveedorPorId(proveedorID){
  return new Promise((resolve,reject) =>{
    const sql = 'SELECT * FROM suppliers WHERE id = ?';

    connection.query(sql, [proveedorID], (err, result)=>{
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

export const renderEditProveedor = async (req, res) => {
  const proveedorID = req.params.id; 

  const proveedor = await obtenerProveedorPorId(proveedorID);

  console.log(proveedor);
  res.render("editProveedorRender.hbs", { proveedor });
};


export const editProveedor = async (req, res) => {
  try {
      const proveedorID = req.params.id;
      const proveedor = req.body;
      const sql = 'UPDATE suppliers SET nombreProveedor = ?, correo = ?, telefono = ? WHERE id= ?';
      
      connection.query(
          sql,
          [proveedor.nombreProveedor, proveedor.correo, proveedor.telefono, proveedorID],
          (err, result) => {
              if (err) {
                  console.error('Error al actualizar el proveedor: ' + err.message);
                  res.status(500).json({ error: 'No se pudo actualizar el proveedor' } + [proveedorID]);
              } else {
                  if (req.session.userRole === "master") {
                      res.redirect("/proveedores");
                  } else {
                      res.redirect("/proveedores");
                  } 
              }
          }
      );
  } catch (e) {
      console.error("error", e);
  }
}

export const deleteProveedor = async(req,res)=>{
  const {id} = req.params; // Obtener el ID del proveedor desde la URL

  const sql = 'DELETE FROM suppliers WHERE id = ?'; // Consulta SQL para eliminar el producto por su ID

  await connection.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error al eliminar el proveedor:', err);
      res.status(500).json({ error: 'Error al eliminar el proveedor' });
    } else {
      if (result.affectedRows === 0) {
        // Si no se encontró ningún registro para eliminar
        res.status(404).json({ error: 'Proveedor no encontrado' });
      } else {
        if (req.session.userRole === "master") {
          res.redirect("/proveedores");
        } else {
          res.redirect("/proveedores");
          console.log('Proveedor eliminado correctamente');
        }
      }
    }
  });
}