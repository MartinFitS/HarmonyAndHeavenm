import {Router} from "express";
import {renderLogin, renderRegister,masterView,registerFromRoot,registerUser,loginUser,invitadoView, adminView, logoutUser, gestionarUsuarios,deleteUser} from "../controllers/users.controller"
import {allProducts,editProduct,renderProducts ,addProduct,succesCreateProduct,deleteProduct,renderEditProduct} from "../controllers/products.controller";
import {requireAuth} from "../middlewares/auth"
import {roleCheck} from "../middlewares/roleCheck"
import {multipleRoleCheck} from "../middlewares/multipleRoleCheck"
const router = Router();

//users
router.get("/", renderLogin)

router.post("/login/user/invitado/view/", loginUser)

router.get("/login/user/invitado/view/",requireAuth , invitadoView)

router.get("/login/user/admin/view/",  roleCheck("admin"), adminView)

router.get("/login/user/master/view/",  roleCheck("master"),masterView)

router.get("/register",requireAuth, renderRegister)

router.post("/register/user", registerUser)

router.get("/logout", logoutUser)

router.get("/master/user/gestionar", roleCheck("master"),gestionarUsuarios)

router.post("/master/user/products/add/root", roleCheck("master"), registerFromRoot);

router.get("/master/user/gestionar/delete/:id", roleCheck("master"), deleteUser)

//products
router.get("/allProducts", requireAuth , allProducts)

router.get("/products",requireAuth,  renderProducts)

router.post("/products/add",multipleRoleCheck,addProduct);

router.get("/product/edit/:id",multipleRoleCheck, renderEditProduct)

router.post("/product/edit/:id",requireAuth,editProduct)

router.get("/delete/:id", multipleRoleCheck,deleteProduct)

export default router;