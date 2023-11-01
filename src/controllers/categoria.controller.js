import connection from "../bd/bdConfig";

export const categoriaProducto = async (req, res) => {
    const minPrice = parseFloat(req.body.minPrice);
    const maxPrice = parseFloat(req.body.maxPrice);
    const instrumentoTipo = req.body.instrumentoTipo;
    const marca = req.body.marca;

    //where 1=1 se utiliza para consultas dinamicas
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

//se verifica que se haya ingresado un valor minimo. isNaN (Is Not-a-Number) verifica si un valor no es un número
    if (!isNaN(minPrice)) {
        sql += ' AND precioPublico >= ?';
        params.push(minPrice);
    }

    if (!isNaN(maxPrice)) {
        sql += ' AND precioPublico <= ?';
        params.push(maxPrice);
    }

    if (instrumentoTipo !== 'Todos') {
        sql += ' AND instrumentoTipo = ?';
        params.push(instrumentoTipo);
    }

    if (marca !== 'Todos') {
        sql += ' AND marca = ?';
        params.push(marca);
    }

    connection.query(sql, params, (err, productsf) => {
        if (err) {
            res.json(err);
        } else {
            res.render('masterPrincipalView', { products: productsf });
        }
    });
};