import connection from "../bd/bdConfig";

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


export const renderPuntoDeVenta = (req,res) => {
    connection.query('SELECT * FROM products WHERE unidades >= 1', (err, products)=>{
        if(err){
             res.json(err)
        }
        res.render("puntoDeVentaIndex.hbs", {products: products})
    })
}

function generateRandomHash() {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

export const ventaPuntoVenta = (req,res) => {
    let total = req.body.total;
    const selectedProducts = req.body.selectedProducts;
    const hashVenta = generateRandomHash();
    const fecha_actual = new Date();

    const dia = fecha_actual.getDate();
    const mes = fecha_actual.getMonth();
    const ano = fecha_actual.getFullYear();

    console.log(req.body)
    console.log(hashVenta)

    for (const productId in selectedProducts) {
        if (selectedProducts.hasOwnProperty(productId)) {
            const unitsToSubtract = selectedProducts[productId].unidades;

            const updateQuery = `UPDATE products SET unidades = unidades - ? WHERE id = ?`;

            connection.query(updateQuery, [unitsToSubtract, productId], (error, results) => {
                if (error) {
                    console.error(`Error al actualizar la base de datos para el producto con ID ${productId}:`, error);
                } else {
                    
                    console.log(`Unidades restadas con éxito para el producto con ID ${productId}`);
                }
            })
        }
    }

    connection.query('INSERT INTO venta (id_venta, totalVenta, dia,mes,año) VALUES (?, ?, ?, ?, ?)', [hashVenta, total, dia, mes,ano], (error, results, fields) => {
      if (error) {
          console.error('Error al insertar datos:', error);
          throw error;
      }
      console.log('Datos insertados con éxito:', results);

    
    })
  }

export const ventasRender = (req,res) => {
  const pageSize = 10; // muestra las ventas 
  const page = req.query.page || 1; // Página actual obtenida de la consulta

  const offset = (page - 1) * pageSize; //para calcular el desplazamiento
//consulta todo en ventas con un limite(LIMIT = pageSize) y donde comenzar(OFFSET=offset)
  connection.query('SELECT * FROM venta LIMIT ? OFFSET ?', [pageSize, offset], (err, ventas) => {
    if(err){
      console.log(err);
    }else{
      connection.query('SELECT COUNT(*) AS count FROM venta', (err, countResult) => {
        if (err) {
          console.log(err);
        } else {
      const totalCount = countResult[0].count; //Obtiene el total de registros con la consulta sql
      const totalPages = Math.ceil(totalCount / pageSize); //calcula el numero de paginas necesarias para mostrar las ventas
      const pages = Array.from({ length: totalPages }, (_, i) => i + 1); //Crea un array con las paginas

      res.render('ventas.hbs', { ventas, totalPages, page, pages });
    }
});
}
});
}
