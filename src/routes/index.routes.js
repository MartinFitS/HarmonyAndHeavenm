import {Router} from "express";
import {renderLogin, renderRegister,registerUser,loginUser, authenticate} from "../controllers/users.controller"
import {addProduct} from "../controllers/products.controller";
import connection from "../bd/bdConfig"
import {requireAuth} from "../middlewares/auth"
const router = Router();

//users
router.get("/", renderLogin)

router.post("/login/user", loginUser)

router.get("/register",renderRegister)

router.post("/register/user", registerUser)

router.get("/allProducts", requireAuth , async (req,res)=>{
    connection.query('SELECT * FROM products', (err, products)=>{
        if(err){
             res.json(err)
        }
        console.log(products)
    })
})

router.get("/products", (req,res)=>{
    res.render("addProduct.hbs")
})

router.post("/products/add",addProduct);

export default router;