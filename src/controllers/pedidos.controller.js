import connection from "../bd/bdConfig";
import PDFDocument from 'pdfkit'; 

export const allPedidos = async (req, res) => {
  try {
    const orders = await queryDatabase(`SELECT * FROM orders WHERE estado <> 'Entregado'`);
    const users = await queryDatabase(`SELECT id, username FROM users WHERE name_role = 'master' OR name_role = 'admin'`);
    const products = await queryDatabase('SELECT modelo, unidades FROM products WHERE unidades <= 5');

    res.render("masterPedidosView.hbs", { users, orders,products });
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


export const addPedido = async (req, res) => {
  try {
    const data = req.body;
    
    // Agregar el estado "pendiente" al pedido
    data.estado = "Pendiente";

    await connection.query('INSERT INTO orders set ?', [data], (err, product, users) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar el pedido' });
      } else {
        if (req.session.userRole === "master") {
          res.redirect("/pedidos");
        } else {
          res.redirect("/pedidos");
          console.log('Pedido agregado correctamente');
        }
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al agregar el pedido' });
  }
}


export const searchPedido = async (numSerie) => {
  try {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM orders WHERE numSerie = ?', [numSerie], (err, pedido) => {
        if (err) {
          reject(err);
        } else {
          resolve(pedido);
        }
      });
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};


export const editPedido = async (req, res) => {
  try {
    console.log(req.body);
    const numSerie = req.body.numSerie;
    const estado = req.body.estado;
    const usuario = req.body.idUsuario;
    const sql = 'UPDATE orders SET idUsuario = ?, estado = ? WHERE numSerie = ?';

    connection.query(sql, [usuario, estado, numSerie], async (err, result) => {
      if (err) {
        console.error('Error al actualizar el pedido: ' + err.message);
        return res.status(500).json({ error: 'No se pudo actualizar el pedido' });
      } else {
        if (req.session.userRole === "master") {
          await sumarUnidades(numSerie, estado);
          return res.redirect("/pedidos");
        } else {
          await sumarUnidades(numSerie, estado);
          return res.redirect("/pedidos");
        }
      }
    });
  } catch (e) {
    console.error("error", e);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};



export const sumarUnidades = async (numSerie, estadoPedido) => {
  try {

    console.log(estadoPedido)
    if (estadoPedido !== 'Entregado') {
      console.log('El pedido no está entregado. No se realizará la actualización de unidades.');
      return;
    }

    const datos = await searchPedido(numSerie);
    const nombreProducto = datos[0].modelo;
    const unidades = datos[0].unidades;

    console.log("modelo: ", nombreProducto);
    console.log("unidades: ", unidades);

    // Realiza la actualización en la base de datos solo si el estado del pedido es "entregado"
    const sqlUpdateProducto = 'UPDATE products SET unidades = unidades + ? WHERE modelo = ? ';
    await connection.query(sqlUpdateProducto, [unidades, nombreProducto, estadoPedido]);

    console.log('Unidades actualizadas con éxito.');
  } catch (e) {
    console.log(e);
  }
};



export const pedidoAdd = async(req,res) =>{
  
  const productos = await queryDatabase('SELECT modelo FROM products');
  const proveedores = await queryDatabase('SELECT nombreProveedor FROM suppliers');
  const users = await queryDatabase(`SELECT id, username FROM users WHERE name_role = 'master' OR name_role = 'admin'`);
  res.render("addPedido.hbs", {productos, proveedores, users});

}

export const deletePedido = async(req,res)=>{
  const {numSerie} = req.params; // Obtener el ID del proveedor desde la URL
  const estados = ['Cancelado', 'Entregado'];
  const sql = 'DELETE FROM orders WHERE numSerie = ? AND estado IN (?)';


  await connection.query(sql, [numSerie,estados], (err, result) => {
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


async function obtenerPedidoPorId(numSerie){
  return new Promise((resolve,reject) =>{
    console.log(numSerie)
    const sql = ' SELECT products.*,orders.*, suppliers.*, users.id, users.username FROM orders LEFT JOIN products ON orders.modelo = products.modelo LEFT JOIN suppliers ON orders.proveedor = suppliers.nombreProveedor LEFT JOIN users ON orders.idUsuario = users.id WHERE orders.numSerie = ?';

    connection.query(sql, [numSerie], (err, result)=>{
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

export const facturaPedido = async (req, res) => {
  const {numSerie} = req.params; 
  const order = await obtenerPedidoPorId(numSerie);

    const doc = new PDFDocument({ bufferPages: true });
    const filename = `factura_${numSerie}.pdf`;
    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-disposition': `attachment; filename=${filename}`,
    });

    doc.on('data', (data) => {
      stream.write(data);
    });

    doc.on('end', () => {
      stream.end();
    });

    doc.font('Helvetica-Bold') 
    doc.fontSize(24) 
    doc.text('Harmony and Heaven', { align: 'center' }); 
    
    // Añadir la fecha
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);
    doc.fontSize(14); // Tamaño de fuente para la fecha
    doc.text(`Fecha: ${formattedDate}`, 30,120, {align: 'right'});
    doc.fontSize(16); // Tamaño de fuente para el informe
    doc.text(`Informe del Pedido ${order.numSerie}`, 30,140,{ align: 'center' });
    doc.text(`Pedido realizado por: ${order.username} con el ID: ${order.idUsuario}`, 30, 175);
    doc.text(`Número de Serie: ${order.numSerie}`, 30, 210);
    doc.text(`Estado: ${order.estado}`, 30, 245);
    doc.text(`Marca: ${order.nombreProveedor}`, 30, 280);
    doc.text(`Modelo: ${order.modelo}`, 30, 315);
    doc.text(`Instrumento: ${order.instrumentoTipo}`, 30, 350);
    doc.text(`Unidades: ${order.unidades}`, 30, 385);
    doc.text(`Costo: $${order.precioTienda} pesos`, 30, 420);
    doc.text(`Total: $${order.costoTotal} pesos`, 30, 455);
    doc.fontSize(18);
    doc.text(`Información sobre el proveedor:`, 30, 490);
    doc.fontSize(16); 
    doc.text(`Proveedor: ${order.nombreProveedor}`, 30, 525);
    doc.text(`Teléfono: ${order.telefono}`, 30, 560);
    doc.text(`Correo electrónico: ${order.correo}`, 30, 595);
    doc.text(`Firma del empleado`, 30, 650, {align: 'right'});
    doc.moveTo(380, 640).lineTo(550, 640).stroke(); // Los valores (30, 640) y (200, 640) definen los puntos de inicio y final de la línea.

    doc.end();
  }
