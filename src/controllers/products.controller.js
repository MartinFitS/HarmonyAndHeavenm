import connection from "../bd/bdConfig";

export const addProduct = async(req,res) => {
    try{
        const data = req.body;
        await connection.query('INSERT INTO products set ?', [data], (err, product) =>{
            console.log(product);
            res.send("funciona")
        })

    }catch(e){
        console.err(e)
    }
}

