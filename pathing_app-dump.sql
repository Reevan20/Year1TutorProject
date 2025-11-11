/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.0.2-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: pathing_app
-- ------------------------------------------------------
-- Server version	12.0.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `Rooms`
--

DROP TABLE IF EXISTS `Rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(30) DEFAULT NULL,
  `floor` varchar(15) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rooms`
--

LOCK TABLES `Rooms` WRITE;
/*!40000 ALTER TABLE `Rooms` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Rooms` VALUES
(1,'IT Office 1','Ground','Office'),
(2,'IT Office 2','Ground','Office'),
(3,'IT Help Desk','Ground','Help'),
(4,'G6','Ground','Office'),
(5,'G7','Ground','Office'),
(6,'G8','Ground','Office'),
(7,'G9','Ground','Office'),
(8,'G10','Ground','Office'),
(9,'G11','Ground','Office'),
(10,'G12','Ground','Office'),
(11,'G13','Ground','Office'),
(12,'G14','Ground','Office'),
(13,'G16','Ground','Office'),
(14,'G6','Ground','Office'),
(15,'G18','Ground','Office'),
(16,'G20','Ground','Office'),
(17,'G23','Ground','Lab'),
(18,'G33a','Ground','Office'),
(19,'G33','Ground','Lab'),
(20,'G35','Ground','Office'),
(21,'G36','Ground','Office'),
(22,'G37','Ground','Office'),
(23,'G41','Ground','Lab'),
(24,'G105','Ground','Office'),
(25,'LF1','Lower First','Lab'),
(26,'LF7','Lower First','Lab'),
(27,'LF8','Lower First','Office'),
(28,'Lecture Theatre 1.1','Lower First','Lecture'),
(29,'LF11','Lower First','Office'),
(30,'LF12','Lower First','Office'),
(31,'LF9','Lower First','Lab'),
(32,'LF16','Lower First','Lab'),
(33,'LF15','Lower First','Lab'),
(34,'LF17','Lower First','Office'),
(35,'LF34','Lower First','Lab'),
(36,'LF39','Lower First','Lab'),
(37,'LF31','Lower First','Lab'),
(38,'LF21','Lower First','Office'),
(39,'LF22','Lower First','Office'),
(40,'LF23','Lower First','Office'),
(41,'LF24','Lower First','Office'),
(42,'LF25','Lower First','Office'),
(43,'LF26','Lower First','Office'),
(44,'LF27','Lower First','Office'),
(45,'LF28','Lower First','Office'),
(46,'LF29','Lower First','Office'),
(47,'Lecture Theatre 1.3','First','Lecture'),
(48,'Lecture Theatre 1.4','First','Lecture'),
(49,'Lecture Theatre 1.5','First','Lecture'),
(50,'1.8','First','Lab'),
(51,'1.10','First','Lab'),
(52,'1.18A','First','Meeting'),
(53,'1.18B','First','Meeting'),
(54,'1.19','First','Office'),
(55,'1.20','First','Office'),
(56,'2.6','First','Lounge'),
(57,'1.24','First','Office'),
(58,'1.25','First','Office'),
(59,'Turing Lounge','First','Lounge'),
(60,'Courtyard','First','Lounge'),
(61,'Museum','First','Lounge'),
(62,'2.1','Second','Office'),
(63,'2.3','Second','Office'),
(64,'2.4','Second','Office'),
(65,'2.5','Second','Office'),
(66,'2.8','Second','Office'),
(67,'2.9','Second','Office'),
(68,'2.10','Second','Office'),
(69,'2.12','Second','Office'),
(70,'2.13','Second','Printing'),
(71,'2.14','Second','Office'),
(72,'2.15','Second','Office'),
(73,'2.16','Second','Office'),
(74,'2.19','Second','Office'),
(75,'2.20','Second','Office'),
(76,'2.22','Second','Office'),
(77,'2.24','Second','Office'),
(78,'2.25A','Second','Lab'),
(79,'2.25B','Second','Lab'),
(80,'2.27','Second','Office'),
(81,'2.27','Second','Server'),
(82,'2.26','Second','Office'),
(83,'2.28','Second','Office'),
(84,'2.29','Second','Office'),
(85,'2.31','Second','Office'),
(86,'2.30','Second','Office'),
(87,'2.32','Second','Office'),
(88,'2.33','Second','Meeting'),
(89,'2.34','Second','Office'),
(90,'2.36','Second','Office'),
(91,'2.37','Second','Office'),
(92,'2.38','Second','Office'),
(93,'2.39','Second','Office'),
(94,'2.40','Second','Office'),
(95,'2.41','Second','Meeting'),
(96,'2.42','Second','Meeting'),
(97,'2.43','Second','Meeting'),
(98,'2.44','Second','Office'),
(99,'2.45','Second','Office'),
(100,'2.47','Second','Office'),
(101,'2.46','Second','Office'),
(102,'2.48','Second','Office'),
(103,'2.49','Second','Meeting'),
(104,'2.50','Second','Office'),
(105,'2.51','Second','Help'),
(106,'2.52','Second','Office'),
(107,'2.53','Second','Office'),
(108,'2.54','Second','Office'),
(109,'2.55','Second','Office'),
(110,'2.58','Second','Office'),
(111,'2.60','Second','Office'),
(112,'2.61','Second','Office'),
(113,'2.62','Second','Office'),
(114,'2.63','Second','Office'),
(115,'2.64','Second','Office'),
(116,'2.65','Second','Office'),
(117,'2.66','Second','Office'),
(118,'2.67','Second','Office'),
(119,'2.67A','Second','Office'),
(120,'2.68','Second','Office'),
(121,'2.69','Second','Office'),
(122,'2.70','Second','Office'),
(123,'2.71','Second','Office'),
(124,'2.71A','Second','Office'),
(125,'2.72','Second','Office'),
(126,'2.74','Second','Office'),
(127,'2.75','Second','Office'),
(128,'2.76','Second','Office'),
(129,'2.77','Second','Server'),
(130,'2.80','Second','Office'),
(131,'2.81','Second','Office'),
(132,'2.82','Second','Office'),
(133,'2.83','Second','Office'),
(134,'2.86','Second','Office'),
(135,'2.87','Second','Office'),
(136,'2.88','Second','Office'),
(137,'2.89','Second','Office'),
(138,'2.90','Second','Office'),
(139,'2.91','Second','Office'),
(140,'2.92','Second','Office'),
(141,'2.93','Second','Office'),
(142,'2.94','Second','Office'),
(143,'2.95','Second','Office'),
(144,'2.96','Second','Office'),
(145,'2.99','Second','Office'),
(146,'2.100','Second','Office'),
(147,'2.101','Second','Office'),
(148,'2.102','Second','Office'),
(149,'2.103','Second','Office'),
(150,'2.104','Second','Office'),
(151,'2.105','Second','Office'),
(152,'2.106','Second','Office'),
(153,'2.107','Second','Office'),
(154,'2.108','Second','Office'),
(155,'2.109','Second','Office'),
(156,'2.110','Second','Office'),
(157,'2.111','Second','Office'),
(158,'2.112','Second','Office'),
(159,'2.113','Second','Office'),
(160,'2.114','Second','Office'),
(161,'2.115','Second','Office'),
(162,'2.116','Second','Office'),
(163,'2.119','Second','Office'),
(164,'2.120','Second','Office'),
(165,'2.120A','Second','Office'),
(166,'2.121','Second','Office'),
(167,'2.122','Second','Office'),
(168,'2.123','Second','Office'),
(169,'2.124','Second','Office'),
(170,'2.125','Second','Office'),
(171,'2.126','Second','Office'),
(172,'2.127','Second','Office'),
(173,'Plant Room','Second','Lounge');
/*!40000 ALTER TABLE `Rooms` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-11-11 15:57:03
