import connection from "../bd/bdConfig";

export const addProduct = async(req,res) => {
    try{
        const data = req.body;
        await connection.query('INSERT INTO products set ?', [data], (err, product) =>{
            console.log(product);
            res.redirect("/login/user/admin/view/")
        })

    }catch(e){
        console.err(e)
    }
}

export const succesCreateProduct = async (req,res) => {
  res.render("succesProduct.hbs")
}

export const allProducts = async(req,res) => {
    connection.query('SELECT * FROM products', (err, products)=>{
        if(err){
             res.json(err)
        }
        console.log(products)
    })
}

export const renderProducts = async(req,res) =>{
        res.render("addProduct.hbs")
}

export const renderEditProduct = async(req,res) => {
  res.send("Hola")
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
          res.redirect("/login/user/admin/view/")
          console.log('Producto eliminado correctamente');
        }
      }
    });
}
