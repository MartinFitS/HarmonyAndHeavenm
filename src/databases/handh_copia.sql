-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 02-11-2023 a las 00:14:41
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `handh_copia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `proveedor` varchar(50) NOT NULL,
  `numSerie` int(10) NOT NULL,
  `costoTotal` int(100) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `unidades` int(10) NOT NULL,
  `estado` varchar(15) NOT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `marca` varchar(50) NOT NULL,
  `instrumentoTipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`proveedor`, `numSerie`, `costoTotal`, `idUsuario`, `unidades`, `estado`, `modelo`, `marca`, `instrumentoTipo`) VALUES
('Fender', 28644, 0, 18, 3, 'Entregado', 'YAMAHA FG/FGX 1', 'Fender', 'Guitarra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `modelo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `marca` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `precioPublico` int(11) DEFAULT NULL,
  `precioTienda` int(11) DEFAULT NULL,
  `unidades` int(11) DEFAULT NULL,
  `foto` varchar(150) DEFAULT NULL,
  `instrumentoTipo` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `modelo`, `marca`, `precioPublico`, `precioTienda`, `unidades`, `foto`, `instrumentoTipo`) VALUES
(14, 'YAMAHA FG/FGX 1', 'Donner', 15000, 12000, 2, 'https://karmamusic.mx/17224-large_default/yamaha-guitarrahttps://karmamusic.mx/17224-large_default/yamaha-guitarra-acustica-fgfgx-series-fgc-tabl.jpg-', 'Guitarra'),
(18, 'DJP-1000', 'Fender', 32200, 30000, 10, 'https://donnermx.com/cdn/shop/products/1_ac08a5a4-a705-4690-8a28-e0cdcf84bea4_1600x.jpg?v=1666256438', 'Guitarra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `nombreProveedor` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `suppliers`
--

INSERT INTO `suppliers` (`id`, `nombreProveedor`, `correo`, `telefono`) VALUES
(13, 'Fender', 'fender@gmail.com', 2121212121),
(15, 'Donner', 'donner@gmail.com', 2147483647);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` varchar(255) NOT NULL,
  `name_role` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `roles`, `name_role`) VALUES
(4, 'admin', '$2b$10$baqUD.9YnwTUi379eHFU5ujkklsyrhZfb4SM78hLJ.i5gQ62kDXw.', '$2b$10$HdypoBtaMWNrobhR29BZiO9P.Gpw0WEMR4hFJKRYNpNdR/.BygE0C', 'admin'),
(5, 'vendedor', '$2b$10$1YzwkWgyfeof2R3vUFPomeWNXd/upS859NvayADvWFEi3KL3IWtLG', '$2b$10$L0jNjiCXLueJ66DrhlBzEu7sKkI1A6ug8T9WyYXKJnhtFWoXt9Sby', 'vendedor'),
(6, 'invitado', '$2b$10$xv9rP7rZmgjU/0BHx4Xdoe2u3hucjFQ54B52yQWZfZjCU.9Yw4lj2', '$2b$10$Bc2oxNgFyQNvONk00aia2.GgwXjpGMvjm48L90WU4uwdcy5qsUSM.', 'invitado'),
(7, 'MarSernna', '$2b$10$6COExY5STNzQh86vs0l5/uCx4qCLpO5yupWZFC2jpaGKo6uFd1WZm', '$2b$10$NqXf0q1O6crLxLab1QP71u4xXi2e0IEfA2Jvc4js6gCKywnXOB7Pq', 'invitado'),
(18, 'arielmaster', '$2b$10$j4MHZBGRz8F0R1TO6ormB.kGGoDFCVRgEly3TgwAmAk35G/A1rVSW', '$2b$10$S7HJFOB5.i7qt8unzrGPZ./C9eRfcLuIJZTx7qoNkza3zVPZBVXTq', 'master');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`numSerie`),
  ADD KEY `fk_useres_orders` (`idUsuario`),
  ADD KEY `modelo` (`modelo`),
  ADD KEY `fk_orders_suppliers` (`proveedor`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `modelo` (`modelo`),
  ADD UNIQUE KEY `marca` (`marca`);

--
-- Indices de la tabla `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombreProveedor` (`nombreProveedor`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `numSerie` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28645;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_suppliers` FOREIGN KEY (`proveedor`) REFERENCES `suppliers` (`nombreProveedor`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_orders` FOREIGN KEY (`idUsuario`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`modelo`) REFERENCES `products` (`modelo`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_suppliers` FOREIGN KEY (`marca`) REFERENCES `suppliers` (`nombreProveedor`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
