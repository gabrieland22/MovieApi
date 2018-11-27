

-- MySQL dump 10.13  Distrib 8.0.12, for osx10.13 (x86_64)
--
-- Host: localhost    Database: moviedb
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Movie`
--

CREATE DATABASE moviedb;

use moviedb;

DROP TABLE IF EXISTS `Movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Movie` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `photo_url` char(32) NOT NULL,
  `lenght` int(11) NOT NULL,
  `released_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Movie`
--

LOCK TABLES `Movie` WRITE;
/*!40000 ALTER TABLE `Movie` DISABLE KEYS */;
INSERT INTO `Movie` VALUES (1,'The Matrix','the-matrix.jpg',136,'1999-03-31'),(2,'The Matrix Reloaded','the-matrix.jpg-2',138,'2003-05-15'),(3,'The Matrix Revolution','the-matrix.jpg-3',129,'2003-11-05');
/*!40000 ALTER TABLE `Movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Star`
--

DROP TABLE IF EXISTS `Star`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Star` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `photo_url` char(32) NOT NULL,
  `is_actor` tinyint(1) NOT NULL,
  `is_director` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Star`
--

LOCK TABLES `Star` WRITE;
/*!40000 ALTER TABLE `Star` DISABLE KEYS */;
INSERT INTO `Star` VALUES (1,'Keanu Reeves','keanu_reeves.jpg',1,0),(3,'Laurence Fishburne','laurence_fishburne.jpg',1,0);

/*!40000 ALTER TABLE `Star` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StarMovie`
--

DROP TABLE IF EXISTS `StarMovie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `StarMovie` (
  `id` int(10) unsigned NOT NULL,
  `movie_id` int(10) unsigned NOT NULL,
  `star_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_MovieID` (`movie_id`),
  KEY `FK_StarID` (`star_id`),
  CONSTRAINT `CT_StarMovie_MovieID` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `CT_StarMovie_SM_StarID` FOREIGN KEY (`star_id`) REFERENCES `star` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StarMovie`
--

LOCK TABLES `StarMovie` WRITE;
/*!40000 ALTER TABLE `StarMovie` DISABLE KEYS */;
INSERT INTO `StarMovie` VALUES (0,1,1),(1,1,3);
/*!40000 ALTER TABLE `StarMovie` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `User` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `fbToken` tinytext,
  `name` varchar(45) NOT NULL,
  `photo_url` char(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'bob@gmail.com','','Rafael Reis','rafael-reis.jpg');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserMovie`
--

DROP TABLE IF EXISTS `UserMovie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `UserMovie` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `toWatch` tinyint(1) NOT NULL,
  `watched` tinyint(1) NOT NULL,
  `favorite` tinyint(1) NOT NULL,
  `review` tinyint(4) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `movie_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_MovieID` (`movie_id`),
  KEY `FK_UserID` (`user_id`),
  CONSTRAINT `CT_UserMovie_MovieID` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `CT_UserMovie_UserID` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserMovie`
--

LOCK TABLES `UserMovie` WRITE;
/*!40000 ALTER TABLE `UserMovie` DISABLE KEYS */;
INSERT INTO `UserMovie` VALUES (1,0,1,1,9,1,1);
/*!40000 ALTER TABLE `UserMovie` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
