-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 01 Nov 2024 pada 04.48
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
-- Database: `hikingbuddy2`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `Article`
--

CREATE TABLE `Article` (
  `ArticleId` char(7) NOT NULL,
  `ArticleTitle` longtext DEFAULT NULL,
  `ArticleData` longtext DEFAULT NULL,
  `ArticleDateRelease` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Article`
--

INSERT INTO `Article` (`ArticleId`, `ArticleTitle`, `ArticleData`, `ArticleDateRelease`) VALUES
('AR99999', 'Gunung Rinjani, Pesona Keindahan Alam Eksotis di Atap Lombok', 'Mengaku pecinta alam dan penikmat gunung? Belum lengkap rasanya jika belum merasakan sensasi mendaki di gunung yang terkenal sangat cantik akan pesona alamnya ini. Gunung Rinjani terletak di utara Pulau Lombok, Nusa Tenggara Barat, dan merupakan gunung berapi kedua tertinggi di Indonesia dengan ketinggian 3.726 mdpl. Masuk dalam kawasan Taman Nasional Gunung Rinjani dan dikelilingi oleh hutan dan semak belukar seluas 76.000 hektar merupakan pemandangan yang asri bagi Gunung Rinjani. \r\n\r\nAkses menuju Pulau Lombok selain dapat ditempuh melalui jalur darat menggunakan bus langsung Jakarta-Mataram dengan menyeberang menggunakan kapal ferry dua kali (Selat Bali dan Selat Lombok), juga dapat ditempuh dengan menggunakan pesawat terbang.\r\n\r\nAda 2 jalur pendakian untuk mencapai Puncak Rinjani, yaitu Jalur Sembalun dan Jalur Senaru. Jalur Sembalun merupakan jalur favorit para pendaki karena meskipun treknya lebih panjang namun bisa menghemat 700 m ketinggian.\r\nDi Jalur Sembalun, pendaki akan melalui hamparan padang savana yang sangat luas dan cantik. Ada 3 pos peristirahatan di jalur ini, dan selepas dari pos 3 pendaki akan menghadapi tanjakan terjal dengan kemiringan sekitar 60 derajat. Sedangkan di Jalur Senaru, pendaki akan melewati hutan tropis yang cukup lebat dan terjal. Sama halnya dengan Jalur Sembalun, jalur ini juga terdapat 3 pos peristirahatan sebelum nantinya sampai ke pos pelawangan yang biasa digunakan sebagai area perkemahan.\r\nPesona yang dimiliki oleh Gunung Rinjani nyaris sempurna sehingga tidak diragukan lagi jika Rinjani menjadi daya tarik yang mampu memikat minat para wisatawan mancanegara maupun nusantara untuk mendakinya. Dan mendaki Gunung Rinjani tentunya akan menjadi kenangan dan pengalaman hidup yang tidak akan terlupakan.', '2024-01-31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ArticleConnect`
--

CREATE TABLE `ArticleConnect` (
  `ArticleId` char(7) NOT NULL,
  `UserId` char(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `ArticleConnect`
--

INSERT INTO `ArticleConnect` (`ArticleId`, `UserId`) VALUES
('AR99999', 'US99998');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Thread`
--

CREATE TABLE `Thread` (
  `ThreadId` char(7) NOT NULL,
  `ThreadDescription` varchar(255) DEFAULT NULL,
  `ThreadDateRelease` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Thread`
--

INSERT INTO `Thread` (`ThreadId`, `ThreadDescription`, `ThreadDateRelease`) VALUES
('TE99999', 'Bagus semuanya', '2024-01-01');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ThreadComment`
--

CREATE TABLE `ThreadComment` (
  `ThreadId` char(7) NOT NULL,
  `UserId` char(7) NOT NULL,
  `CommentData` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `ThreadLike`
--

CREATE TABLE `ThreadLike` (
  `ThreadId` char(7) NOT NULL,
  `UserId` char(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `ThreadPostHeader`
--

CREATE TABLE `ThreadPostHeader` (
  `ThreadId` char(7) NOT NULL,
  `UserId` char(7) NOT NULL,
  `TotalLike` int(10) DEFAULT NULL,
  `TotalComment` int(10) DEFAULT NULL,
  `TotalShare` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `ThreadPostHeader`
--

INSERT INTO `ThreadPostHeader` (`ThreadId`, `UserId`, `TotalLike`, `TotalComment`, `TotalShare`) VALUES
('TE99999', 'US99999', 0, 0, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `ThreadShare`
--

CREATE TABLE `ThreadShare` (
  `ThreadId` char(7) NOT NULL,
  `UserId` char(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Users`
--

CREATE TABLE `Users` (
  `UserId` char(7) NOT NULL,
  `UserFullname` varchar(255) DEFAULT NULL,
  `UserEmail` varchar(30) DEFAULT NULL,
  `UserPhone` varchar(10) DEFAULT NULL,
  `UserRole` varchar(20) NOT NULL,
  `UserPassword` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Users`
--

INSERT INTO `Users` (`UserId`, `UserFullname`, `UserEmail`, `UserPhone`, `UserRole`, `UserPassword`) VALUES
('US99998', 'Budi', 'budi@gmail.com', '08515431', 'Member', 'tes123'),
('US99999', 'AdminHikingBuddy', 'admin@email.com', '082122121', 'Admin', 'tes123');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `Article`
--
ALTER TABLE `Article`
  ADD PRIMARY KEY (`ArticleId`);

--
-- Indeks untuk tabel `ArticleConnect`
--
ALTER TABLE `ArticleConnect`
  ADD PRIMARY KEY (`ArticleId`,`UserId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indeks untuk tabel `Thread`
--
ALTER TABLE `Thread`
  ADD PRIMARY KEY (`ThreadId`);

--
-- Indeks untuk tabel `ThreadComment`
--
ALTER TABLE `ThreadComment`
  ADD PRIMARY KEY (`ThreadId`,`UserId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indeks untuk tabel `ThreadLike`
--
ALTER TABLE `ThreadLike`
  ADD PRIMARY KEY (`ThreadId`,`UserId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indeks untuk tabel `ThreadPostHeader`
--
ALTER TABLE `ThreadPostHeader`
  ADD PRIMARY KEY (`ThreadId`,`UserId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indeks untuk tabel `ThreadShare`
--
ALTER TABLE `ThreadShare`
  ADD PRIMARY KEY (`ThreadId`,`UserId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indeks untuk tabel `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserId`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `ArticleConnect`
--
ALTER TABLE `ArticleConnect`
  ADD CONSTRAINT `articleconnect_ibfk_1` FOREIGN KEY (`ArticleId`) REFERENCES `Article` (`ArticleId`),
  ADD CONSTRAINT `articleconnect_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`);

--
-- Ketidakleluasaan untuk tabel `ThreadComment`
--
ALTER TABLE `ThreadComment`
  ADD CONSTRAINT `threadcomment_ibfk_1` FOREIGN KEY (`ThreadId`) REFERENCES `Thread` (`ThreadId`),
  ADD CONSTRAINT `threadcomment_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`);

--
-- Ketidakleluasaan untuk tabel `ThreadLike`
--
ALTER TABLE `ThreadLike`
  ADD CONSTRAINT `threadlike_ibfk_1` FOREIGN KEY (`ThreadId`) REFERENCES `Thread` (`ThreadId`),
  ADD CONSTRAINT `threadlike_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`);

--
-- Ketidakleluasaan untuk tabel `ThreadPostHeader`
--
ALTER TABLE `ThreadPostHeader`
  ADD CONSTRAINT `threadpostheader_ibfk_1` FOREIGN KEY (`ThreadId`) REFERENCES `Thread` (`ThreadId`),
  ADD CONSTRAINT `threadpostheader_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`);

--
-- Ketidakleluasaan untuk tabel `ThreadShare`
--
ALTER TABLE `ThreadShare`
  ADD CONSTRAINT `threadshare_ibfk_1` FOREIGN KEY (`ThreadId`) REFERENCES `Thread` (`ThreadId`),
  ADD CONSTRAINT `threadshare_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
