import connection from "../bd/bdConfig";


export const renderPuntoDeVenta = (req,res) => {
    connection.query('SELECT * FROM products', (err, products)=>{
        if(err){
             res.json(err)
        }
        res.render("puntoDeVentaIndex.hbs", {products: products})
    })
}

export const ventaPuntoVenta = (req,res) => {
    let total = req.body.total;
    const selectedProducts = req.body.selectedProducts;

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
}