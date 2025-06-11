-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2025 at 02:49 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `klinik_tppi`
--

-- --------------------------------------------------------

--
-- Table structure for table `diagnosis`
--

CREATE TABLE `diagnosis` (
  `id` int(11) NOT NULL,
  `id_rekam_medis` int(11) DEFAULT NULL,
  `kode_diagnosis` varchar(20) DEFAULT NULL,
  `jenis_penyakit` varchar(100) DEFAULT NULL,
  `terapi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `obat`
--

CREATE TABLE `obat` (
  `id` int(11) NOT NULL,
  `nama_obat` varchar(100) DEFAULT NULL,
  `stok` int(11) DEFAULT 0,
  `dibuat_pada` datetime DEFAULT current_timestamp(),
  `diperbarui_pada` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `id` int(11) NOT NULL,
  `nik` varchar(20) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `pt_mitra` varchar(100) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `status_pekerja` enum('Organik','Outsourcing','Kontraktor') DEFAULT NULL,
  `no_telepon` varchar(20) DEFAULT NULL,
  `alergi_obat` text DEFAULT NULL,
  `nama_penanggung_jawab` varchar(100) DEFAULT NULL,
  `kontak_darurat` varchar(20) DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT current_timestamp(),
  `diperbarui_pada` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `nik` varchar(20) NOT NULL,
  `kata_sandi` varchar(255) NOT NULL,
  `dibuat_pada` datetime DEFAULT current_timestamp(),
  `diperbarui_pada` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rekam_medis`
--

CREATE TABLE `rekam_medis` (
  `id` int(11) NOT NULL,
  `id_pasien` int(11) DEFAULT NULL,
  `tanggal_pemeriksaan` date DEFAULT NULL,
  `keluhan` text DEFAULT NULL,
  `tensi` varchar(10) DEFAULT NULL,
  `suhu` decimal(4,1) DEFAULT NULL,
  `nadi` int(11) DEFAULT NULL,
  `respirasi` int(11) DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT current_timestamp(),
  `diperbarui_pada` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `riwayat_obat`
--

CREATE TABLE `riwayat_obat` (
  `id` int(11) NOT NULL,
  `id_obat` int(11) DEFAULT NULL,
  `jenis` enum('masuk','keluar') DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `tanggal` datetime DEFAULT current_timestamp(),
  `keterangan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `surat_sakit`
--

CREATE TABLE `surat_sakit` (
  `id` int(11) NOT NULL,
  `id_pasien` int(11) DEFAULT NULL,
  `departemen` varchar(100) DEFAULT NULL,
  `jenis_izin` varchar(100) DEFAULT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `alasan` text DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT current_timestamp(),
  `diperbarui_pada` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `diagnosis`
--
ALTER TABLE `diagnosis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rekam_medis` (`id_rekam_medis`);

--
-- Indexes for table `obat`
--
ALTER TABLE `obat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nik` (`nik`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nik` (`nik`);

--
-- Indexes for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pasien` (`id_pasien`);

--
-- Indexes for table `riwayat_obat`
--
ALTER TABLE `riwayat_obat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_obat` (`id_obat`);

--
-- Indexes for table `surat_sakit`
--
ALTER TABLE `surat_sakit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pasien` (`id_pasien`);
  ALTER TABLE surat_sakit ADD gambar_url TEXT AFTER alasan;


--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `diagnosis`
--
ALTER TABLE `diagnosis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `obat`
--
ALTER TABLE `obat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pasien`
--
ALTER TABLE `pasien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `riwayat_obat`
--
ALTER TABLE `riwayat_obat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `surat_sakit`
--
ALTER TABLE `surat_sakit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `diagnosis`
--
ALTER TABLE `diagnosis`
  ADD CONSTRAINT `diagnosis_ibfk_1` FOREIGN KEY (`id_rekam_medis`) REFERENCES `rekam_medis` (`id`);

--
-- Constraints for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  ADD CONSTRAINT `rekam_medis_ibfk_1` FOREIGN KEY (`id_pasien`) REFERENCES `pasien` (`id`);

--
-- Constraints for table `riwayat_obat`
--
ALTER TABLE `riwayat_obat`
  ADD CONSTRAINT `riwayat_obat_ibfk_1` FOREIGN KEY (`id_obat`) REFERENCES `obat` (`id`);

--
-- Constraints for table `surat_sakit`
--
ALTER TABLE `surat_sakit`
  ADD CONSTRAINT `surat_sakit_ibfk_1` FOREIGN KEY (`id_pasien`) REFERENCES `pasien` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
