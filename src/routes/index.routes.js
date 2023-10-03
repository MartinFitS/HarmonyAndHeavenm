import {Router} from "express";
import {renderLogin, renderRegister,registerUser,loginUser,invitadoView, adminView} from "../controllers/users.controller"
import {addProduct} from "../controllers/products.controller";
import connection from "../bd/bdConfig"
import {requireAuth} from "../middlewares/auth"
import {adminCheck} from "../middlewares/adminCheck"
const router = Router();

//users
router.get("/", renderLogin)

router.post("/login/user/invitado/view/", loginUser)

router.get("/login/user/invitado/view/",requireAuth , invitadoView)

router.get("/login/user/admin/view/", requireAuth , adminView)

router.get("/register",renderRegister)

router.post("/register/user", registerUser)

router.get("/logout", (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log("Hay un error perrito!")
        }
        res.redirect('/')
    })
})

//products
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