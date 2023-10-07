import {Router} from "express";
import {renderLogin, renderRegister,registerUser,loginUser,invitadoView, adminView, logoutUser} from "../controllers/users.controller"
import {allProducts,renderProducts ,addProduct,succesCreateProduct,deleteProduct,renderEditProduct} from "../controllers/products.controller";
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

router.get("/logout", logoutUser)

//products
router.get("/allProducts", requireAuth , allProducts)

router.get("/products",requireAuth, renderProducts)

router.post("/products/add",requireAuth,addProduct);

router.get("/product/create/succes",requireAuth, succesCreateProduct)

router.get("/product/edit/:id", renderEditProduct)

router.get("/delete/:id",requireAuth, deleteProduct)
export default router;