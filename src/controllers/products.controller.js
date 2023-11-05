import connection from "../bd/bdConfig";

export const addProduct = async(req,res) => {
    try{
        const data = req.body;
        await connection.query('INSERT INTO products set ?', [data], (err, product) =>{
            if(req.session.userRole === "master"){
              res.redirect("/login/user/master/view/")
            }else{
              res.redirect("/login/user/admin/view/")
              console.log('Producto eliminado correctamente');
            }
        })

    }catch(e){
        console.err(e)
    }
}

export const allProducts = async(req,res) => {
    connection.query('SELECT * FROM products', (err, products)=>{
        if(err){
             res.json(err)
        }

    })
}

export const renderProducts = async(req,res) =>{
        res.render("addProduct.hbs")
}

async function obtenerProductoPorId(productId){
  return new Promise((resolve,reject) =>{
    console.log(productId)
    const sql = 'SELECT * FROM products WHERE id = ?';

    connection.query(sql, [productId], (err, result)=>{
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

export const renderEditProduct = async(req,res) => {
  const productId = req.params.id;

  const product = await obtenerProductoPorId(productId);

  const marcas = ['Yamaha', 'Fender', 'Takamine', 'Marshall', 'Gibson', 'Casio'];
  const marcaSeleccionada = marcas.find((marca) => marca === product.marca);


  res.render("editProductRender.hbs", {product,marcaSeleccionada})
  
}

export const editProduct = async(req,res) =>{
  try{
    const productId = req.params.id;
    const product = req.body
    const sql = 'UPDATE products SET modelo = ?, marca = ?, instrumentoTipo = ?, precioPublico = ?, precioTienda = ?, unidades = ?, foto = ? WHERE id = ?';
    
    connection.query(
      sql,
      [product.modelo, product.marca, product.instrumentoTipo, product.precioPublico, product.precioTienda, product.unidades,product.foto, productId],(err,result) => {
        if (err) {
          console.error('Error al actualizar el producto: ' + err.message);
          res.status(500).json({ error: 'No se pudo actualizar el producto' });
        } else {
          if(req.session.userRole === "master"){
            res.redirect("/login/user/master/view/")
          }else{
            res.redirect("/login/user/admin/view/")
          } 
        }
      }
    )
  }catch(e){
    console.error("error", e)
  }
}

export const deleteProduct = async(req,res)=>{
    const {id} = req.params;

    const sql = 'DELETE FROM products WHERE id = ?'; // Consulta SQL para eliminar el producto por su ID

    await connection.query(sql, id, (err, result) => {
      if (err) {
        console.error('Error al eliminar el producto:', err);
        res.status(500).json({ error: 'Error al eliminar el producto' });
      } else {
        if (result.affectedRows === 0) {
          // Si no se encontró ningún registro para eliminar
          res.status(404).json({ error: 'Producto no encontrado' });
        } else {

          if(req.session.userRole === "master"){
            res.redirect("/login/user/master/view/")
          }else{
            res.redirect("/login/user/admin/view/")
            console.log('Producto eliminado correctamente');
          }

        }
      }
    });
}
