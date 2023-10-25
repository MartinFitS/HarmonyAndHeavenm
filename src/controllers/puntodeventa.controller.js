import connection from "../bd/bdConfig";

export const renderPuntoDeVenta = (req,res) => {
    connection.query('SELECT * FROM products', (err, products)=>{
        if(err){
             res.json(err)
        }
        res.render("puntoDeVentaIndex.hbs", {products: products})
        console.log(products)
    })
}