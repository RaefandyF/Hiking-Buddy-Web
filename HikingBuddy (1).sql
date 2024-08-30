-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 29 Agu 2024 pada 04.30
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `HikingBuddy`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `Article`
--

CREATE TABLE `Article` (
  `Articleid` char(7) NOT NULL,
  `Articletext` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Articlebrief` varchar(255) DEFAULT NULL,
  `Articletitle` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Article`
--

INSERT INTO `Article` (`Articleid`, `Articletext`, `Articlebrief`, `Articletitle`) VALUES
('AR99999', 'lorem lorem lorem', 'this is budi article', 'Budi artctic');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ArticleAuthor`
--

CREATE TABLE `ArticleAuthor` (
  `Articleid` char(7) DEFAULT NULL,
  `Userid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `ArticleAuthor`
--

INSERT INTO `ArticleAuthor` (`Articleid`, `Userid`) VALUES
('AR99999', 'US99999');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ArticleCategory`
--

CREATE TABLE `ArticleCategory` (
  `Categoryid` char(7) NOT NULL,
  `Categoryname` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `ArticleCategory`
--

INSERT INTO `ArticleCategory` (`Categoryid`, `Categoryname`) VALUES
('CT99997', 'Tourist Attraction'),
('CT99998', 'Review'),
('CT99999', 'Experience');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ArticleCategoryConnect`
--

CREATE TABLE `ArticleCategoryConnect` (
  `Categoryid` char(7) DEFAULT NULL,
  `Articleid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `ArticleCategoryConnect`
--

INSERT INTO `ArticleCategoryConnect` (`Categoryid`, `Articleid`) VALUES
('CT99999', 'AR99999');

-- --------------------------------------------------------

--
-- Struktur dari tabel `BagCarier`
--

CREATE TABLE `BagCarier` (
  `Bagcarierid` char(7) NOT NULL,
  `Bagcariername` varchar(30) DEFAULT NULL,
  `Bagcariercapacity` int(11) DEFAULT NULL,
  `CategoryRentid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `BusinessUnit`
--

CREATE TABLE `BusinessUnit` (
  `BusinessUnitId` char(7) NOT NULL,
  `BusinessUnitName` text DEFAULT NULL,
  `BusinessUnitCategory` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `BusinessUnit`
--

INSERT INTO `BusinessUnit` (`BusinessUnitId`, `BusinessUnitName`, `BusinessUnitCategory`) VALUES
('BUI9997', 'Toko Oleh-Oleh Raung', 'Oleh-Oleh'),
('BUI9998', 'Toko Sebrbaguna Mas Andi', 'Makanan'),
('BUI9999', 'Warung Makan Tegal Beriman', 'Makanan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `BusinessUnitProduct`
--

CREATE TABLE `BusinessUnitProduct` (
  `BusinessUnitProductId` char(10) NOT NULL,
  `BusinessUnitProductName` varchar(30) DEFAULT NULL,
  `BusinessUnitProductPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `BusinessUnitProduct`
--

INSERT INTO `BusinessUnitProduct` (`BusinessUnitProductId`, `BusinessUnitProductName`, `BusinessUnitProductPrice`) VALUES
('ARBUI99915', 'Arem Arem', 3000),
('BABUI66612', 'Bakwan', 2000),
('BEBUI77671', 'Beng Beng', 1000),
('GUBUI99981', 'Gula Jawa', 1500),
('RIBUI99971', 'Risol Raung Punya', 2000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `BusinessUnitProductConnect`
--

CREATE TABLE `BusinessUnitProductConnect` (
  `BusinessUnitId` char(7) DEFAULT NULL,
  `BusinessUnitProductId` char(10) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `BusinessUnitProductConnect`
--

INSERT INTO `BusinessUnitProductConnect` (`BusinessUnitId`, `BusinessUnitProductId`, `Quantity`) VALUES
('BUI9997', 'RIBUI99971', 10),
('BUI9997', 'ARBUI99915', 10),
('BUI9997', 'BABUI66612', 10),
('BUI9997', 'BEBUI77671', 10),
('BUI9997', 'GUBUI99981', 10);

-- --------------------------------------------------------

--
-- Struktur dari tabel `Cart`
--

CREATE TABLE `Cart` (
  `Cartid` char(7) NOT NULL,
  `Userid` char(7) DEFAULT NULL,
  `TotalPriceCart` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `CartBusinessUnitProduct`
--

CREATE TABLE `CartBusinessUnitProduct` (
  `Userid` char(7) DEFAULT NULL,
  `BusinessUnitProductId` char(10) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `CartBusinessUnitProduct`
--

INSERT INTO `CartBusinessUnitProduct` (`Userid`, `BusinessUnitProductId`, `Quantity`) VALUES
('US99999', 'ARBUI99915', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `CategoryRent`
--

CREATE TABLE `CategoryRent` (
  `CategoryRentid` char(7) NOT NULL,
  `CategoryRentname` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `CategoryRent`
--

INSERT INTO `CategoryRent` (`CategoryRentid`, `CategoryRentname`) VALUES
('CR99999', 'Tent');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Comment`
--

CREATE TABLE `Comment` (
  `Commentid` char(7) NOT NULL,
  `Commentfill` varchar(200) DEFAULT NULL,
  `CommentCategoryid` char(7) DEFAULT NULL,
  `Userid` char(7) DEFAULT NULL,
  `CommentDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Comment`
--

INSERT INTO `Comment` (`Commentid`, `Commentfill`, `CommentCategoryid`, `Userid`, `CommentDate`) VALUES
('CME9998', 'wah bagus !', 'CCT9999', 'US99999', '2024-03-07'),
('CME9999', 'hallo ini keren', 'CCT9999', 'US58471', '2024-01-11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `CommentCategory`
--

CREATE TABLE `CommentCategory` (
  `CommentCategoryid` char(7) NOT NULL,
  `CommentCategoryname` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `CommentCategory`
--

INSERT INTO `CommentCategory` (`CommentCategoryid`, `CommentCategoryname`) VALUES
('CCT9998', 'Sharing'),
('CCT9999', 'Review');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Community`
--

CREATE TABLE `Community` (
  `Communityid` char(7) NOT NULL,
  `CommunityName` varchar(100) DEFAULT NULL,
  `CommunityDateRelease` date DEFAULT NULL,
  `Communitydesc` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Community`
--

INSERT INTO `Community` (`Communityid`, `CommunityName`, `CommunityDateRelease`, `Communitydesc`) VALUES
('CM99999', 'HikersNational', '2024-04-24', NULL),
('COM6483', 'hikers gamer', '2024-04-27', 'hello guys'),
('COM7675', 'pendaki handal', '2024-04-25', 'handalisme'),
('COM8924', 'sasa', '2024-04-25', 'sasa');

-- --------------------------------------------------------

--
-- Struktur dari tabel `CommunityCommentConnect`
--

CREATE TABLE `CommunityCommentConnect` (
  `Commentid` char(7) DEFAULT NULL,
  `Communityid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `CommunityCommentConnect`
--

INSERT INTO `CommunityCommentConnect` (`Commentid`, `Communityid`) VALUES
('CME9999', 'COM6483'),
('CME9998', 'COM6483');

-- --------------------------------------------------------

--
-- Struktur dari tabel `CreateCommunityConnect`
--

CREATE TABLE `CreateCommunityConnect` (
  `Userid` char(7) DEFAULT NULL,
  `Communityid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `CreateCommunityConnect`
--

INSERT INTO `CreateCommunityConnect` (`Userid`, `Communityid`) VALUES
('US99999', 'CM99999'),
('US99999', 'COM6554'),
('US99999', 'COM8924'),
('US99999', 'COM7675'),
('US99999', 'COM6483');

-- --------------------------------------------------------

--
-- Struktur dari tabel `DetailCartFood`
--

CREATE TABLE `DetailCartFood` (
  `Cartid` char(7) DEFAULT NULL,
  `FoodCategoryid` char(7) DEFAULT NULL,
  `AddedDate` date DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `DetailCartRent`
--

CREATE TABLE `DetailCartRent` (
  `Cartid` char(7) DEFAULT NULL,
  `CategoryRentid` char(7) DEFAULT NULL,
  `AddedDate` date DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Food`
--

CREATE TABLE `Food` (
  `Foodid` char(7) NOT NULL,
  `Foodname` varchar(30) DEFAULT NULL,
  `FoodCategoryid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `FoodCategory`
--

CREATE TABLE `FoodCategory` (
  `Foodcategoryid` char(7) NOT NULL,
  `FoodCategoryname` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Mountain`
--

CREATE TABLE `Mountain` (
  `MountainId` char(7) NOT NULL,
  `MountainName` text DEFAULT NULL,
  `JarakPuncak` decimal(5,2) DEFAULT NULL,
  `Ketinggian` int(11) DEFAULT NULL,
  `StatusGunung` text DEFAULT NULL,
  `BriefGunung` text DEFAULT NULL,
  `City` text NOT NULL,
  `WaktuTempuh` int(11) NOT NULL,
  `Kesulitan` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Mountain`
--

INSERT INTO `Mountain` (`MountainId`, `MountainName`, `JarakPuncak`, `Ketinggian`, `StatusGunung`, `BriefGunung`, `City`, `WaktuTempuh`, `Kesulitan`) VALUES
('MN99996', 'Gunung Raung', '23.00', 2300, 'aktif', 'Gunung raung adalah gunung yang berada di Banywangi, Jawa Timur. Gunung Raung ini terletak di timur Jawa, Gunung Raung menjadi Gunung tertinggi keempat di pulau Jawa', 'Banyuwangi', 13, 'Sulit'),
('MN99997', 'Gunung Semeru', '34.00', 12000, 'tidak aktif', 'Gunung semeru adalah gunung yang berada di Jawa timur memiliki ketinggian 12000 mdpl', 'Malang', 12, 'Sulit'),
('MN99998', 'Gunung Gede', '25.80', 5000, 'aktif', 'Gunung gede adalah gunung yang terletak di kawasan bogor, memiliki ketinggian sekitan 5000 mdpl diatas permukaan laut. Gunung Gede memiliki beberapa savana luas di dekat puncak summit', 'Bogor', 10, 'Menengah'),
('MN99999', 'Rinjani', '20.00', 10000, 'aktif', 'gunung rinjani adalah gunung yang terletak di lombok', 'Lombok', 23, 'Menengah');

-- --------------------------------------------------------

--
-- Struktur dari tabel `MountainConnect`
--

CREATE TABLE `MountainConnect` (
  `Mountainid` char(7) DEFAULT NULL,
  `BusinessUnitId` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `MountainConnect`
--

INSERT INTO `MountainConnect` (`Mountainid`, `BusinessUnitId`) VALUES
('MN99996', 'BUI9999'),
('MN99996', 'BUI9998'),
('MN99996', 'BUI9997');

-- --------------------------------------------------------

--
-- Struktur dari tabel `RatingConnect`
--

CREATE TABLE `RatingConnect` (
  `Userid` char(7) DEFAULT NULL,
  `Mountainid` char(7) DEFAULT NULL,
  `Rating` decimal(2,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `RatingConnect`
--

INSERT INTO `RatingConnect` (`Userid`, `Mountainid`, `Rating`) VALUES
('US99999', 'MN99999', '4.9'),
('US99999', 'MN99998', '4.9'),
('US99999', 'MN99997', '5.0'),
('US99999', 'MN99996', '5.0');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ReplyComment`
--

CREATE TABLE `ReplyComment` (
  `Commentid` char(7) DEFAULT NULL,
  `Communityid` char(7) DEFAULT NULL,
  `ReplyCommentfill` varchar(200) DEFAULT NULL,
  `Userid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `ReplyComment`
--

INSERT INTO `ReplyComment` (`Commentid`, `Communityid`, `ReplyCommentfill`, `Userid`) VALUES
('CME9999', 'COM6483', 'IYA BENER KEREN', 'US58471');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Tent`
--

CREATE TABLE `Tent` (
  `Tentid` char(7) NOT NULL,
  `Tentname` varchar(150) DEFAULT NULL,
  `Tentcapacity` int(11) DEFAULT NULL,
  `isCarpet` tinyint(4) DEFAULT NULL,
  `CategoryRentid` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Tent`
--

INSERT INTO `Tent` (`Tentid`, `Tentname`, `Tentcapacity`, `isCarpet`, `CategoryRentid`) VALUES
('TN99999', 'Eiger tent', 5, 0, 'CR99999');

-- --------------------------------------------------------

--
-- Struktur dari tabel `TransactionBuydetailFood`
--

CREATE TABLE `TransactionBuydetailFood` (
  `Transactionid` char(7) DEFAULT NULL,
  `Foodid` char(7) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `TransactionBuyFood`
--

CREATE TABLE `TransactionBuyFood` (
  `Transactionid` char(7) NOT NULL,
  `Userid` char(7) DEFAULT NULL,
  `Transactiondate` date DEFAULT NULL,
  `Statustransaction` varchar(100) DEFAULT NULL,
  `Totalpayment` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `TransactionDetailRentBag`
--

CREATE TABLE `TransactionDetailRentBag` (
  `TransactionRentid` char(7) DEFAULT NULL,
  `Bagcarierid` char(7) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `TransactionDetailRentTent`
--

CREATE TABLE `TransactionDetailRentTent` (
  `TransactionRentid` char(7) DEFAULT NULL,
  `Tentid` char(7) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `TransactionRentHeader`
--

CREATE TABLE `TransactionRentHeader` (
  `TransactionRentid` char(7) NOT NULL,
  `Userid` char(7) DEFAULT NULL,
  `Transactiondate` date DEFAULT NULL,
  `Paymentstatus` varchar(100) DEFAULT NULL,
  `Statusrent` varchar(200) DEFAULT NULL,
  `Totalpayment` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `TransactionRentHeader`
--

INSERT INTO `TransactionRentHeader` (`TransactionRentid`, `Userid`, `Transactiondate`, `Paymentstatus`, `Statusrent`, `Totalpayment`) VALUES
('TR99999', 'US99999', '2024-01-04', 'success', 'keeped', 100000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `Users`
--

CREATE TABLE `Users` (
  `Userid` char(7) NOT NULL,
  `Userfullname` varchar(255) DEFAULT NULL,
  `Userpassword` varchar(255) DEFAULT NULL,
  `Useremail` varchar(255) DEFAULT NULL,
  `UserDOB` date DEFAULT NULL,
  `Userrole` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Users`
--

INSERT INTO `Users` (`Userid`, `Userfullname`, `Userpassword`, `Useremail`, `UserDOB`, `Userrole`) VALUES
('US36498', 'dimarco', 'Dimarco112', 'dimarco11@gmail.com', '2011-06-21', 'Customer'),
('US58471', 'tamiya', 'tamiya123', 'tamiya321@gmail.com', '2024-01-11', 'Customer'),
('US99999', 'Budi', 'budi123', 'budi@gmail.com', '2020-05-01', 'Customer');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `Article`
--
ALTER TABLE `Article`
  ADD PRIMARY KEY (`Articleid`);

--
-- Indeks untuk tabel `ArticleAuthor`
--
ALTER TABLE `ArticleAuthor`
  ADD KEY `Articleid` (`Articleid`),
  ADD KEY `Userid` (`Userid`);

--
-- Indeks untuk tabel `ArticleCategory`
--
ALTER TABLE `ArticleCategory`
  ADD PRIMARY KEY (`Categoryid`);

--
-- Indeks untuk tabel `ArticleCategoryConnect`
--
ALTER TABLE `ArticleCategoryConnect`
  ADD KEY `Categoryid` (`Categoryid`),
  ADD KEY `Articleid` (`Articleid`);

--
-- Indeks untuk tabel `BagCarier`
--
ALTER TABLE `BagCarier`
  ADD PRIMARY KEY (`Bagcarierid`),
  ADD KEY `CategoryRentid` (`CategoryRentid`);

--
-- Indeks untuk tabel `BusinessUnit`
--
ALTER TABLE `BusinessUnit`
  ADD PRIMARY KEY (`BusinessUnitId`);

--
-- Indeks untuk tabel `BusinessUnitProduct`
--
ALTER TABLE `BusinessUnitProduct`
  ADD PRIMARY KEY (`BusinessUnitProductId`);

--
-- Indeks untuk tabel `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`Cartid`),
  ADD KEY `Userid` (`Userid`);

--
-- Indeks untuk tabel `CategoryRent`
--
ALTER TABLE `CategoryRent`
  ADD PRIMARY KEY (`CategoryRentid`);

--
-- Indeks untuk tabel `Comment`
--
ALTER TABLE `Comment`
  ADD PRIMARY KEY (`Commentid`),
  ADD KEY `CommentCategoryid` (`CommentCategoryid`);

--
-- Indeks untuk tabel `CommentCategory`
--
ALTER TABLE `CommentCategory`
  ADD PRIMARY KEY (`CommentCategoryid`);

--
-- Indeks untuk tabel `Community`
--
ALTER TABLE `Community`
  ADD PRIMARY KEY (`Communityid`);

--
-- Indeks untuk tabel `CommunityCommentConnect`
--
ALTER TABLE `CommunityCommentConnect`
  ADD KEY `Commentid` (`Commentid`),
  ADD KEY `Communityid` (`Communityid`);

--
-- Indeks untuk tabel `CreateCommunityConnect`
--
ALTER TABLE `CreateCommunityConnect`
  ADD KEY `communityid_fk` (`Communityid`),
  ADD KEY `usid_fk` (`Userid`);

--
-- Indeks untuk tabel `DetailCartFood`
--
ALTER TABLE `DetailCartFood`
  ADD KEY `Cartid` (`Cartid`),
  ADD KEY `FoodCategoryid` (`FoodCategoryid`);

--
-- Indeks untuk tabel `DetailCartRent`
--
ALTER TABLE `DetailCartRent`
  ADD KEY `Cartid` (`Cartid`),
  ADD KEY `CategoryRentid` (`CategoryRentid`);

--
-- Indeks untuk tabel `Food`
--
ALTER TABLE `Food`
  ADD PRIMARY KEY (`Foodid`),
  ADD KEY `FoodCategoryid` (`FoodCategoryid`);

--
-- Indeks untuk tabel `FoodCategory`
--
ALTER TABLE `FoodCategory`
  ADD PRIMARY KEY (`Foodcategoryid`);

--
-- Indeks untuk tabel `Mountain`
--
ALTER TABLE `Mountain`
  ADD PRIMARY KEY (`MountainId`);

--
-- Indeks untuk tabel `ReplyComment`
--
ALTER TABLE `ReplyComment`
  ADD KEY `Commentid` (`Commentid`),
  ADD KEY `Userid` (`Userid`);

--
-- Indeks untuk tabel `Tent`
--
ALTER TABLE `Tent`
  ADD PRIMARY KEY (`Tentid`),
  ADD KEY `CategoryRentid` (`CategoryRentid`);

--
-- Indeks untuk tabel `TransactionBuydetailFood`
--
ALTER TABLE `TransactionBuydetailFood`
  ADD KEY `Transactionid` (`Transactionid`),
  ADD KEY `Foodid` (`Foodid`);

--
-- Indeks untuk tabel `TransactionBuyFood`
--
ALTER TABLE `TransactionBuyFood`
  ADD PRIMARY KEY (`Transactionid`),
  ADD KEY `Userid` (`Userid`);

--
-- Indeks untuk tabel `TransactionDetailRentBag`
--
ALTER TABLE `TransactionDetailRentBag`
  ADD KEY `Bagcarierid` (`Bagcarierid`);

--
-- Indeks untuk tabel `TransactionDetailRentTent`
--
ALTER TABLE `TransactionDetailRentTent`
  ADD KEY `TransactionRentid` (`TransactionRentid`),
  ADD KEY `Tentid` (`Tentid`);

--
-- Indeks untuk tabel `TransactionRentHeader`
--
ALTER TABLE `TransactionRentHeader`
  ADD PRIMARY KEY (`TransactionRentid`),
  ADD KEY `Userid` (`Userid`);

--
-- Indeks untuk tabel `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`Userid`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `ArticleAuthor`
--
ALTER TABLE `ArticleAuthor`
  ADD CONSTRAINT `articleauthor_ibfk_1` FOREIGN KEY (`Articleid`) REFERENCES `Article` (`Articleid`),
  ADD CONSTRAINT `articleauthor_ibfk_2` FOREIGN KEY (`Userid`) REFERENCES `Users` (`Userid`);

--
-- Ketidakleluasaan untuk tabel `ArticleCategoryConnect`
--
ALTER TABLE `ArticleCategoryConnect`
  ADD CONSTRAINT `articlecategoryconnect_ibfk_1` FOREIGN KEY (`Categoryid`) REFERENCES `ArticleCategory` (`Categoryid`),
  ADD CONSTRAINT `articlecategoryconnect_ibfk_2` FOREIGN KEY (`Articleid`) REFERENCES `Article` (`Articleid`);

--
-- Ketidakleluasaan untuk tabel `BagCarier`
--
ALTER TABLE `BagCarier`
  ADD CONSTRAINT `bagcarier_ibfk_1` FOREIGN KEY (`CategoryRentid`) REFERENCES `CategoryRent` (`CategoryRentid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`Userid`) REFERENCES `Users` (`Userid`);

--
-- Ketidakleluasaan untuk tabel `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`CommentCategoryid`) REFERENCES `CommentCategory` (`CommentCategoryid`);

--
-- Ketidakleluasaan untuk tabel `CommunityCommentConnect`
--
ALTER TABLE `CommunityCommentConnect`
  ADD CONSTRAINT `communitycommentconnect_ibfk_1` FOREIGN KEY (`Commentid`) REFERENCES `Comment` (`Commentid`),
  ADD CONSTRAINT `communitycommentconnect_ibfk_2` FOREIGN KEY (`Communityid`) REFERENCES `Community` (`Communityid`);

--
-- Ketidakleluasaan untuk tabel `DetailCartFood`
--
ALTER TABLE `DetailCartFood`
  ADD CONSTRAINT `detailcartfood_ibfk_1` FOREIGN KEY (`Cartid`) REFERENCES `Cart` (`Cartid`),
  ADD CONSTRAINT `detailcartfood_ibfk_2` FOREIGN KEY (`FoodCategoryid`) REFERENCES `FoodCategory` (`Foodcategoryid`);

--
-- Ketidakleluasaan untuk tabel `DetailCartRent`
--
ALTER TABLE `DetailCartRent`
  ADD CONSTRAINT `detailcartrent_ibfk_1` FOREIGN KEY (`Cartid`) REFERENCES `Cart` (`Cartid`),
  ADD CONSTRAINT `detailcartrent_ibfk_2` FOREIGN KEY (`CategoryRentid`) REFERENCES `CategoryRent` (`CategoryRentid`);

--
-- Ketidakleluasaan untuk tabel `Food`
--
ALTER TABLE `Food`
  ADD CONSTRAINT `food_ibfk_1` FOREIGN KEY (`FoodCategoryid`) REFERENCES `FoodCategory` (`Foodcategoryid`);

--
-- Ketidakleluasaan untuk tabel `ReplyComment`
--
ALTER TABLE `ReplyComment`
  ADD CONSTRAINT `replycomment_ibfk_1` FOREIGN KEY (`Commentid`) REFERENCES `Comment` (`Commentid`),
  ADD CONSTRAINT `replycomment_ibfk_2` FOREIGN KEY (`Userid`) REFERENCES `Users` (`Userid`);

--
-- Ketidakleluasaan untuk tabel `Tent`
--
ALTER TABLE `Tent`
  ADD CONSTRAINT `tent_ibfk_1` FOREIGN KEY (`CategoryRentid`) REFERENCES `CategoryRent` (`CategoryRentid`);

--
-- Ketidakleluasaan untuk tabel `TransactionBuydetailFood`
--
ALTER TABLE `TransactionBuydetailFood`
  ADD CONSTRAINT `transactionbuydetailfood_ibfk_1` FOREIGN KEY (`Transactionid`) REFERENCES `TransactionBuyFood` (`Transactionid`),
  ADD CONSTRAINT `transactionbuydetailfood_ibfk_2` FOREIGN KEY (`Foodid`) REFERENCES `Food` (`Foodid`);

--
-- Ketidakleluasaan untuk tabel `TransactionBuyFood`
--
ALTER TABLE `TransactionBuyFood`
  ADD CONSTRAINT `transactionbuyfood_ibfk_1` FOREIGN KEY (`Userid`) REFERENCES `Users` (`Userid`);

--
-- Ketidakleluasaan untuk tabel `TransactionDetailRentBag`
--
ALTER TABLE `TransactionDetailRentBag`
  ADD CONSTRAINT `transactiondetailrentbag_ibfk_1` FOREIGN KEY (`Bagcarierid`) REFERENCES `BagCarier` (`Bagcarierid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `TransactionDetailRentTent`
--
ALTER TABLE `TransactionDetailRentTent`
  ADD CONSTRAINT `transactiondetailrenttent_ibfk_1` FOREIGN KEY (`TransactionRentid`) REFERENCES `TransactionRentHeader` (`TransactionRentid`),
  ADD CONSTRAINT `transactiondetailrenttent_ibfk_2` FOREIGN KEY (`Tentid`) REFERENCES `Tent` (`Tentid`);

--
-- Ketidakleluasaan untuk tabel `TransactionRentHeader`
--
ALTER TABLE `TransactionRentHeader`
  ADD CONSTRAINT `transactionrentheader_ibfk_1` FOREIGN KEY (`Userid`) REFERENCES `Users` (`Userid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
