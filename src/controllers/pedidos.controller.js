import connection from "../bd/bdConfig";
import PDFDocument from 'pdfkit'; 

//PDFDocument

export const allPedidos = async (req, res) => {
  try {
    const orders = await queryDatabase(`SELECT * FROM orders`);
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


export const editPedido = async (req, res) => {
  try {
    const numSerie = req.body.numSerie;
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

  const proveedores = await queryDatabase('select distinct nombreProveedor from suppliers');
  const productos = await queryDatabase('SELECT DISTINCT modelo, nombreProveedor FROM products JOIN suppliers ON products.marca = suppliers.nombreProveedor');
  const users = await queryDatabase(`SELECT id, username FROM users WHERE name_role = 'master' OR name_role = 'admin'`);
  res.render("addPedido.hbs", {productos, users,proveedores });

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

export const anadirUnidades = async (req, res) => {
  try {
    const numSerie = req.body.numSerie; 
    const unidades = parseInt(req.body.unidades, 10);
    const modelo = req.body.modelo;
    const estado = req.body.estado; 
    const sql = 'UPDATE products SET unidades = unidades + ? WHERE modelo = ?';

    if (estado === "Entregado") {

      connection.query(
        sql,
        [unidades, modelo],
        (err, result) => {
          if (err) {
            console.error('Error al añadir las unidades al producto: ' + err.message);
            res.status(500).json({ error: 'No se pudo añadir unidades al producto ' + numSerie });
          } else {
            if (req.session.userRole === "master") {
              res.redirect("/pedidos");
            } else {
              res.redirect("/pedidos");
            } 
          }
        }
      );
    } else {
      const intento = "Estas intentando añadir unidades a un producto que no ha sido entregado";
      const error = "No se pueden añadir al inventario productos que no hayan sido entregados"
      res.render("alertasError.hbs", {error, intento});
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



export const facturaPedido = async (req, res) => {
  const {numSerie} = req.params; 
  const order = await obtenerPedidoPorId(numSerie);

    const doc = new PDFDocument({ bufferPages: true });
    const filename = `informe_${numSerie}.pdf`;
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

    doc.image('src/public/img/001-agregar.png', {
      fit: [50, 30],
      align: 'right',
      valign: 'right'
    });

    doc.font('Helvetica-Bold') 
    doc.fontSize(24) 
    doc.text('Harmony and Heaven', { align: 'center' }); 
    // Añadir la fecha
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);
    doc.font('Helvetica-Oblique') 
    doc.fontSize(12); // Tamaño de fuente para la fecha
    doc.text(`Fecha: ${formattedDate}`, 30,128, {align: 'right'});
    doc.font('Helvetica') 
    doc.fontSize(16); 
    doc.text(`Informe del Pedido ${order.numSerie}`, 30,140);
    doc.fontSize(14); // Tamaño de fuente para el informe
    doc.text(`Pedido realizado por: ${order.username} con el ID: ${order.idUsuario}`, 30, 165);
      // Crear una tabla
      const tableStartY = 190;
      const tableColumnWidth = 250;
      const tableRowHeight = 20;
      
      const drawTableCell = (text, x, y) => {
        doc.text(text, x, y);
      };
      
      const drawTableRow = (row, rowIndex, startY) => {
        const yOffset = startY + rowIndex * tableRowHeight;
        drawTableCell(row[0], 30, yOffset);
        drawTableCell(row[1], 30 + tableColumnWidth, yOffset);
      };
      
      const tableData = [
        ['Número de Serie', order.numSerie],
        ['Estado', order.estado],
        ['Marca', order.nombreProveedor],
        ['Modelo', order.modelo],
        ['Instrumento', order.instrumentoTipo],
        ['Unidades', order.unidades],
        ['Precio del producto', `$${order.precioTienda} pesos`],
        ['Total', `$${order.costoTotal} pesos`],
      ];
      
      tableData.forEach((row, index) => {
        drawTableRow(row, index, tableStartY);
      });
      
      const supplierTableStartY = tableStartY + tableData.length * tableRowHeight + 20;
      
      const tableData2 = [
        ['Información sobre el proveedor', ''],
        ['Proveedor', order.nombreProveedor],
        ['Teléfono', order.telefono],
        ['Correo electrónico', order.correo],
      ];
      
      tableData2.forEach((row, index) => {
        drawTableRow(row, index, supplierTableStartY);
      });
      


  
    // Additional text
    doc.text('Firma del empleado', 30, 650, { align: 'right' });
    doc.moveTo(380, 640).lineTo(550, 640).stroke(); // Los valores (30, 640) y (200, 640) definen los puntos de inicio y final de la línea.
  
    doc.end();
  };  