import connection from "../bd/bdConfig";

export const allPedidos = async (req, res) => {
  try {
    const orders = await queryDatabase(`SELECT * FROM orders`);
    const users = await queryDatabase(`SELECT id, username FROM users`);
    const products = await queryDatabase('SELECT * FROM products');

    // Filtrar los productos con unidades <= 5
    const productosFiltrados = products.filter(producto => producto.unidades <= 5);

    res.render("masterPedidosView.hbs", { users, orders,productosFiltrados });
  } catch (err) {
    res.json(err);
  }
}; 

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



export const addPedido= async(req,res) => {
    try{
        const data = req.body;
       await connection.query('INSERT INTO orders set ?', [data], (err, product) =>{
            if(req.session.userRole === "master"){
              res.redirect("/pedidos")
            }else{
              res.redirect("/pedidos")
              console.log('Pedido eliminado correctamente');
            }
        })

    }catch(e){
        console.err(e)
    }
}


export const editPedido = async (req, res) => {
  try {
    const numSerie = req.body.numSerie; // Usar req.body en lugar de req.params
    const estado = req.body.estado;
    const usuario = req.body.idUsuario;
    const sql = 'UPDATE orders SET idUsuario = ?, estado = ? WHERE numSerie = ?';

    connection.query(sql, [usuario, estado, numSerie], (err, result) => {
      if (err) {
        console.error('Error al actualizar el pedido: ' + err.message);
        return res.status(500).json({ error: 'No se pudo actualizar el pedido' });
      } else {
        if (req.session.userRole === "master") {
          return res.redirect("/pedidos");
        } else {
          return res.redirect("/pedidos");
        }
      }
    });
  } catch (e) {
    console.error("error", e);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export const pedidoAdd = async(req,res) =>{
  
  const productos = await queryDatabase('SELECT * FROM products');
  const proveedores = await queryDatabase('SELECT * FROM suppliers');
  res.render("addPedido.hbs", {productos, proveedores});

}

export const deletePedido = async(req,res)=>{
  const {numSerie} = req.params; // Obtener el ID del proveedor desde la URL

  const sql = 'DELETE FROM orders WHERE numSerie = ?'; // Consulta SQL para eliminar el producto por su ID

  await connection.query(sql, numSerie, (err, result) => {
    if (err) {
      console.error('Error al eliminar el pedido:', err);
      res.status(500).json({ error: 'Error al eliminar el pedido' });
    } else {
      if (result.affectedRows === 0) {
        // Si no se encontró ningún registro para eliminar
        res.status(404).json({ error: 'Pedido no encontrado' });
      } else {
        if (req.session.userRole === "master") {
          res.redirect("/pedidos");
        } else {
          res.redirect("/pedidos");
          console.log('Pedido eliminado correctamente');
        }
      }
    }
  });
}

