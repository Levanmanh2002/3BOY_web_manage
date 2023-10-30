-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: quanlykhachsan
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chucvu`
--

DROP TABLE IF EXISTS `chucvu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chucvu` (
  `MaChucVu` int NOT NULL AUTO_INCREMENT,
  `TenChucVu` varchar(50) NOT NULL,
  PRIMARY KEY (`MaChucVu`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chucvu`
--

LOCK TABLES `chucvu` WRITE;
/*!40000 ALTER TABLE `chucvu` DISABLE KEYS */;
INSERT INTO `chucvu` VALUES (1,'QUANLY'),(2,'TIEPTAN');
/*!40000 ALTER TABLE `chucvu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datphong`
--

DROP TABLE IF EXISTS `datphong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datphong` (
  `MaDatPhong` int NOT NULL AUTO_INCREMENT,
  `MaKhachHang` int DEFAULT NULL,
  `MaPhong` int NOT NULL,
  `NgayTao` date NOT NULL,
  `NgaySua` date NOT NULL,
  `NgayNhan` date NOT NULL,
  `NgayTra` date NOT NULL,
  `SoNgayThue` int NOT NULL,
  `NguoiLon` int NOT NULL,
  `TreEm` int NOT NULL,
  `GiaThue` bigint NOT NULL,
  `TongTien` bigint NOT NULL,
  `GhiChu` varchar(500) DEFAULT NULL,
  `MaNhanVien` int NOT NULL,
  `MaTrangThai` int NOT NULL,
  PRIMARY KEY (`MaDatPhong`),
  KEY `MaPhong` (`MaPhong`),
  KEY `MaNhanVien` (`MaNhanVien`),
  KEY `MaTrangThai` (`MaTrangThai`),
  KEY `datphong_ibfk_1` (`MaKhachHang`),
  CONSTRAINT `datphong_ibfk_1` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhang` (`MaKhachHang`),
  CONSTRAINT `datphong_ibfk_2` FOREIGN KEY (`MaPhong`) REFERENCES `phong` (`MaPhong`),
  CONSTRAINT `datphong_ibfk_3` FOREIGN KEY (`MaNhanVien`) REFERENCES `nhanvien` (`MaNhanVien`),
  CONSTRAINT `datphong_ibfk_4` FOREIGN KEY (`MaTrangThai`) REFERENCES `trangthaidat` (`MaTrangThai`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datphong`
--

LOCK TABLES `datphong` WRITE;
/*!40000 ALTER TABLE `datphong` DISABLE KEYS */;
INSERT INTO `datphong` VALUES (42,26,10,'2023-05-08','2023-05-08','2023-05-04','2023-05-11',7,2,1,3000000,21000000,NULL,1,1);
/*!40000 ALTER TABLE `datphong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `MaKhachHang` int NOT NULL AUTO_INCREMENT,
  `TaiKhoan` varchar(50) DEFAULT NULL,
  `MatKhau` varchar(500) DEFAULT NULL,
  `HoTen` varchar(50) DEFAULT NULL,
  `NgaySinh` date DEFAULT NULL,
  `DiaChi` varchar(100) DEFAULT NULL,
  `SDT` varchar(20) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`MaKhachHang`),
  UNIQUE KEY `TaiKhoan` (`TaiKhoan`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES (1,'user1','$2a$08$.PJh5tJlLXUq0YrTH90vU.tasQGapTrspaiWvHR1JDDnrktMoX/O.','Nguyen Van A','1999-12-31','Ha Noi','0987654322','user1@gmail.com'),(2,'user2','$2a$08$spDgicWor8xuZv2/Ppf9wO6UC1.YpN3CGVUq1gBqovy9shKxJdp5O','Nguyen Van B','1998-05-06','Hai Phong','0912345678','user2@gmail.com'),(3,'user3','654456','Tran Thi C','2002-10-25','Ho Chi Minh','0901234567','user3@gmail.com'),(26,'nhombaocao3','$2a$08$OzuQ455Ib/SaepFYvKfoIukxGOZGLPI1LHZoKokqsUcSvt3ZT7e6q','Nhóm 3','2002-06-28','Biên Hòa','12345678','shinno2107@gmail.com');
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaiphong`
--

DROP TABLE IF EXISTS `loaiphong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaiphong` (
  `MaLoaiPhong` int NOT NULL AUTO_INCREMENT,
  `TenLoaiPhong` varchar(50) NOT NULL,
  `GiaThue` bigint NOT NULL,
  PRIMARY KEY (`MaLoaiPhong`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaiphong`
--

LOCK TABLES `loaiphong` WRITE;
/*!40000 ALTER TABLE `loaiphong` DISABLE KEYS */;
INSERT INTO `loaiphong` VALUES (1,'Phòng đơn',1000000),(2,'Phòng đôi',1500000),(3,'Phòng gia đình',2500000),(4,'Phòng VIP',3000000);
/*!40000 ALTER TABLE `loaiphong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `luongnhanvien`
--

DROP TABLE IF EXISTS `luongnhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `luongnhanvien` (
  `MaNhanVien` int NOT NULL,
  `LuongCB` bigint NOT NULL,
  `Thuong` bigint DEFAULT NULL,
  `GhiChu` varchar(500) DEFAULT NULL,
  KEY `MaNhanVien` (`MaNhanVien`),
  CONSTRAINT `luongnhanvien_ibfk_1` FOREIGN KEY (`MaNhanVien`) REFERENCES `nhanvien` (`MaNhanVien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `luongnhanvien`
--

LOCK TABLES `luongnhanvien` WRITE;
/*!40000 ALTER TABLE `luongnhanvien` DISABLE KEYS */;
INSERT INTO `luongnhanvien` VALUES (1,10000000,100000,''),(2,5000000,500000,''),(3,3000000,100000,'');
/*!40000 ALTER TABLE `luongnhanvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhanvien` (
  `MaNhanVien` int NOT NULL AUTO_INCREMENT,
  `TaiKhoan` varchar(50) NOT NULL,
  `MatKhau` varchar(500) NOT NULL,
  `HoTen` varchar(50) NOT NULL,
  `NgaySinh` date DEFAULT NULL,
  `DiaChi` varchar(100) DEFAULT NULL,
  `SDT` varchar(20) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `MaChucVu` int NOT NULL,
  PRIMARY KEY (`MaNhanVien`),
  UNIQUE KEY `TaiKhoan` (`TaiKhoan`),
  KEY `MaChucVu` (`MaChucVu`),
  CONSTRAINT `nhanvien_ibfk_1` FOREIGN KEY (`MaChucVu`) REFERENCES `chucvu` (`MaChucVu`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhanvien`
--

LOCK TABLES `nhanvien` WRITE;
/*!40000 ALTER TABLE `nhanvien` DISABLE KEYS */;
INSERT INTO `nhanvien` VALUES (1,'admin','$2a$08$lWyzDHafDtsw59REiZLXje6hItBqvhtLAgGTaF11b9G1Zqwt69Yue','Nguyen Van Aád','1989-12-22','Ha Noi','0123456789','nguyenvana@gmail.com',1),(2,'tieptan','123456','Nguyen Thi B','1995-02-02','Hai Phong','0123456789','nguyenthid@gmail.com',2),(3,'tieptan2','$2a$08$3wNUMMhR.xF6D9GJj/pB8u61n53aF35Bb2BundBPmb8Wu9ccOVYuu','Le Van C','1998-03-01','Sai Gon','0123456789','levanc@gmail.com',2),(48,'manhle','$2a$08$ykiY2uBZay1Q0JwOG5gMB.KESv.whOCbxrrmJwCicltMwXVatmuoi','Lê Mạnh','2023-04-30','Biên Hòa','1234567','manh@gmail.com',2),(49,'admin12345','$2a$08$2H3GPlfL7RkulM5oNUup6OllPzuMg0xN404c6FWE.esSdZBH6t/xG','Lê Văn Mạnh','2023-05-24','BIÊN hÒA','0123456897','manhle@gmail.com',1);
/*!40000 ALTER TABLE `nhanvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phong`
--

DROP TABLE IF EXISTS `phong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phong` (
  `MaPhong` int NOT NULL AUTO_INCREMENT,
  `TenPhong` varchar(50) NOT NULL,
  `MaLoaiPhong` int NOT NULL,
  `MaTinhTrang` int NOT NULL,
  PRIMARY KEY (`MaPhong`),
  KEY `MaLoaiPhong` (`MaLoaiPhong`),
  KEY `MaTinhTrang` (`MaTinhTrang`),
  CONSTRAINT `phong_ibfk_1` FOREIGN KEY (`MaLoaiPhong`) REFERENCES `loaiphong` (`MaLoaiPhong`),
  CONSTRAINT `phong_ibfk_2` FOREIGN KEY (`MaTinhTrang`) REFERENCES `tinhtrangphong` (`MaTinhTrang`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phong`
--

LOCK TABLES `phong` WRITE;
/*!40000 ALTER TABLE `phong` DISABLE KEYS */;
INSERT INTO `phong` VALUES (1,'101',1,1),(2,'102',1,1),(3,'201',2,2),(4,'202',2,1),(5,'301',3,2),(6,'302',4,3),(10,'134',4,1);
/*!40000 ALTER TABLE `phong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phuthudatphong`
--

DROP TABLE IF EXISTS `phuthudatphong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phuthudatphong` (
  `MaDatPhong` int NOT NULL,
  `PhuThu` bigint DEFAULT NULL,
  `LyDo` varchar(500) DEFAULT NULL,
  `GhiChu` varchar(500) DEFAULT NULL,
  `NgayTao` date DEFAULT NULL,
  `MaNhanVien` int DEFAULT NULL,
  PRIMARY KEY (`MaDatPhong`),
  KEY `phuthudatphong_ibfk_2` (`MaNhanVien`),
  CONSTRAINT `phuthudatphong_ibfk_1` FOREIGN KEY (`MaDatPhong`) REFERENCES `datphong` (`MaDatPhong`),
  CONSTRAINT `phuthudatphong_ibfk_2` FOREIGN KEY (`MaNhanVien`) REFERENCES `nhanvien` (`MaNhanVien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phuthudatphong`
--

LOCK TABLES `phuthudatphong` WRITE;
/*!40000 ALTER TABLE `phuthudatphong` DISABLE KEYS */;
/*!40000 ALTER TABLE `phuthudatphong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tinhtrangphong`
--

DROP TABLE IF EXISTS `tinhtrangphong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tinhtrangphong` (
  `MaTinhTrang` int NOT NULL AUTO_INCREMENT,
  `TenTinhTrang` varchar(50) NOT NULL,
  PRIMARY KEY (`MaTinhTrang`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tinhtrangphong`
--

LOCK TABLES `tinhtrangphong` WRITE;
/*!40000 ALTER TABLE `tinhtrangphong` DISABLE KEYS */;
INSERT INTO `tinhtrangphong` VALUES (1,'Sẵn sàng'),(2,'Đang thuê'),(3,'Đang sửa chữa');
/*!40000 ALTER TABLE `tinhtrangphong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trangthaidat`
--

DROP TABLE IF EXISTS `trangthaidat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trangthaidat` (
  `MaTrangThai` int NOT NULL AUTO_INCREMENT,
  `TenTrangThai` varchar(50) NOT NULL,
  PRIMARY KEY (`MaTrangThai`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trangthaidat`
--

LOCK TABLES `trangthaidat` WRITE;
/*!40000 ALTER TABLE `trangthaidat` DISABLE KEYS */;
INSERT INTO `trangthaidat` VALUES (1,'Đã đặt'),(2,'Đang sử dụng'),(3,'Đã trả'),(4,'Đã hủy');
/*!40000 ALTER TABLE `trangthaidat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-09 21:22:58
