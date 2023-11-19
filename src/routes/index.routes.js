import {Router} from "express";
import {renderLogin, renderRegister,masterView,registerFromRoot,registerUser,loginUser,invitadoView,vendedorView, adminView, logoutUser, gestionarUsuarios,deleteUser,editUser,editUserToDatabase} from "../controllers/users.controller"
import {allProducts,editProduct,renderProducts ,addProduct,succesCreateProduct,deleteProduct,renderEditProduct} from "../controllers/products.controller";
import {allProveedores, renderProveedores, addProveedor, proveedorAdd, renderEditProveedor, editProveedor, deleteProveedor } from "../controllers/proveedores.controller";
import {allPedidos, editPedido, addPedido, deletePedido, pedidoAdd, facturaPedido, anadirUnidades,allPedidosAdmin} from "../controllers/pedidos.controller";
import {categoriaProducto} from "../controllers/categoria.controller";
import {requireAuth} from "../middlewares/auth"
import {roleCheck} from "../middlewares/roleCheck"
import {multipleRoleCheck,multipleRoleCheckVendedor} from "../middlewares/multipleRoleCheck"
import {renderPuntoDeVenta,ventaPuntoVenta,ventasRender,ventasRenderAdmin,apiVentas,ventasAnuales,empleadoDelMesRender} from "../controllers/puntodeventa.controller"
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

router.get("/products/",requireAuth,  renderProducts)

router.post("/products/add",multipleRoleCheck,addProduct);

router.get("/product/edit/:id",multipleRoleCheck, renderEditProduct)

router.post("/product/edit/:id",multipleRoleCheck,editProduct)

router.get("/delete/:id", multipleRoleCheck,deleteProduct)



//proveedores
router.get("/proveedores", roleCheck("master") , allProveedores)

router.get("/proveedoresAdd", roleCheck("master"), proveedorAdd);

router.post("/proveedores/add",roleCheck("master"), addProveedor);

router.get("/proveedor/edit/:id", roleCheck("master"), renderEditProveedor);

router.post("/proveedor/edit/:id", roleCheck("master"), editProveedor);

router.get("/proveedor/delete/:id", roleCheck("master"),deleteProveedor) 


//pedidos

router.get("/pedidos", roleCheck("master") , allPedidos)

router.get("/pedidos/admin", roleCheck("admin") , allPedidosAdmin)

router.get("/pedidoAdd", multipleRoleCheck, pedidoAdd);

router.post("/pedido/edit", multipleRoleCheck, editPedido);

router.post("/pedido/add",multipleRoleCheck, addPedido );

router.get("/pedido/delete/:numSerie", multipleRoleCheck, deletePedido) 

router.get("/pedido/factura/:numSerie", multipleRoleCheck, facturaPedido) 

router.post("/pedido/anadir",multipleRoleCheck ,anadirUnidades)


//categoria
router.post("/productos/categoria/", requireAuth,categoriaProducto )

//punto de venta

router.get("/p-v", requireAuth, multipleRoleCheckVendedor, renderPuntoDeVenta) 

router.post("/guardar-venta", multipleRoleCheckVendedor, ventaPuntoVenta);

router.get("/ventas/api", apiVentas)

router.get("/p-v/ventas/", multipleRoleCheckVendedor, ventasRender)

router.get("/p-v/ventas/admin", roleCheck("admin"), ventasRenderAdmin)

router.get("/p-v/ventas/ventas-anuales",multipleRoleCheckVendedor, ventasAnuales )

router.get("/p-v/ventas/empleado-mes", multipleRoleCheckVendedor, empleadoDelMesRender)

export default router;