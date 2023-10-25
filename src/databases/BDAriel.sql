CREATE DATABASE handhAriel;  
USE handhAriel;
-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 25-10-2023 a las 18:37:16
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
-- Base de datos: `handh`
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
  `modelo` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `instrumentoTipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`proveedor`, `numSerie`, `costoTotal`, `idUsuario`, `unidades`, `estado`, `modelo`, `marca`, `instrumentoTipo`) VALUES
('fender', 28632, 10500, 0, 10, '', 'YAMAHA FG/FGX 1', 'Yamaha', 'Guitarra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `precioPublico` int(11) DEFAULT NULL,
  `precioTienda` int(11) DEFAULT NULL,
  `unidades` int(11) DEFAULT NULL,
  `foto` varchar(150) DEFAULT NULL,
  `instrumentoTipo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `modelo`, `marca`, `precioPublico`, `precioTienda`, `unidades`, `foto`, `instrumentoTipo`) VALUES
(7, 'YAMAHA FG/FGX 1', 'Yamaha', 25000, 17000, 2, 'https://karmamusic.mx/17224-large_default/yamaha-guitarra-acustica-fgfgx-series-fgc-tabl.jpg', 'Guitarra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `nombreProveedor` varchar(50) NOT NULL,
  `producto` varchar(50) NOT NULL,
  `precioProveedor` int(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `suppliers`
--

INSERT INTO `suppliers` (`id`, `nombreProveedor`, `producto`, `precioProveedor`, `correo`, `telefono`) VALUES
(11, 'Fender', 'Guitarra', 2000, 'fender@gmail.com', 2121212121),
(12, 'yamaha', 'Guitarra 11', 12, 'yamaha@gmail.com', 21121);

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
(8, 'Paco', '$2b$10$qFPo44tj/l9/5OTpdG14BOEJv.SzXmAghrLPPnM6w33.o/7vsCAH2', '$2b$10$5EbE8MX/iPHFkx9t2ZAmFOej.ozuapCjQcqLRoKrS74boqu2m2qUK', 'invitado'),
(9, 'usuario1', '$2b$10$8KJHtzrqrFZUjfPzQUs/zeI3yt2rRCu.HXE5qiDCfIRo4QzdnLrqO', '$2b$10$JbTdAywRVu4jM5nbty53ieOnt8vcUVB1Ed3DFb8YWcCfdperd7Woi', 'admin'),
(10, 'chelisDls', '$2b$10$7JKVrKp1UW1Hkk/fN3bsZuk1cM93TJLuS4HJM4af0oFI5rJG./Pye', '$2b$10$wjo9ILMoMvyr7Zg/SuEm/u46gzi77GfdPIag3gz5Bt05hv2975jEK', 'invitado'),
(11, 'VICTOR', '$2b$10$V4hwfqigx7XuqlGtpX6kjuC/Bs0O9uhY.R9du0EM2jfRWAA.S/oN6', '$2b$10$bAjSN8rZHI5ivaWv7EXf/.VW1siAB/LhwZo0SictwfH9ZHqJgySAW', 'invitado'),
(12, 'Martin', '$2b$10$JZYBCG3tvuyFjx3KBAuise/BKORsQWKhMFLsqs1VsCPHWX0/abTT.', '$2b$10$J6EOvM4wUhAizJXXTiN0Ve.ageH1Feh/s72JZAwvP5rnOB/ohVK7q', 'admin'),
(13, 'grex', '$2b$10$VHLihM6JzB7emj/i0hOd4.UNFFrqTE2C6z5S0clre6xhqRhPiZ2ai', '$2b$10$1l6aeejNHFu2cuT1U0My3edxtxZRxA3jybFfuhkZrXeT5OYmXemJy', 'admin'),
(14, 'pablo', '$2b$10$8MDBM0ipdceO156wktie8eWOB.OXGHUKJIP2fyqjpWfPM8A/LltwC', '$2b$10$Hach3dRMMkILR00j1LZma.Q4FpaiWdoetZNGp6aPIgabm4H7FmSny', 'invitado'),
(15, 'administrador', '$2b$10$65DYdlVKZrg2eGVCZdKixORNwHeScgYdVpKkdiJPJg/CY.JZSXoLK', '$2b$10$5gjkNLqPk6QOI87T.yotLuU6v9hP8stRVJeXYN6miwp/qtK/tE5ay', 'admin'),
(16, 'ariel', '$2b$10$Wlf9WhiBfLA8TrH3JcL0YO8eG0BpK3TsTVwSWj8OvCdI5V80aVDb2', '$2b$10$6gJ3Dq4kDsvDfjbIVjWJJO5aO2BAFvd/URCwgWBchxvAgAyC6YEFu', 'admin'),
(17, 'usuario11', '$2b$10$9QFuC/n8gx.6pHijrB1Kmu3wMf0C7X4/wTcz0gKck3qjkyhzAceMO', '$2b$10$9kXzo6tHvclV1p8W.M0DoOJTtEmCsX.SajhxwdO2zzNHB.IyAo5KC', 'invitado'),
(18, 'arielmaster', '$2b$10$j4MHZBGRz8F0R1TO6ormB.kGGoDFCVRgEly3TgwAmAk35G/A1rVSW', '$2b$10$S7HJFOB5.i7qt8unzrGPZ./C9eRfcLuIJZTx7qoNkza3zVPZBVXTq', 'master'),
(20, 'arielven', '$2b$10$CMDmazHCbok70G/oLepoZeEV.b0WgxQjK0lnXSQTnmMU2BLlSHRxm', '$2b$10$2THCwkjyT4UYUm8O.NNPseJ.xgNTsZOzEbXHM8I2IohYnjWyTJe.C', 'vendedor'),
(21, 'ariinvi', '$2b$10$teUpu.cDt6sSziCFCF4iduqdGsWiMZCo7.RjIJktouqitPK87B.J.', '$2b$10$J8iMuVp91cKa2YOdxVhzaeftBmCiobVSlsGOTPlKDMMrVjzKply22', 'invitado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`numSerie`),
  ADD KEY `fk_users_orders` (`idUsuario`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `numSerie` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28633;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
