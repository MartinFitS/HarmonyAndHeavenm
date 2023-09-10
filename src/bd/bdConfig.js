import mysql from "mysql";
import {HOST, DB,USERBD,PASSWORDUSERDB} from "../config"

const dbConfig = {
    host: HOST,
    user: USERBD,
    password: PASSWORDUSERDB,
    database: DB
}

const connection = mysql.createConnection(dbConfig);

connection.connect((err)=>{
    if(err){
        console.log("Error al conectar a la base de datos:", err)
    }else{
        console.log("Conexion exitosa a la base de datos MySQL")
    }
});

export default connection;