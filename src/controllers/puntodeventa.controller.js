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


  export const renderPuntoDeVenta = (req, res) => {
    // Consulta para obtener las ventas totales agrupadas por mes
    const queryVentasPorMes = 'SELECT mes, SUM(totalVenta) AS ventaTotal FROM venta GROUP BY mes';

    connection.query(queryVentasPorMes, (err, ventasPorMes) => {
        if (err) {
            console.error(err);
            res.json(err);
            return;
        }

        // Objeto para almacenar las ventas totales por mes
        const ventasTotalesPorMes = {};

        // Iterar sobre los resultados de la consulta y almacenar en el objeto
        ventasPorMes.forEach(venta => {
            const mes = venta.mes;
            const ventaTotal = venta.ventaTotal;

            // Agregar al objeto con el formato "mesVentaTotal"
            ventasTotalesPorMes[`VentaTotal${mes}`] = ventaTotal;
        });

        // Console.log para verificar las ventas totales por mes
        console.log('Ventas totales por mes:', ventasTotalesPorMes);

        // Consulta para obtener las estadísticas del vendedor en cada mes
        const queryEstadisticasVendedor = 'SELECT mes, vendedor, COUNT(*) AS numeroVentas, SUM(totalVenta) AS totalVentas FROM venta GROUP BY mes, vendedor';

        connection.query(queryEstadisticasVendedor, (err, estadisticasVendedor) => {
            if (err) {
                console.error(err);
                res.json(err);
                return;
            }

            // Objeto para almacenar las estadísticas del vendedor por mes
            const estadisticasVendedorPorMes = {};

            // Iterar sobre los resultados de la consulta y almacenar en el objeto
            estadisticasVendedor.forEach(estadistica => {
                const mes = estadistica.mes;
                const vendedor = estadistica.vendedor;
                const numeroVentas = estadistica.numeroVentas;
                const totalVentas = estadistica.totalVentas;

                // Agregar al objeto con el formato "mesVendedor"
                estadisticasVendedorPorMes[`${mes}${vendedor}`] = { vendedor, numeroVentas, totalVentas };
            });

            // Console.log para verificar las estadísticas del vendedor por mes
            console.log('Estadísticas del vendedor por mes:', estadisticasVendedorPorMes);

            // Realizar la consulta de productos con unidades >= 1
            connection.query('SELECT * FROM products WHERE unidades >= 1', (err, products) => {
                if (err) {
                    console.error(err);
                    res.json(err);
                    return;
                }

                // Console.log para verificar los productos
                console.log('Productos:', products);
                console.log(ventasTotalesPorMes.VentaTotal1)
                // Renderizar la vista y pasar tanto los productos como las ventas totales y estadísticas del vendedor por mes
                res.render("puntoDeVentaIndex.hbs", {
                    products: products,
                    ventasTotalesPorMes: ventasTotalesPorMes,
                    estadisticasVendedorPorMes: estadisticasVendedorPorMes
                });
            });
        });
    });
};



function generateRandomHash() {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

export const findUserById = async (id) => {
  try {
    const query = 'SELECT * FROM users WHERE id = ?';

    // Crea una nueva promesa para envolver la operación de consulta
    return new Promise((resolve, reject) => {
      connection.query(query, id, (err, user) => {
        if (err) {
          reject(err);
        } else {
          // Resuelve la promesa con el resultado de la consulta
          resolve(user);
        }
      });
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};



export const ventaPuntoVenta = async(req,res) => {
    const user = await findUserById(req.session.userId);
    let total = req.body.total;
    const selectedProducts = req.body.selectedProducts;
    const hashVenta = generateRandomHash();
    const fecha_actual = new Date();

    const dia = fecha_actual.getDate();
    const mes = fecha_actual.getMonth() + 1;
    const ano = fecha_actual.getFullYear();

    const horas = fecha_actual.getHours();
    const minutos = fecha_actual.getMinutes();
    const segundos = fecha_actual.getSeconds();
    const horaFormateada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    const vendedor = user[0].username;

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

    connection.query('INSERT INTO venta (id_venta, totalVenta, dia,mes,año,hora,vendedor) VALUES (?, ?, ?, ?, ?, ?,?)', [hashVenta, total, dia, mes,ano,horaFormateada,vendedor], (error, results, fields) => {
      if (error) {
          console.error('Error al insertar datos:', error);
          throw error;
      }
      console.log('Datos insertados con éxito:', results);

    
    })
  }

  export const apiVentas = (req, res) => {

      const pagina = req.query.page || 1;
      const resultadosPorPagina = 10;
      const inicio = (pagina - 1) * resultadosPorPagina;
    
      // Consulta SQL para obtener los datos paginados de la tabla venta
      const query = 'SELECT * FROM venta LIMIT ?, ?';
    
      // Ejecuta la consulta en la base de datos
      connection.query(query, [inicio, resultadosPorPagina], (err, ventas) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error al obtener datos de ventas' });
        } else {
          res.json(ventas);
        }
      });
  
  };  

export const ventasRender = (req,res) => {
  connection.query("SELECT * FROM venta ", (err, ventas)=>{
    if(err){
      console.log(err);
    }else{
      res.render("ventas.hbs", {ventas:ventas})
    }
  })
  
}


export const ventasAnuales = (req, res) => {
  // Consulta para obtener las ventas totales agrupadas por mes
  const queryVentasPorMes = 'SELECT mes, SUM(totalVenta) AS ventaTotal FROM venta GROUP BY mes';

  connection.query(queryVentasPorMes, (err, ventasPorMes) => {
    if (err) {
      console.error(err);
      res.json(err);
      return;
    }

    // Objeto para almacenar las ventas totales por mes
    const ventasTotalesPorMes = {};

    // Iterar sobre los resultados de la consulta y almacenar en el objeto
    ventasPorMes.forEach(venta => {
      const mes = venta.mes;
      const ventaTotal = venta.ventaTotal;

      // Agregar al objeto con el formato "VentaTotalMes"
      ventasTotalesPorMes[`VentaTotal${mes}`] = ventaTotal;
    });

    // Consulta para obtener las estadísticas del vendedor en cada mes
    const queryEstadisticasVendedor = 'SELECT mes, vendedor, COUNT(*) AS numeroVentas, SUM(totalVenta) AS totalVentas FROM venta GROUP BY mes, vendedor';

    connection.query(queryEstadisticasVendedor, (err, estadisticasVendedor) => {
      if (err) {
        console.error(err);
        res.json(err);
        return;
      }

      // Objeto para almacenar las estadísticas del vendedor por mes
      const estadisticasVendedorPorMes = {};

      // Iterar sobre los resultados de la consulta y almacenar en el objeto
      estadisticasVendedor.forEach(estadistica => {
        const mes = estadistica.mes;
        const vendedor = estadistica.vendedor;
        const numeroVentas = estadistica.numeroVentas;
        const totalVentas = estadistica.totalVentas;

        // Agregar al objeto con el formato "MesVendedor"
        estadisticasVendedorPorMes[`${mes}${vendedor}`] = { vendedor, numeroVentas, totalVentas };
      });

      // Calcular la diferencia de mes a mes y agregar al objeto ventasTotalesPorMes
      for (let i = 2; i <= 12; i++) {
        const ventaTotalMesActual = ventasTotalesPorMes[`VentaTotal${i}`] || 0;
        const ventaTotalMesAnterior = ventasTotalesPorMes[`VentaTotal${i - 1}`] || 0;
        ventasTotalesPorMes[`DiferenciaMes${i}`] = ventaTotalMesActual - ventaTotalMesAnterior;
      }
      // Calcular la venta total anual y agregar al objeto ventasTotalesPorMes
const ventaTotalAnual = Object.values(ventasTotalesPorMes).reduce((total, ventaTotal) => total + ventaTotal, 0);
ventasTotalesPorMes['VentaTotalAnual'] = ventaTotalAnual;

// Console.log para verificar la venta total anual
console.log('Venta total anual:', ventaTotalAnual);
      // Console.log para verificar las ventas totales por mes y la diferencia
      console.log('Ventas totales por mes:', ventasTotalesPorMes);

      // Renderizar la vista y pasar tanto los productos como las ventas totales y estadísticas del vendedor por mes
      res.render("ventasAnuales.hbs", {
        ventasTotalesPorMes: ventasTotalesPorMes,
        estadisticasVendedorPorMes: estadisticasVendedorPorMes,
        ventaTotalAnual: ventaTotalAnual
      });
    });
  });
};
