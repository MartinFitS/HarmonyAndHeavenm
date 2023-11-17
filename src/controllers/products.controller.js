import connection from "../bd/bdConfig";

export const addProduct = async(req,res) => {
    try{
        const data = req.body;
        await connection.query('INSERT INTO products set ?', [data],(err, product) =>{
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
    connection.query('SELECT modelo,proveedor,instrumentoTipo,precioPublico,unidades FROM products',(err, products)=>{
        if(err){
             res.json(err)
        }
    })
}

function queryDatabase(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  }
)};

export const renderProducts = async (req, res) => {
  try {
    const proveedores = await queryDatabase('SELECT nombreProveedor FROM suppliers');
    res.render('addProduct.hbs', { proveedores });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

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
    const sql = 'UPDATE products SET modelo = ?, precioPublico = ?, precioTienda = ?, unidades = ?, foto = ? WHERE id = ?';
    
    connection.query(
      sql,
      [product.modelo,  product.precioPublico, product.precioTienda, product.unidades,product.foto, productId],(err,result) => {
        if (err) {
          console.error('Error al editar el producto: ' + err.message);
          const intento=('Estas intentando editar un producto');
          const error=('No se pudo actualizar el producto debido a que el proveedor no existe en la base de datos');
          res.render('alertasError.hbs', { error, intento});
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

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Consulta SQL para obtener las unidades del producto antes de eliminarlo
  const getUnitsSQL = 'SELECT unidades FROM products WHERE id = ?';

  // Consulta SQL para eliminar el producto por su ID y con unidades igual a 0
  const deleteProductSQL = 'DELETE FROM products WHERE id = ? AND unidades = 0';

  // Obtener las unidades del producto antes de eliminarlo
  connection.query(getUnitsSQL, id, async (unitsErr, unitsResult) => {
    if (unitsErr) {
      console.error('Error al obtener las unidades del producto: ' + unitsErr.message);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    if (unitsResult.length === 0) {
      // Si no se encontró ningún registro para el ID proporcionado
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    const unidades = unitsResult[0].unidades;

    // Verificar si el producto tiene 0 unidades
    if (unidades === 0) {
      // Si tiene 0 unidades, ejecutar la consulta DELETE
      connection.query(deleteProductSQL, id, (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error('Error al eliminar el producto: ' + deleteErr.message);
          res.status(500).json({ error: 'Error interno del servidor' });
          return;
        }

        if (deleteResult.affectedRows > 0) {
          // Redireccionar según el rol del usuario
          if (req.session.userRole === 'master') {
            res.redirect('/login/user/master/view/');
          } else {
            res.redirect('/login/user/admin/view/');
            console.log('Producto eliminado correctamente');
          }
        } else {
          // Si no se encontró ningún registro para eliminar
          res.status(404).json({ error: 'Producto no encontrado' });
        }
      });
    } else {
      // Si tiene unidades en stock, mostrar un mensaje de error
      const intento = 'Estás intentando eliminar un producto que aún tiene unidades en stock';
      const error = 'No se puede eliminar el producto porque aún hay unidades en stock';
      res.render('alertasError.hbs', { error, intento });
    }
  });
};

