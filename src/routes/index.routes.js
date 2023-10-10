import {Router} from "express";
import {renderLogin, renderRegister,masterView,registerFromRoot,registerUser,loginUser,invitadoView, adminView, logoutUser, gestionarUsuarios,deleteUser} from "../controllers/users.controller"
import {allProducts,editProduct,renderProducts ,addProduct,succesCreateProduct,deleteProduct,renderEditProduct} from "../controllers/products.controller";
import {requireAuth} from "../middlewares/auth"

const router = Router();

//users
router.get("/", renderLogin)

router.post("/login/user/invitado/view/", loginUser)

router.get("/login/user/invitado/view/",requireAuth , invitadoView)

router.get("/login/user/admin/view/", requireAuth , adminView)

router.get("/login/user/master/view/", requireAuth, masterView)

router.get("/register",renderRegister)

router.post("/register/user", registerUser)

router.get("/logout", logoutUser)

router.get("/master/user/gestionar", requireAuth,gestionarUsuarios)

router.post("/master/user/products/add/root", requireAuth, registerFromRoot);

router.get("/master/user/gestionar/delete/:id", requireAuth, deleteUser)

//products
router.get("/allProducts", requireAuth , allProducts)

router.get("/products",requireAuth, renderProducts)

router.post("/products/add",requireAuth,addProduct);

router.get("/product/create/succes",requireAuth, succesCreateProduct)

router.get("/product/edit/:id",requireAuth, renderEditProduct)

router.post("/product/edit/:id", requireAuth, editProduct)

router.get("/delete/:id",requireAuth, deleteProduct)

export default router;