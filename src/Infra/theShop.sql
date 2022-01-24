-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.6.5-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for theshop
CREATE DATABASE IF NOT EXISTS `theshop` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `theshop`;

-- Dumping structure for table theshop.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `customerAddress` text NOT NULL,
  `cpf` int(11) NOT NULL,
  `cellphone` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- Dumping data for table theshop.customers: ~7 rows (approximately)
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT IGNORE INTO `customers` (`id`, `email`, `password`, `name`, `customerAddress`, `cpf`, `cellphone`) VALUES
	(7, 'p123412oa@gmail.com', '$2b$10$hXAABAhZPef7U412D4/UiuEN5Fr9z.spc1l0sZ7JtpI1btxb0xbXm', 'lucas', 'Rua tal na cidade aquela', 222223, 1234),
	(8, 'p123412oa@gmail.com', '$2b$10$3I7oG1e74PbeEOIV9ZiwiOalb7kI/5ep.0fOqBVf038f5YsuUOg8C', 'lucas', 'Rua tal na cidade aquela', 222223, 1234),
	(10, 'pessoa@gmail.com', '$2b$10$1MdS5T6kCOqWacYC2mToAu5IWF2c5T9CVtAEY.csgUJuTxTgqXunK', 'pessoa', 'Rua tal na cidade aquela', 222223, 1234),
	(11, 'pessoa@gmail.com', '$2b$10$75eqWOh29az.Y7LxgjH7r.GBWTrg0q/79jwX9wvMbLeOC3/vKpS9i', 'pessoa', 'Rua tal na cidade aquela', 222223, 1234),
	(12, 'pessoa@gmail.com', '$2b$10$uC7NQZPrN.01OLyELtkxEu246iLQGZ3RVGDrImjozIAODi54DG7Pa', 'pessoa', 'Rua tal na cidade aquela', 222223, 1234),
	(15, 'pessoa@gmail.com', '$2b$10$HIYXlM8aY7HajTy7C9Noxely.OTYTHDg2tw0nf2.2orxdAgPiN1ey', 'pessoa', 'Rua tal na cidade aquela', 222223, 1234),
	(16, 'pessoa@gmail.com', '$2b$10$NfcLd0CqnuYb7fb9fTn9ruRL4EQzZQm6FktI8fqceBOjZiprkcTfW', 'pessoa', 'Rua tal na cidade aquela', 222223, 1234);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;

-- Dumping structure for table theshop.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `customerId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_e5de51ca888d8b1f5ac25799dd` (`customerId`),
  UNIQUE KEY `REL_8624dad595ae567818ad9983b3` (`productId`),
  CONSTRAINT `FK_8624dad595ae567818ad9983b33` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e5de51ca888d8b1f5ac25799dd1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Dumping data for table theshop.orders: ~1 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT IGNORE INTO `orders` (`id`, `quantity`, `customerId`, `productId`) VALUES
	(8, 55, 10, 2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Dumping structure for table theshop.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `onStock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table theshop.products: ~2 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT IGNORE INTO `products` (`id`, `name`, `author`, `price`, `onStock`) VALUES
	(1, 'Name of the wind', 'Patrick rothfuss', 20, 0),
	(2, 'Name of the wind', 'Patrick rothfuss', 20, 944);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
