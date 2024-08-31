-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 31, 2024 at 09:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hikingbuddy`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `Articleid` char(7) NOT NULL,
  `Articletext` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Articlebrief` varchar(255) DEFAULT NULL,
  `Articletitle` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`Articleid`, `Articletext`, `Articlebrief`, `Articletitle`) VALUES
('AR99999', 'lorem lorem lorem', 'this is budi article', 'Budi artctic');

-- --------------------------------------------------------

--
-- Table structure for table `articleauthor`
--

CREATE TABLE `articleauthor` (
  `Articleid` char(7) DEFAULT NULL,
  `Userid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articleauthor`
--

INSERT INTO `articleauthor` (`Articleid`, `Userid`) VALUES
('AR99999', 'US99999');

-- --------------------------------------------------------

--
-- Table structure for table `articlecategory`
--

CREATE TABLE `articlecategory` (
  `Categoryid` char(7) NOT NULL,
  `Categoryname` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articlecategory`
--

INSERT INTO `articlecategory` (`Categoryid`, `Categoryname`) VALUES
('CT99997', 'Tourist Attraction'),
('CT99998', 'Review'),
('CT99999', 'Experience');

-- --------------------------------------------------------

--
-- Table structure for table `articlecategoryconnect`
--

CREATE TABLE `articlecategoryconnect` (
  `Categoryid` char(7) DEFAULT NULL,
  `Articleid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articlecategoryconnect`
--

INSERT INTO `articlecategoryconnect` (`Categoryid`, `Articleid`) VALUES
('CT99999', 'AR99999');

-- --------------------------------------------------------

--
-- Table structure for table `bagcarier`
--

CREATE TABLE `bagcarier` (
  `Bagcarierid` char(7) NOT NULL,
  `Bagcariername` varchar(30) DEFAULT NULL,
  `Bagcariercapacity` int(11) DEFAULT NULL,
  `CategoryRentid` char(7) DEFAULT NULL,
  `bagcarierprice` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bagcarier`
--

INSERT INTO `bagcarier` (`Bagcarierid`, `Bagcariername`, `Bagcariercapacity`, `CategoryRentid`, `bagcarierprice`) VALUES
('BC99995', 'Lim bag carier', 120, 'CR99998', 30000),
('BC99996', 'Jem carier', 90, 'CR99998', 10000),
('BC99997', 'Krem carier', 100, 'CR99998', 25000),
('BC99998', 'Fer bag carier', 150, 'CR99998', 40000),
('BC99999', 'Tambora carier', 100, 'CR99998', 28500);

-- --------------------------------------------------------

--
-- Table structure for table `businessunit`
--

CREATE TABLE `businessunit` (
  `BusinessUnitId` char(7) NOT NULL,
  `BusinessUnitName` text DEFAULT NULL,
  `BusinessUnitCategory` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `businessunit`
--

INSERT INTO `businessunit` (`BusinessUnitId`, `BusinessUnitName`, `BusinessUnitCategory`) VALUES
('BUI9997', 'Toko Oleh-Oleh Raung', 'Oleh-Oleh'),
('BUI9998', 'Toko Sebrbaguna Mas Andi', 'Makanan'),
('BUI9999', 'Warung Makan Tegal Beriman', 'Makanan');

-- --------------------------------------------------------

--
-- Table structure for table `businessunitproduct`
--

CREATE TABLE `businessunitproduct` (
  `BusinessUnitProductId` char(10) NOT NULL,
  `BusinessUnitProductName` varchar(30) DEFAULT NULL,
  `BusinessUnitProductPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `businessunitproduct`
--

INSERT INTO `businessunitproduct` (`BusinessUnitProductId`, `BusinessUnitProductName`, `BusinessUnitProductPrice`) VALUES
('ARBUI99915', 'Arem Arem', 3000),
('BABUI66612', 'Bakwan', 2000),
('BEBUI77671', 'Beng Beng', 1000),
('GUBUI99981', 'Gula Jawa', 1500),
('RIBUI99971', 'Risol Raung Punya', 2000);

-- --------------------------------------------------------

--
-- Table structure for table `businessunitproductconnect`
--

CREATE TABLE `businessunitproductconnect` (
  `BusinessUnitId` char(7) DEFAULT NULL,
  `BusinessUnitProductId` char(10) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `businessunitproductconnect`
--

INSERT INTO `businessunitproductconnect` (`BusinessUnitId`, `BusinessUnitProductId`, `Quantity`) VALUES
('BUI9997', 'RIBUI99971', 10),
('BUI9997', 'ARBUI99915', 10),
('BUI9997', 'BABUI66612', 10),
('BUI9997', 'BEBUI77671', 10),
('BUI9997', 'GUBUI99981', 10);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `Cartid` char(7) NOT NULL,
  `Userid` char(7) DEFAULT NULL,
  `TotalPriceCart` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cartbusinessunitproduct`
--

CREATE TABLE `cartbusinessunitproduct` (
  `Userid` char(7) DEFAULT NULL,
  `BusinessUnitProductId` char(10) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cartbusinessunitproduct`
--

INSERT INTO `cartbusinessunitproduct` (`Userid`, `BusinessUnitProductId`, `Quantity`) VALUES
('US99999', 'BABUI66612', 1),
('US99999', 'GUBUI99981', 1),
('US99999', 'RIBUI99971', 1),
('US99999', 'BEBUI77671', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categoryrent`
--

CREATE TABLE `categoryrent` (
  `CategoryRentid` char(7) NOT NULL,
  `CategoryRentname` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoryrent`
--

INSERT INTO `categoryrent` (`CategoryRentid`, `CategoryRentname`) VALUES
('CR99998', 'Bag carier'),
('CR99999', 'Tent');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `Commentid` char(7) NOT NULL,
  `Commentfill` varchar(200) DEFAULT NULL,
  `CommentCategoryid` char(7) DEFAULT NULL,
  `Userid` char(7) DEFAULT NULL,
  `CommentDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`Commentid`, `Commentfill`, `CommentCategoryid`, `Userid`, `CommentDate`) VALUES
('CME9998', 'wah bagus !', 'CCT9999', 'US99999', '2024-03-07'),
('CME9999', 'hallo ini keren', 'CCT9999', 'US58471', '2024-01-11');

-- --------------------------------------------------------

--
-- Table structure for table `commentcategory`
--

CREATE TABLE `commentcategory` (
  `CommentCategoryid` char(7) NOT NULL,
  `CommentCategoryname` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commentcategory`
--

INSERT INTO `commentcategory` (`CommentCategoryid`, `CommentCategoryname`) VALUES
('CCT9998', 'Sharing'),
('CCT9999', 'Review');

-- --------------------------------------------------------

--
-- Table structure for table `community`
--

CREATE TABLE `community` (
  `Communityid` char(7) NOT NULL,
  `CommunityName` varchar(100) DEFAULT NULL,
  `CommunityDateRelease` date DEFAULT NULL,
  `Communitydesc` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `community`
--

INSERT INTO `community` (`Communityid`, `CommunityName`, `CommunityDateRelease`, `Communitydesc`) VALUES
('CM99999', 'HikersNational', '2024-04-24', NULL),
('COM6483', 'hikers gamer', '2024-04-27', 'hello guys'),
('COM7675', 'pendaki handal', '2024-04-25', 'handalisme'),
('COM8924', 'sasa', '2024-04-25', 'sasa');

-- --------------------------------------------------------

--
-- Table structure for table `communitycommentconnect`
--

CREATE TABLE `communitycommentconnect` (
  `Commentid` char(7) DEFAULT NULL,
  `Communityid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `communitycommentconnect`
--

INSERT INTO `communitycommentconnect` (`Commentid`, `Communityid`) VALUES
('CME9999', 'COM6483'),
('CME9998', 'COM6483');

-- --------------------------------------------------------

--
-- Table structure for table `createcommunityconnect`
--

CREATE TABLE `createcommunityconnect` (
  `Userid` char(7) DEFAULT NULL,
  `Communityid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `createcommunityconnect`
--

INSERT INTO `createcommunityconnect` (`Userid`, `Communityid`) VALUES
('US99999', 'CM99999'),
('US99999', 'COM6554'),
('US99999', 'COM8924'),
('US99999', 'COM7675'),
('US99999', 'COM6483');

-- --------------------------------------------------------

--
-- Table structure for table `detailcartfood`
--

CREATE TABLE `detailcartfood` (
  `Cartid` char(7) DEFAULT NULL,
  `FoodCategoryid` char(7) DEFAULT NULL,
  `AddedDate` date DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detailcartrent`
--

CREATE TABLE `detailcartrent` (
  `Cartid` char(7) DEFAULT NULL,
  `CategoryRentid` char(7) DEFAULT NULL,
  `AddedDate` date DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `Foodid` char(7) NOT NULL,
  `Foodname` varchar(30) DEFAULT NULL,
  `FoodCategoryid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `foodcategory`
--

CREATE TABLE `foodcategory` (
  `Foodcategoryid` char(7) NOT NULL,
  `FoodCategoryname` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mountain`
--

CREATE TABLE `mountain` (
  `MountainId` char(7) NOT NULL,
  `MountainName` text DEFAULT NULL,
  `JarakPuncak` decimal(5,2) DEFAULT NULL,
  `Ketinggian` int(11) DEFAULT NULL,
  `StatusGunung` text DEFAULT NULL,
  `BriefGunung` text DEFAULT NULL,
  `City` text NOT NULL,
  `WaktuTempuh` int(11) NOT NULL,
  `Kesulitan` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mountain`
--

INSERT INTO `mountain` (`MountainId`, `MountainName`, `JarakPuncak`, `Ketinggian`, `StatusGunung`, `BriefGunung`, `City`, `WaktuTempuh`, `Kesulitan`) VALUES
('MN99996', 'Gunung Raung', 23.00, 2300, 'aktif', 'Gunung raung adalah gunung yang berada di Banywangi, Jawa Timur. Gunung Raung ini terletak di timur Jawa, Gunung Raung menjadi Gunung tertinggi keempat di pulau Jawa', 'Banyuwangi', 13, 'Sulit'),
('MN99997', 'Gunung Semeru', 34.00, 12000, 'tidak aktif', 'Gunung semeru adalah gunung yang berada di Jawa timur memiliki ketinggian 12000 mdpl', 'Malang', 12, 'Sulit'),
('MN99998', 'Gunung Gede', 25.80, 5000, 'aktif', 'Gunung gede adalah gunung yang terletak di kawasan bogor, memiliki ketinggian sekitan 5000 mdpl diatas permukaan laut. Gunung Gede memiliki beberapa savana luas di dekat puncak summit', 'Bogor', 10, 'Menengah'),
('MN99999', 'Rinjani', 20.00, 10000, 'aktif', 'gunung rinjani adalah gunung yang terletak di lombok', 'Lombok', 23, 'Menengah');

-- --------------------------------------------------------

--
-- Table structure for table `mountainconnect`
--

CREATE TABLE `mountainconnect` (
  `Mountainid` char(7) DEFAULT NULL,
  `BusinessUnitId` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mountainconnect`
--

INSERT INTO `mountainconnect` (`Mountainid`, `BusinessUnitId`) VALUES
('MN99996', 'BUI9999'),
('MN99996', 'BUI9998'),
('MN99996', 'BUI9997');

-- --------------------------------------------------------

--
-- Table structure for table `ratingconnect`
--

CREATE TABLE `ratingconnect` (
  `Userid` char(7) DEFAULT NULL,
  `Mountainid` char(7) DEFAULT NULL,
  `Rating` decimal(2,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratingconnect`
--

INSERT INTO `ratingconnect` (`Userid`, `Mountainid`, `Rating`) VALUES
('US99999', 'MN99999', 4.9),
('US99999', 'MN99998', 4.9),
('US99999', 'MN99997', 5.0),
('US99999', 'MN99996', 5.0);

-- --------------------------------------------------------

--
-- Table structure for table `replycomment`
--

CREATE TABLE `replycomment` (
  `Commentid` char(7) DEFAULT NULL,
  `Communityid` char(7) DEFAULT NULL,
  `ReplyCommentfill` varchar(200) DEFAULT NULL,
  `Userid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `replycomment`
--

INSERT INTO `replycomment` (`Commentid`, `Communityid`, `ReplyCommentfill`, `Userid`) VALUES
('CME9999', 'COM6483', 'IYA BENER KEREN', 'US58471');

-- --------------------------------------------------------

--
-- Table structure for table `tent`
--

CREATE TABLE `tent` (
  `Tentid` char(7) NOT NULL,
  `Tentname` varchar(150) DEFAULT NULL,
  `Tentcapacity` int(11) DEFAULT NULL,
  `isCarpet` tinyint(4) DEFAULT NULL,
  `CategoryRentid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tent`
--

INSERT INTO `tent` (`Tentid`, `Tentname`, `Tentcapacity`, `isCarpet`, `CategoryRentid`) VALUES
('TN99999', 'Eiger tent', 5, 0, 'CR99999');

-- --------------------------------------------------------

--
-- Table structure for table `transactionbuydetailfood`
--

CREATE TABLE `transactionbuydetailfood` (
  `Transactionid` char(7) DEFAULT NULL,
  `Foodid` char(7) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactionbuyfood`
--

CREATE TABLE `transactionbuyfood` (
  `Transactionid` char(7) NOT NULL,
  `Userid` char(7) DEFAULT NULL,
  `Transactiondate` date DEFAULT NULL,
  `Statustransaction` varchar(100) DEFAULT NULL,
  `Totalpayment` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactiondetailrentbag`
--

CREATE TABLE `transactiondetailrentbag` (
  `TransactionRentid` char(7) DEFAULT NULL,
  `Bagcarierid` char(7) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactiondetailrenttent`
--

CREATE TABLE `transactiondetailrenttent` (
  `TransactionRentid` char(7) DEFAULT NULL,
  `Tentid` char(7) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactionrentheader`
--

CREATE TABLE `transactionrentheader` (
  `TransactionRentid` char(7) NOT NULL,
  `Userid` char(7) DEFAULT NULL,
  `Transactiondate` date DEFAULT NULL,
  `Paymentstatus` varchar(100) DEFAULT NULL,
  `Statusrent` varchar(200) DEFAULT NULL,
  `Totalpayment` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactionrentheader`
--

INSERT INTO `transactionrentheader` (`TransactionRentid`, `Userid`, `Transactiondate`, `Paymentstatus`, `Statusrent`, `Totalpayment`) VALUES
('TR99999', 'US99999', '2024-01-04', 'success', 'keeped', 100000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Userid` char(7) NOT NULL,
  `Userfullname` varchar(255) DEFAULT NULL,
  `Userpassword` varchar(255) DEFAULT NULL,
  `Useremail` varchar(255) DEFAULT NULL,
  `UserDOB` date DEFAULT NULL,
  `Userrole` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Userid`, `Userfullname`, `Userpassword`, `Useremail`, `UserDOB`, `Userrole`) VALUES
('US36498', 'dimarco', 'Dimarco112', 'dimarco11@gmail.com', '2011-06-21', 'Customer'),
('US58471', 'tamiya', 'tamiya123', 'tamiya321@gmail.com', '2024-01-11', 'Customer'),
('US99999', 'Budi', 'budi123', 'budi@gmail.com', '2020-05-01', 'Customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`Articleid`);

--
-- Indexes for table `articleauthor`
--
ALTER TABLE `articleauthor`
  ADD KEY `Articleid` (`Articleid`),
  ADD KEY `Userid` (`Userid`);

--
-- Indexes for table `articlecategory`
--
ALTER TABLE `articlecategory`
  ADD PRIMARY KEY (`Categoryid`);

--
-- Indexes for table `articlecategoryconnect`
--
ALTER TABLE `articlecategoryconnect`
  ADD KEY `Categoryid` (`Categoryid`),
  ADD KEY `Articleid` (`Articleid`);

--
-- Indexes for table `bagcarier`
--
ALTER TABLE `bagcarier`
  ADD PRIMARY KEY (`Bagcarierid`),
  ADD KEY `CategoryRentid` (`CategoryRentid`);

--
-- Indexes for table `businessunit`
--
ALTER TABLE `businessunit`
  ADD PRIMARY KEY (`BusinessUnitId`);

--
-- Indexes for table `businessunitproduct`
--
ALTER TABLE `businessunitproduct`
  ADD PRIMARY KEY (`BusinessUnitProductId`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`Cartid`),
  ADD KEY `Userid` (`Userid`);

--
-- Indexes for table `categoryrent`
--
ALTER TABLE `categoryrent`
  ADD PRIMARY KEY (`CategoryRentid`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`Commentid`),
  ADD KEY `CommentCategoryid` (`CommentCategoryid`);

--
-- Indexes for table `commentcategory`
--
ALTER TABLE `commentcategory`
  ADD PRIMARY KEY (`CommentCategoryid`);

--
-- Indexes for table `community`
--
ALTER TABLE `community`
  ADD PRIMARY KEY (`Communityid`);

--
-- Indexes for table `communitycommentconnect`
--
ALTER TABLE `communitycommentconnect`
  ADD KEY `Commentid` (`Commentid`),
  ADD KEY `Communityid` (`Communityid`);

--
-- Indexes for table `createcommunityconnect`
--
ALTER TABLE `createcommunityconnect`
  ADD KEY `communityid_fk` (`Communityid`),
  ADD KEY `usid_fk` (`Userid`);

--
-- Indexes for table `detailcartfood`
--
ALTER TABLE `detailcartfood`
  ADD KEY `Cartid` (`Cartid`),
  ADD KEY `FoodCategoryid` (`FoodCategoryid`);

--
-- Indexes for table `detailcartrent`
--
ALTER TABLE `detailcartrent`
  ADD KEY `Cartid` (`Cartid`),
  ADD KEY `CategoryRentid` (`CategoryRentid`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`Foodid`),
  ADD KEY `FoodCategoryid` (`FoodCategoryid`);

--
-- Indexes for table `foodcategory`
--
ALTER TABLE `foodcategory`
  ADD PRIMARY KEY (`Foodcategoryid`);

--
-- Indexes for table `mountain`
--
ALTER TABLE `mountain`
  ADD PRIMARY KEY (`MountainId`);

--
-- Indexes for table `replycomment`
--
ALTER TABLE `replycomment`
  ADD KEY `Commentid` (`Commentid`),
  ADD KEY `Userid` (`Userid`);

--
-- Indexes for table `tent`
--
ALTER TABLE `tent`
  ADD PRIMARY KEY (`Tentid`),
  ADD KEY `CategoryRentid` (`CategoryRentid`);

--
-- Indexes for table `transactionbuydetailfood`
--
ALTER TABLE `transactionbuydetailfood`
  ADD KEY `Transactionid` (`Transactionid`),
  ADD KEY `Foodid` (`Foodid`);

--
-- Indexes for table `transactionbuyfood`
--
ALTER TABLE `transactionbuyfood`
  ADD PRIMARY KEY (`Transactionid`),
  ADD KEY `Userid` (`Userid`);

--
-- Indexes for table `transactiondetailrentbag`
--
ALTER TABLE `transactiondetailrentbag`
  ADD KEY `Bagcarierid` (`Bagcarierid`);

--
-- Indexes for table `transactiondetailrenttent`
--
ALTER TABLE `transactiondetailrenttent`
  ADD KEY `TransactionRentid` (`TransactionRentid`),
  ADD KEY `Tentid` (`Tentid`);

--
-- Indexes for table `transactionrentheader`
--
ALTER TABLE `transactionrentheader`
  ADD PRIMARY KEY (`TransactionRentid`),
  ADD KEY `Userid` (`Userid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Userid`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articleauthor`
--
ALTER TABLE `articleauthor`
  ADD CONSTRAINT `articleauthor_ibfk_1` FOREIGN KEY (`Articleid`) REFERENCES `article` (`Articleid`),
  ADD CONSTRAINT `articleauthor_ibfk_2` FOREIGN KEY (`Userid`) REFERENCES `users` (`Userid`);

--
-- Constraints for table `articlecategoryconnect`
--
ALTER TABLE `articlecategoryconnect`
  ADD CONSTRAINT `articlecategoryconnect_ibfk_1` FOREIGN KEY (`Categoryid`) REFERENCES `articlecategory` (`Categoryid`),
  ADD CONSTRAINT `articlecategoryconnect_ibfk_2` FOREIGN KEY (`Articleid`) REFERENCES `article` (`Articleid`);

--
-- Constraints for table `bagcarier`
--
ALTER TABLE `bagcarier`
  ADD CONSTRAINT `bagcarier_ibfk_1` FOREIGN KEY (`CategoryRentid`) REFERENCES `categoryrent` (`CategoryRentid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`Userid`) REFERENCES `users` (`Userid`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`CommentCategoryid`) REFERENCES `commentcategory` (`CommentCategoryid`);

--
-- Constraints for table `communitycommentconnect`
--
ALTER TABLE `communitycommentconnect`
  ADD CONSTRAINT `communitycommentconnect_ibfk_1` FOREIGN KEY (`Commentid`) REFERENCES `comment` (`Commentid`),
  ADD CONSTRAINT `communitycommentconnect_ibfk_2` FOREIGN KEY (`Communityid`) REFERENCES `community` (`Communityid`);

--
-- Constraints for table `detailcartfood`
--
ALTER TABLE `detailcartfood`
  ADD CONSTRAINT `detailcartfood_ibfk_1` FOREIGN KEY (`Cartid`) REFERENCES `cart` (`Cartid`),
  ADD CONSTRAINT `detailcartfood_ibfk_2` FOREIGN KEY (`FoodCategoryid`) REFERENCES `foodcategory` (`Foodcategoryid`);

--
-- Constraints for table `detailcartrent`
--
ALTER TABLE `detailcartrent`
  ADD CONSTRAINT `detailcartrent_ibfk_1` FOREIGN KEY (`Cartid`) REFERENCES `cart` (`Cartid`),
  ADD CONSTRAINT `detailcartrent_ibfk_2` FOREIGN KEY (`CategoryRentid`) REFERENCES `categoryrent` (`CategoryRentid`);

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `food_ibfk_1` FOREIGN KEY (`FoodCategoryid`) REFERENCES `foodcategory` (`Foodcategoryid`);

--
-- Constraints for table `replycomment`
--
ALTER TABLE `replycomment`
  ADD CONSTRAINT `replycomment_ibfk_1` FOREIGN KEY (`Commentid`) REFERENCES `comment` (`Commentid`),
  ADD CONSTRAINT `replycomment_ibfk_2` FOREIGN KEY (`Userid`) REFERENCES `users` (`Userid`);

--
-- Constraints for table `tent`
--
ALTER TABLE `tent`
  ADD CONSTRAINT `tent_ibfk_1` FOREIGN KEY (`CategoryRentid`) REFERENCES `categoryrent` (`CategoryRentid`);

--
-- Constraints for table `transactionbuydetailfood`
--
ALTER TABLE `transactionbuydetailfood`
  ADD CONSTRAINT `transactionbuydetailfood_ibfk_1` FOREIGN KEY (`Transactionid`) REFERENCES `transactionbuyfood` (`Transactionid`),
  ADD CONSTRAINT `transactionbuydetailfood_ibfk_2` FOREIGN KEY (`Foodid`) REFERENCES `food` (`Foodid`);

--
-- Constraints for table `transactionbuyfood`
--
ALTER TABLE `transactionbuyfood`
  ADD CONSTRAINT `transactionbuyfood_ibfk_1` FOREIGN KEY (`Userid`) REFERENCES `users` (`Userid`);

--
-- Constraints for table `transactiondetailrentbag`
--
ALTER TABLE `transactiondetailrentbag`
  ADD CONSTRAINT `transactiondetailrentbag_ibfk_1` FOREIGN KEY (`Bagcarierid`) REFERENCES `bagcarier` (`Bagcarierid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactiondetailrenttent`
--
ALTER TABLE `transactiondetailrenttent`
  ADD CONSTRAINT `transactiondetailrenttent_ibfk_1` FOREIGN KEY (`TransactionRentid`) REFERENCES `transactionrentheader` (`TransactionRentid`),
  ADD CONSTRAINT `transactiondetailrenttent_ibfk_2` FOREIGN KEY (`Tentid`) REFERENCES `tent` (`Tentid`);

--
-- Constraints for table `transactionrentheader`
--
ALTER TABLE `transactionrentheader`
  ADD CONSTRAINT `transactionrentheader_ibfk_1` FOREIGN KEY (`Userid`) REFERENCES `users` (`Userid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
