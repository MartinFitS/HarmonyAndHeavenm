import {Router} from "express";
import {renderLogin, renderRegister,masterView,registerFromRoot,registerUser,loginUser,invitadoView,vendedorView, adminView, logoutUser, gestionarUsuarios,deleteUser,editUser,editUserToDatabase} from "../controllers/users.controller"
import {allProducts,editProduct,renderProducts ,addProduct,succesCreateProduct,deleteProduct,renderEditProduct} from "../controllers/products.controller";
import {allProveedores, renderProveedores, addProveedor, proveedorAdd, renderEditProveedor, editProveedor, deleteProveedor } from "../controllers/proveedores.controller";
import {allPedidos, editPedido, addPedido, deletePedido, pedidoAdd, facturaPedido, anadirUnidades} from "../controllers/pedidos.controller";
import {categoriaProducto} from "../controllers/categoria.controller";
import {requireAuth} from "../middlewares/auth"
import {roleCheck} from "../middlewares/roleCheck"
import {multipleRoleCheck,multipleRoleCheckVendedor} from "../middlewares/multipleRoleCheck"
import {renderPuntoDeVenta,ventaPuntoVenta,ventasRender,apiVentas,ventasAnuales,empleadoDelMesRender} from "../controllers/puntodeventa.controller"
const router = Router();

//users
router.get("/", renderLogin)

router.post("/login/user/", loginUser)

router.get("/login/user/invitado/view/",requireAuth , invitadoView)

router.get("/login/user/vendedor/view/", roleCheck("vendedor"), vendedorView)

router.get("/login/user/admin/view/",  roleCheck("admin"), adminView)

router.get("/login/user/master/view/",  roleCheck("master"),masterView)

router.get("/register", renderRegister)

router.post("/register/user", registerUser)

router.get("/logout", logoutUser)

router.get("/master/user/gestionar", roleCheck("master"),gestionarUsuarios);

router.post("/master/user/products/add/root", roleCheck("master"), registerFromRoot);

router.get("/master/user/gestionar/editar/:id", roleCheck("master"),editUser);

router.post("/master/user/gestionar/editar/:id", roleCheck("master"), editUserToDatabase);

router.get("/master/user/gestionar/delete/:id", roleCheck("master"), deleteUser);

//products
router.get("/allProducts", requireAuth , allProducts)

router.get("/products",requireAuth,  renderProducts)

router.post("/products/add",multipleRoleCheck,addProduct);

router.get("/product/edit/:id",multipleRoleCheck, renderEditProduct)

router.post("/product/edit/:id",requireAuth,editProduct)

router.get("/delete/:id", multipleRoleCheck,deleteProduct)



//proveedores
router.get("/proveedores", requireAuth , allProveedores)

router.get("/proveedoresAdd", requireAuth, proveedorAdd);

router.post("/proveedores/add",multipleRoleCheck, addProveedor);

router.get("/proveedor/edit/:id", multipleRoleCheck, renderEditProveedor);

router.post("/proveedor/edit/:id", requireAuth, editProveedor);

router.get("/proveedor/delete/:id", multipleRoleCheck,deleteProveedor) 


//pedidos

router.get("/pedidos", requireAuth , allPedidos)

router.get("/pedidoAdd", requireAuth, pedidoAdd);

router.post("/pedido/edit", requireAuth, editPedido);

router.post("/pedido/add",requireAuth, addPedido );

router.get("/pedido/delete/:numSerie", multipleRoleCheck, deletePedido) 

router.get("/pedido/factura/:numSerie", multipleRoleCheck, facturaPedido) 

router.post("/pedido/anadir",multipleRoleCheck ,anadirUnidades)


//categoria
router.post("/productos/categoria/", multipleRoleCheck,categoriaProducto )

//punto de venta

router.get("/p-v", requireAuth, multipleRoleCheckVendedor, renderPuntoDeVenta) 

router.post("/guardar-venta", requireAuth, ventaPuntoVenta);

router.get("/ventas/api", apiVentas)

router.get("/p-v/ventas/", requireAuth,multipleRoleCheckVendedor, ventasRender)

router.get("/p-v/ventas/ventas-anuales",multipleRoleCheckVendedor, ventasAnuales )

router.get("/p-v/ventas/empleado-mes", multipleRoleCheckVendedor, empleadoDelMesRender)

export default router;