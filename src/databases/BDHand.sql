-- MySQL dump 10.13  Distrib 5.7.43, for Win64 (x86_64)
--
-- Host: localhost    Database: handhariel
-- ------------------------------------------------------
-- Server version	5.7.43-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

-- Selecciona la base de datos

USE handh;

-- Luego, procede con el DROP TABLE
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `proveedor` varchar(50) NOT NULL,
  `numSerie` int(10) NOT NULL AUTO_INCREMENT,
  `costoTotal` int(100) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `unidades` int(10) NOT NULL,
  `estado` varchar(15) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `instrumentoTipo` varchar(50) NOT NULL,
  PRIMARY KEY (`numSerie`),
  KEY `fk_users_orders` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=28633 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('fender',28632,10500,0,10,'','YAMAHA FG/FGX 1','Yamaha','Guitarra');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modelo` varchar(100) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `precioPublico` int(11) DEFAULT NULL,
  `precioTienda` int(11) DEFAULT NULL,
  `unidades` int(11) DEFAULT NULL,
  `foto` varchar(150) DEFAULT NULL,
  `instrumentoTipo` varchar(50) DEFAULT NULL,
  `clave` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (7,'YAMAHA FG/FGX 1','Yamaha',25000,17000,2,'https://karmamusic.mx/17224-large_default/yamaha-guitarra-acustica-fgfgx-series-fgc-tabl.jpg','Guitarra',NULL),(10,'Fender x100','Fender',12000,11000,1,'https://karmamusic.mx/9036-large_default/takamine-guitarra-electroacustica-12-cuerdas-natural-gj72ce-12-nat.jpg','Guitarra','PYGB1');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProveedor` varchar(50) NOT NULL,
  `producto` varchar(50) NOT NULL,
  `precioProveedor` int(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (11,'Fender','Guitarra',2000,'fender@gmail.com',2121212121);
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` varchar(255) NOT NULL,
  `name_role` char(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'admin','$2b$10$baqUD.9YnwTUi379eHFU5ujkklsyrhZfb4SM78hLJ.i5gQ62kDXw.','$2b$10$HdypoBtaMWNrobhR29BZiO9P.Gpw0WEMR4hFJKRYNpNdR/.BygE0C','admin'),(5,'vendedor','$2b$10$1YzwkWgyfeof2R3vUFPomeWNXd/upS859NvayADvWFEi3KL3IWtLG','$2b$10$L0jNjiCXLueJ66DrhlBzEu7sKkI1A6ug8T9WyYXKJnhtFWoXt9Sby','vendedor'),(6,'invitado','$2b$10$xv9rP7rZmgjU/0BHx4Xdoe2u3hucjFQ54B52yQWZfZjCU.9Yw4lj2','$2b$10$Bc2oxNgFyQNvONk00aia2.GgwXjpGMvjm48L90WU4uwdcy5qsUSM.','invitado'),(7,'MarSernna','$2b$10$6COExY5STNzQh86vs0l5/uCx4qCLpO5yupWZFC2jpaGKo6uFd1WZm','$2b$10$NqXf0q1O6crLxLab1QP71u4xXi2e0IEfA2Jvc4js6gCKywnXOB7Pq','invitado'),(8,'Paco','$2b$10$qFPo44tj/l9/5OTpdG14BOEJv.SzXmAghrLPPnM6w33.o/7vsCAH2','$2b$10$5EbE8MX/iPHFkx9t2ZAmFOej.ozuapCjQcqLRoKrS74boqu2m2qUK','invitado'),(9,'usuario1','$2b$10$8KJHtzrqrFZUjfPzQUs/zeI3yt2rRCu.HXE5qiDCfIRo4QzdnLrqO','$2b$10$JbTdAywRVu4jM5nbty53ieOnt8vcUVB1Ed3DFb8YWcCfdperd7Woi','admin'),(10,'chelisDls','$2b$10$7JKVrKp1UW1Hkk/fN3bsZuk1cM93TJLuS4HJM4af0oFI5rJG./Pye','$2b$10$wjo9ILMoMvyr7Zg/SuEm/u46gzi77GfdPIag3gz5Bt05hv2975jEK','invitado'),(11,'VICTOR','$2b$10$V4hwfqigx7XuqlGtpX6kjuC/Bs0O9uhY.R9du0EM2jfRWAA.S/oN6','$2b$10$bAjSN8rZHI5ivaWv7EXf/.VW1siAB/LhwZo0SictwfH9ZHqJgySAW','invitado'),(12,'Martin','$2b$10$JZYBCG3tvuyFjx3KBAuise/BKORsQWKhMFLsqs1VsCPHWX0/abTT.','$2b$10$J6EOvM4wUhAizJXXTiN0Ve.ageH1Feh/s72JZAwvP5rnOB/ohVK7q','admin'),(13,'grex','$2b$10$VHLihM6JzB7emj/i0hOd4.UNFFrqTE2C6z5S0clre6xhqRhPiZ2ai','$2b$10$1l6aeejNHFu2cuT1U0My3edxtxZRxA3jybFfuhkZrXeT5OYmXemJy','admin'),(14,'pablo','$2b$10$8MDBM0ipdceO156wktie8eWOB.OXGHUKJIP2fyqjpWfPM8A/LltwC','$2b$10$Hach3dRMMkILR00j1LZma.Q4FpaiWdoetZNGp6aPIgabm4H7FmSny','invitado'),(15,'administrador','$2b$10$65DYdlVKZrg2eGVCZdKixORNwHeScgYdVpKkdiJPJg/CY.JZSXoLK','$2b$10$5gjkNLqPk6QOI87T.yotLuU6v9hP8stRVJeXYN6miwp/qtK/tE5ay','admin'),(16,'ariel','$2b$10$Wlf9WhiBfLA8TrH3JcL0YO8eG0BpK3TsTVwSWj8OvCdI5V80aVDb2','$2b$10$6gJ3Dq4kDsvDfjbIVjWJJO5aO2BAFvd/URCwgWBchxvAgAyC6YEFu','admin'),(17,'usuario11','$2b$10$9QFuC/n8gx.6pHijrB1Kmu3wMf0C7X4/wTcz0gKck3qjkyhzAceMO','$2b$10$9kXzo6tHvclV1p8W.M0DoOJTtEmCsX.SajhxwdO2zzNHB.IyAo5KC','invitado'),(18,'arielmaster','$2b$10$j4MHZBGRz8F0R1TO6ormB.kGGoDFCVRgEly3TgwAmAk35G/A1rVSW','$2b$10$S7HJFOB5.i7qt8unzrGPZ./C9eRfcLuIJZTx7qoNkza3zVPZBVXTq','master'),(20,'arielven','$2b$10$CMDmazHCbok70G/oLepoZeEV.b0WgxQjK0lnXSQTnmMU2BLlSHRxm','$2b$10$2THCwkjyT4UYUm8O.NNPseJ.xgNTsZOzEbXHM8I2IohYnjWyTJe.C','vendedor'),(21,'ariinvi','$2b$10$teUpu.cDt6sSziCFCF4iduqdGsWiMZCo7.RjIJktouqitPK87B.J.','$2b$10$J8iMuVp91cKa2YOdxVhzaeftBmCiobVSlsGOTPlKDMMrVjzKply22','invitado'),(22,'MartinSerna','$2b$10$PCaXJAWE6c7svfkXMli.cOMc9hAtDfjBVnivuSbteCLA4561bZMhG','$2b$10$tXLukwa5xAWpjOxtv38koenmUeGhJLuuA0D8kdK1boQXBDEPRxQ6G','master');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-27  8:41:23
