-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 03:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestionecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `avis`
--

CREATE TABLE `avis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `notation` int(11) NOT NULL,
  `avis` varchar(50) NOT NULL,
  `titre` varchar(50) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `produit_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `avis`
--

INSERT INTO `avis` (`id`, `notation`, `avis`, `titre`, `user_id`, `produit_id`, `created_at`, `updated_at`) VALUES
(2, 2, 'This is a sample review 1', 'Review Title 1', 1, 1, '2025-04-25 09:57:12', '2025-04-25 09:57:12');

-- --------------------------------------------------------

--
-- Table structure for table `caracteristiques`
--

CREATE TABLE `caracteristiques` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `couleur` varchar(50) NOT NULL,
  `taille` varchar(50) NOT NULL,
  `produit_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `caracteristiques`
--

INSERT INTO `caracteristiques` (`id`, `couleur`, `taille`, `produit_id`, `created_at`, `updated_at`) VALUES
(1, 'Red', 'M', 1, '2025-04-25 09:57:12', '2025-04-25 09:57:12'),
(2, 'Blue', 'L', 2, '2025-04-25 09:57:12', '2025-04-25 09:57:12'),
(3, 'Green', 'S', 3, '2025-04-25 09:57:12', '2025-04-25 09:57:12');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `nom`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Electronics', 'Devices and gadgets', 'categories/3aKYJ4grComlIGrDbR0G2NRmHStPaWT5SuKDY63e.jpg', '2025-04-25 09:57:03', '2025-04-27 14:59:59'),
(2, 'Books', 'Various genres of books', 'categories/CEFXk7JK64TB58jUzRMeY1dRreqICbclXvi4IvRC.jpg', '2025-04-25 09:57:03', '2025-04-27 15:00:28'),
(3, 'Clothing', 'Apparel and accessories', 'categories/r0fQK30FVmJq2mOn8MGwdUa0OYEuY38YbQkvwAcW.jpg', '2025-04-25 09:57:03', '2025-04-27 15:01:11');

-- --------------------------------------------------------

--
-- Table structure for table `commandes`
--

CREATE TABLE `commandes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date_achat` date NOT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `statut` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `commandes`
--

INSERT INTO `commandes` (`id`, `user_id`, `date_achat`, `commentaire`, `statut`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-04-25', '8Eef0PWJSV', 'Pending', '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(2, 2, '2025-04-24', 'NRpDBX8Usy', 'Completed', '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(3, 3, '2025-04-23', 'lwm2pnqZ1i', 'Cancelled', '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(17, 1, '2025-04-25', '8Eef0PWJSV', 'Pending', '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(18, 2, '2025-04-24', 'NRpDBX8Usy', 'Completed', '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(19, 3, '2025-04-23', 'lwm2pnqZ1i', 'Cancelled', '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(25, 1, '2025-04-27', 'uuu', 'Pending', '2025-04-27 10:43:26', '2025-04-27 10:43:26'),
(26, 1, '2025-04-27', '888', 'Pending', '2025-04-27 10:45:00', '2025-04-27 10:45:00'),
(27, 1, '2025-04-27', '77', 'Pending', '2025-04-27 10:45:14', '2025-04-27 10:45:14'),
(28, 1, '2025-04-27', 'aaaaaa', 'Pending', '2025-04-27 10:46:29', '2025-04-27 10:46:29'),
(29, 1, '2025-04-27', 'aaa', 'Pending', '2025-04-27 10:49:29', '2025-04-27 10:49:29'),
(30, 1, '2025-04-27', NULL, 'Pending', '2025-04-27 10:49:41', '2025-04-27 10:49:41'),
(31, 1, '2025-04-27', NULL, 'Pending', '2025-04-27 10:49:54', '2025-04-27 10:49:54'),
(32, 1, '2025-04-27', 'aaaaaaaaaaaa', 'Pending', '2025-04-27 11:12:05', '2025-04-27 11:12:05'),
(33, 1, '2025-04-27', '5555', 'Pending', '2025-04-27 11:23:32', '2025-04-27 11:23:32'),
(34, 1, '2025-04-27', '7777', 'Pending', '2025-04-27 11:24:15', '2025-04-27 11:24:15'),
(35, 1, '2025-04-27', 'aaaaa', 'Pending', '2025-04-27 11:26:46', '2025-04-27 11:26:46'),
(36, 1, '2025-04-27', 'aaaa', 'Pending', '2025-04-27 11:29:06', '2025-04-27 11:29:06'),
(37, 1, '2025-04-27', 'aaaaaaaaa', 'Pending', '2025-04-27 11:59:22', '2025-04-27 11:59:22'),
(38, 1, '2025-04-27', 'aaaaaaaaaaaaa', 'Pending', '2025-04-27 12:00:28', '2025-04-27 12:00:28'),
(39, 1, '2025-04-27', 'aaaaaaaaaaa', 'Pending', '2025-04-27 12:03:35', '2025-04-27 12:03:35'),
(40, 1, '2025-04-27', 'aaaaaaaaaaaaa', 'Pending', '2025-04-27 12:06:44', '2025-04-27 12:06:44'),
(41, 1, '2025-04-27', 'AAAAAA', 'Pending', '2025-04-27 12:09:35', '2025-04-27 12:09:35'),
(42, 1, '2025-04-27', 'AAAAAAA', 'Pending', '2025-04-27 12:12:49', '2025-04-27 12:12:49'),
(43, 1, '2025-04-27', 'AAAAAAAAAAAA', 'Pending', '2025-04-27 12:14:13', '2025-04-27 12:14:13'),
(44, 1, '2025-04-27', 'aaaaa', 'Pending', '2025-04-27 12:15:28', '2025-04-27 12:15:28'),
(45, 1, '2025-04-27', 'aaaaa', 'Pending', '2025-04-27 12:17:14', '2025-04-27 12:17:14'),
(46, 1, '2025-04-27', 'aaaaaaaa', 'Pending', '2025-04-27 12:20:55', '2025-04-27 12:20:55'),
(47, 1, '2025-04-27', 'aaaaaaaaaa', 'Pending', '2025-04-27 12:21:36', '2025-04-27 12:21:36'),
(48, 1, '2025-04-27', 'aaaaaaaaaaa', 'Pending', '2025-04-27 12:22:06', '2025-04-27 12:22:06'),
(49, 1, '2025-04-27', 'aaaaaaaaaaa', 'Pending', '2025-04-27 12:23:16', '2025-04-27 12:23:16'),
(50, 1, '2025-04-27', 'aaaaaaaaaaaa', 'Pending', '2025-04-27 12:25:39', '2025-04-27 12:25:39'),
(51, 1, '2025-04-27', 'AAAAAAAAAAAAAA', 'Pending', '2025-04-27 12:26:15', '2025-04-27 12:26:15'),
(52, 1, '2025-04-27', NULL, 'Pending', '2025-04-27 12:26:48', '2025-04-27 12:26:48'),
(53, 1, '2025-04-27', 'AAAAAAAAAAA', 'Pending', '2025-04-27 12:27:16', '2025-04-27 12:27:16'),
(54, 1, '2025-04-27', 'AAAAAAAAAA', 'Pending', '2025-04-27 12:28:12', '2025-04-27 12:28:12'),
(55, 1, '2025-04-27', 'AAAA', 'Pending', '2025-04-27 12:30:06', '2025-04-27 12:30:06'),
(56, 1, '2025-04-27', NULL, 'Pending', '2025-04-27 12:31:30', '2025-04-27 12:31:30'),
(57, 1, '2025-04-27', 'aaaaaaa', 'Pending', '2025-04-27 12:35:08', '2025-04-27 12:35:08'),
(58, 1, '2025-04-27', 'aaaaaaaaaaaaa', 'Pending', '2025-04-27 12:35:46', '2025-04-27 12:35:46'),
(59, 1, '2025-04-27', 'aaaaaaaaaa', 'Pending', '2025-04-27 12:40:11', '2025-04-27 12:40:11'),
(60, 1, '2025-04-27', 'aaaaaaaaaaaaa', 'Pending', '2025-04-27 12:41:05', '2025-04-27 12:41:05'),
(61, 1, '2025-04-27', 'aaaaaaaaaaaaaa', 'Pending', '2025-04-27 12:43:44', '2025-04-27 12:43:44'),
(62, 1, '2025-04-27', 'a', 'Pending', '2025-04-27 12:45:16', '2025-04-27 12:45:16'),
(63, 1, '2025-04-27', 'aaaaaaaaaaaaaa', 'Pending', '2025-04-27 12:47:14', '2025-04-27 12:47:14'),
(64, 1, '2025-04-27', NULL, 'Pending', '2025-04-27 12:49:00', '2025-04-27 12:49:00'),
(65, 1, '2025-04-27', NULL, 'Pending', '2025-04-27 12:52:30', '2025-04-27 12:52:30'),
(66, 1, '2025-04-27', 'aaaaaaaaa', 'Pending', '2025-04-27 12:55:12', '2025-04-27 12:55:12'),
(67, 1, '2025-04-27', 'test', 'Pending', '2025-04-27 13:43:28', '2025-04-27 13:43:28'),
(68, 1, '2025-04-28', 'aaaaaaa', 'Pending', '2025-04-28 11:45:34', '2025-04-28 11:45:34');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `discount_percentage` int(11) NOT NULL,
  `is_used` tinyint(1) NOT NULL DEFAULT 0,
  `expiry_date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `discount_percentage`, `is_used`, `expiry_date`, `created_at`, `updated_at`) VALUES
(1, 'WELCOME10', 10, 0, '2025-05-25 11:51:29', '2025-04-25 10:51:29', '2025-04-25 10:51:29'),
(2, 'SPRING20', 20, 0, '2025-06-24 11:51:29', '2025-04-25 10:51:29', '2025-04-25 10:51:29'),
(3, 'SUMMER15', 15, 0, '2025-06-09 11:51:29', '2025-04-25 10:51:29', '2025-04-25 10:51:29'),
(4, 'WINTER25', 25, 1, '2025-05-10 11:51:29', '2025-04-25 10:51:29', '2025-04-25 10:51:29'),
(5, 'MUS5NTNV', 2, 0, '2025-05-25 11:55:11', '2025-04-25 10:55:11', '2025-04-25 10:55:11'),
(6, 'D4OS6T3I', 2, 0, '2025-05-25 12:01:18', '2025-04-25 11:01:18', '2025-04-25 11:01:18'),
(7, '6E9HTNJU', 2, 0, '2025-05-25 12:11:16', '2025-04-25 11:11:16', '2025-04-25 11:11:16'),
(8, 'Z1FGUHQJ', 10, 0, '2025-05-25 12:16:11', '2025-04-25 11:16:11', '2025-04-25 11:16:11'),
(9, 'VJ0LW8QN', 5, 0, '2025-05-25 12:20:56', '2025-04-25 11:20:56', '2025-04-25 11:20:56'),
(10, 'TDCULUY7', 2, 0, '2025-05-27 11:50:47', '2025-04-27 10:50:47', '2025-04-27 10:50:47');

-- --------------------------------------------------------

--
-- Table structure for table `factures`
--

CREATE TABLE `factures` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date_facturation` date NOT NULL,
  `montant_HT` decimal(15,2) NOT NULL,
  `montant_TTC` decimal(15,2) NOT NULL,
  `montant_TVA` decimal(15,2) NOT NULL,
  `payment_status` varchar(250) NOT NULL,
  `commande_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `factures`
--

INSERT INTO `factures` (`id`, `date_facturation`, `montant_HT`, `montant_TTC`, `montant_TVA`, `payment_status`, `commande_id`, `created_at`, `updated_at`) VALUES
(1, '2025-04-25', 100.00, 120.00, 20.00, 'Paid', 1, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(2, '2025-04-25', 200.00, 240.00, 40.00, 'Pending', 2, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(6, '2025-04-25', 100.00, 120.00, 20.00, 'Paid', 1, '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(7, '2025-04-25', 200.00, 240.00, 40.00, 'Pending', 2, '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(13, '2025-04-27', 7235.00, 8357.20, 1122.20, 'pending', 25, '2025-04-27 10:43:28', '2025-04-27 10:43:28'),
(14, '2025-04-27', 4741.00, 5581.18, 840.18, 'pending', 26, '2025-04-27 10:45:01', '2025-04-27 10:45:01'),
(15, '2025-04-27', 4741.00, 5581.18, 840.18, 'pending', 27, '2025-04-27 10:45:15', '2025-04-27 10:45:15'),
(16, '2025-04-27', 4741.00, 5581.18, 840.18, 'pending', 28, '2025-04-27 10:46:30', '2025-04-27 10:46:30'),
(17, '2025-04-27', 4741.00, 5581.18, 840.18, 'pending', 29, '2025-04-27 10:49:31', '2025-04-27 10:49:31'),
(18, '2025-04-27', 4741.00, 5581.18, 840.18, 'pending', 30, '2025-04-27 10:49:42', '2025-04-27 10:49:42'),
(19, '2025-04-27', 4741.00, 5581.18, 840.18, 'pending', 31, '2025-04-27 10:49:55', '2025-04-27 10:49:55'),
(20, '2025-04-27', 4741.00, 5581.18, 840.18, 'pending', 32, '2025-04-27 11:12:06', '2025-04-27 11:12:06'),
(21, '2025-04-27', 4741.00, 5581.18, 840.18, 'pending', 33, '2025-04-27 11:23:33', '2025-04-27 11:23:33'),
(22, '2025-04-27', 4741.00, 5581.18, 840.18, 'pending', 34, '2025-04-27 11:24:17', '2025-04-27 11:24:17'),
(23, '2025-04-27', 4741.00, 5581.18, 840.18, 'pending', 35, '2025-04-27 11:26:49', '2025-04-27 11:26:49'),
(24, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 36, '2025-04-27 11:29:07', '2025-04-27 11:29:07'),
(25, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 37, '2025-04-27 11:59:24', '2025-04-27 11:59:24'),
(26, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 38, '2025-04-27 12:00:31', '2025-04-27 12:00:31'),
(27, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 39, '2025-04-27 12:03:37', '2025-04-27 12:03:37'),
(28, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 40, '2025-04-27 12:06:47', '2025-04-27 12:06:47'),
(29, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 41, '2025-04-27 12:09:37', '2025-04-27 12:09:37'),
(30, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 42, '2025-04-27 12:12:51', '2025-04-27 12:12:51'),
(31, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 43, '2025-04-27 12:14:15', '2025-04-27 12:14:15'),
(32, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 44, '2025-04-27 12:15:30', '2025-04-27 12:15:30'),
(33, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 45, '2025-04-27 12:17:16', '2025-04-27 12:17:16'),
(34, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 46, '2025-04-27 12:20:58', '2025-04-27 12:20:58'),
(35, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 47, '2025-04-27 12:21:38', '2025-04-27 12:21:38'),
(36, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 48, '2025-04-27 12:22:08', '2025-04-27 12:22:08'),
(37, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 49, '2025-04-27 12:23:19', '2025-04-27 12:23:19'),
(38, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 50, '2025-04-27 12:25:44', '2025-04-27 12:25:44'),
(39, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 51, '2025-04-27 12:26:18', '2025-04-27 12:26:18'),
(40, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 52, '2025-04-27 12:26:51', '2025-04-27 12:26:51'),
(41, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 53, '2025-04-27 12:27:17', '2025-04-27 12:27:17'),
(42, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 54, '2025-04-27 12:28:15', '2025-04-27 12:28:15'),
(43, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 55, '2025-04-27 12:30:09', '2025-04-27 12:30:09'),
(44, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 56, '2025-04-27 12:31:32', '2025-04-27 12:31:32'),
(45, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 57, '2025-04-27 12:35:10', '2025-04-27 12:35:10'),
(46, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 58, '2025-04-27 12:35:48', '2025-04-27 12:35:48'),
(47, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 59, '2025-04-27 12:40:13', '2025-04-27 12:40:13'),
(48, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 60, '2025-04-27 12:41:07', '2025-04-27 12:41:07'),
(49, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 61, '2025-04-27 12:43:47', '2025-04-27 12:43:47'),
(50, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 62, '2025-04-27 12:45:18', '2025-04-27 12:45:18'),
(51, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 63, '2025-04-27 12:47:16', '2025-04-27 12:47:16'),
(52, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 64, '2025-04-27 12:49:03', '2025-04-27 12:49:03'),
(53, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 65, '2025-04-27 12:52:33', '2025-04-27 12:52:33'),
(54, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 66, '2025-04-27 12:55:15', '2025-04-27 12:55:15'),
(55, '2025-04-27', 3742.00, 4382.38, 640.38, 'pending', 67, '2025-04-27 13:43:30', '2025-04-27 13:43:30'),
(56, '2025-04-28', 1094.00, 1154.17, 60.17, 'pending', 68, '2025-04-28 11:45:36', '2025-04-28 11:45:36');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `Id_FAQ` bigint(20) UNSIGNED NOT NULL,
  `Question` varchar(255) NOT NULL,
  `Reponde` varchar(255) NOT NULL,
  `categorie` varchar(50) NOT NULL,
  `Nombre_vues` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`Id_FAQ`, `Question`, `Reponde`, `categorie`, `Nombre_vues`, `created_at`, `updated_at`) VALUES
(1, 'Quaerat blanditiis ipsa dignissimos ipsa.', 'Ut dolore nisi eum dolor consectetur quo occaecati commodi.', 'beatae', 27, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(2, 'Suscipit perspiciatis alias ut nemo quisquam eius quia perferendis.', 'Aut voluptatem laboriosam odit aliquid officia dolorem tenetur natus dignissimos labore iusto ducimus.', 'adipisci', 80, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(3, 'Ea molestiae id repellendus.', 'Corporis et aliquid facere vel quia eaque voluptates dignissimos iure provident.', 'adipisci', 38, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(4, 'Doloribus magni praesentium voluptate iusto est excepturi.', 'Incidunt debitis aperiam magnam itaque eaque aperiam deserunt neque occaecati.', 'nihil', 56, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(5, 'Explicabo similique qui dignissimos magnam maiores enim.', 'Et dolores iure nesciunt aliquam et magni dicta quod ipsum numquam et.', 'et', 61, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(6, 'Molestiae dignissimos et ut dicta delectus consectetur.', 'Culpa eaque officiis aut occaecati aut et pariatur inventore doloremque fuga maxime est.', 'quo', 73, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(7, 'Tempora ab in maxime qui architecto.', 'Nobis nesciunt non tempore laborum ut et laudantium qui repudiandae.', 'nisi', 31, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(8, 'Eius nulla quis odio qui expedita et qui perspiciatis.', 'Fugiat voluptate nisi dolore id ad asperiores modi numquam esse consequatur porro.', 'corrupti', 59, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(9, 'Ut placeat deserunt aut beatae deserunt.', 'Qui vel officia officiis et aperiam ea qui et libero qui enim rerum tempore.', 'assumenda', 85, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(10, 'Dolores nam ipsum deleniti fugit omnis.', 'Dolor veritatis a voluptatem est atque laboriosam commodi repellat et dolore.', 'repudiandae', 10, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(11, 'Animi asperiores aut dolore delectus.', 'Quas voluptas sequi voluptatem culpa voluptatem commodi recusandae.', 'aut', 87, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(12, 'Impedit fugiat dolor qui eveniet.', 'Optio repellendus ut similique consequatur minus aut commodi ex rerum dolorum.', 'adipisci', 79, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(13, 'Libero commodi quam et doloribus sit facilis.', 'Debitis quia consequatur et officiis animi in nihil eveniet saepe veritatis.', 'dolor', 70, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(14, 'Aliquam labore odit a quis quia dolorem similique.', 'Debitis quia accusamus recusandae delectus sint et repudiandae debitis possimus illo.', 'qui', 62, '2025-04-25 09:57:13', '2025-04-25 09:57:13'),
(15, 'Sit quidem id soluta voluptates nihil culpa.', 'Accusamus magnam eligendi enim et tempore iusto quia dicta laborum id ratione aut optio.', 'rerum', 51, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(16, 'Tempora velit et sit modi.', 'Et suscipit quidem sed dolor aut accusamus aliquid nihil placeat quisquam.', 'esse', 99, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(17, 'Nesciunt voluptates cum occaecati.', 'Magni adipisci beatae perferendis laudantium illum commodi alias.', 'optio', 96, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(18, 'Quam assumenda nobis ut non qui velit nobis nemo.', 'Fuga vel sapiente est error quibusdam rerum sit.', 'molestiae', 73, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(19, 'Ullam quod quam sunt et soluta maiores hic.', 'Reiciendis explicabo voluptatem ea et velit incidunt voluptatem quidem rem laudantium.', 'reprehenderit', 84, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(20, 'Tempore beatae vero ratione nihil aut.', 'Officiis vel temporibus exercitationem sit deserunt omnis voluptatem officiis itaque ipsam.', 'ducimus', 15, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(21, 'Nesciunt architecto cupiditate nemo.', 'Occaecati quod odit id quo pariatur deleniti qui dolorem impedit molestiae.', 'molestiae', 12, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(22, 'Iste est sit consequatur voluptatem.', 'Quo consectetur quod ullam asperiores rem molestiae voluptatum aperiam.', 'qui', 92, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(23, 'Qui iste maiores velit qui.', 'Fugiat et velit error quidem recusandae aliquid est sed.', 'vel', 74, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(24, 'Non deleniti molestias et architecto.', 'Perferendis facere asperiores laborum aspernatur necessitatibus quisquam qui iure consequatur vero commodi.', 'sequi', 78, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(25, 'Qui et beatae nam qui quo numquam quia.', 'Est dignissimos perferendis eum dolore magni consequatur similique temporibus praesentium quia ex.', 'perferendis', 52, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(26, 'Est commodi quidem accusamus voluptatem et cum.', 'Qui sint molestiae voluptatem necessitatibus qui minus et error consequatur inventore esse veritatis reprehenderit.', 'sapiente', 86, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(27, 'Repellat hic totam assumenda ducimus.', 'Fugit sit rerum et ea itaque accusamus ipsum.', 'neque', 71, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(28, 'Ut qui itaque nemo saepe deleniti.', 'Velit atque nulla temporibus ex cum ducimus.', 'reprehenderit', 37, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(29, 'Voluptatem eveniet eum mollitia ad non voluptas labore.', 'Voluptatem atque non consequatur enim et et.', 'possimus', 8, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(30, 'Velit hic exercitationem saepe neque.', 'Aut voluptas et et mollitia cumque atque aspernatur enim inventore blanditiis.', 'quae', 23, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(31, 'Porro magnam similique est non aut facere consequuntur perspiciatis.', 'Odio quis quis ut deserunt nam inventore ipsa animi cupiditate ea minima.', 'vero', 21, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(32, 'Et dolores nihil consequatur dolorum.', 'Et alias eos in aut est beatae magnam ut sapiente vel.', 'natus', 95, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(33, 'Dicta sunt et commodi dolore dolores ad.', 'Itaque nulla sed ea ea atque et sit non reiciendis.', 'ad', 68, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(34, 'Placeat aut aliquid aspernatur alias eius pariatur explicabo.', 'Accusantium accusamus assumenda quae non omnis eos eos et quia.', 'illo', 92, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(35, 'Consequatur vero maiores quae.', 'Consequatur corporis laboriosam doloribus esse dolor ipsa et iste ut dolores.', 'quo', 42, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(36, 'Dolorem dolorem praesentium aliquid.', 'Exercitationem non non ut ut voluptate maxime quam eos officiis nam culpa sapiente nam.', 'eius', 20, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(37, 'Sit eius voluptatem totam tenetur esse mollitia ea.', 'Nemo hic aliquam sint sit ipsam earum iure doloribus.', 'omnis', 58, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(38, 'Culpa esse delectus ea eos aut asperiores.', 'Ut ducimus expedita enim doloremque ea recusandae veniam assumenda officia sit.', 'eaque', 6, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(39, 'Quo placeat odio a quaerat quibusdam accusantium adipisci.', 'Voluptas ut laudantium et blanditiis totam nihil.', 'provident', 59, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(40, 'Quis et et aut accusamus ducimus praesentium sed.', 'Ex odio provident ea et unde sit maiores.', 'natus', 9, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(41, 'Optio eligendi quasi et repellendus nobis est laudantium.', 'Dolores rerum similique autem eligendi dolores voluptas et id repudiandae alias.', 'veniam', 30, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(42, 'In perspiciatis cumque aut modi labore sed.', 'Atque possimus et ipsa sunt aut quia distinctio.', 'quia', 79, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(43, 'Vitae et placeat tenetur.', 'Adipisci et explicabo dolor et optio quam.', 'sint', 10, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(44, 'Qui et sunt a autem rem in quia quam.', 'Vero dolorum doloribus rerum magni eum eum.', 'expedita', 51, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(45, 'In consectetur odit aut fugiat eius.', 'Illo adipisci sit voluptatem fugit eos quia nam sit esse excepturi error tenetur.', 'ipsa', 96, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(46, 'Debitis dolorum esse consequatur et eum.', 'Quia dolor eligendi voluptate nam laborum necessitatibus ex voluptas fugit autem.', 'qui', 24, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(47, 'Asperiores ut qui recusandae deserunt.', 'Soluta sit incidunt nesciunt est rerum voluptas pariatur consequatur voluptas optio.', 'eveniet', 24, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(48, 'Voluptatem maxime pariatur nisi non.', 'Ratione et aut debitis dolorem odio iure nostrum culpa illum.', 'sint', 70, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(49, 'Ut et totam rerum.', 'Ad nobis voluptatem et itaque impedit voluptates inventore veritatis.', 'qui', 7, '2025-04-25 09:57:14', '2025-04-25 09:57:14'),
(50, 'Ea quia nesciunt et aut aut.', 'Consequatur aperiam facere placeat ipsum rerum distinctio.', 'consequatur', 8, '2025-04-25 09:57:14', '2025-04-25 09:57:14');

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, NULL),
(2, 1, NULL, NULL),
(3, 2, NULL, NULL),
(4, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ligne_commandes`
--

CREATE TABLE `ligne_commandes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `commande_id` bigint(20) UNSIGNED NOT NULL,
  `produit_id` bigint(20) UNSIGNED NOT NULL,
  `quantite` int(11) NOT NULL,
  `prix_unitaire` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ligne_commandes`
--

INSERT INTO `ligne_commandes` (`id`, `commande_id`, `produit_id`, `quantite`, `prix_unitaire`, `created_at`, `updated_at`) VALUES
(16, 25, 1, 1, 999.00, '2025-04-27 10:43:26', '2025-04-27 10:43:26'),
(18, 25, 9, 1, 299.00, '2025-04-27 10:43:27', '2025-04-27 10:43:27'),
(20, 25, 10, 5, 149.00, '2025-04-27 10:43:28', '2025-04-27 10:43:28'),
(22, 26, 10, 5, 149.00, '2025-04-27 10:45:01', '2025-04-27 10:45:01'),
(24, 27, 10, 5, 149.00, '2025-04-27 10:45:14', '2025-04-27 10:45:14'),
(26, 28, 10, 5, 149.00, '2025-04-27 10:46:29', '2025-04-27 10:46:29'),
(28, 29, 10, 5, 149.00, '2025-04-27 10:49:30', '2025-04-27 10:49:30'),
(30, 30, 10, 5, 149.00, '2025-04-27 10:49:42', '2025-04-27 10:49:42'),
(32, 31, 10, 5, 149.00, '2025-04-27 10:49:54', '2025-04-27 10:49:54'),
(34, 32, 10, 5, 149.00, '2025-04-27 11:12:05', '2025-04-27 11:12:05'),
(36, 33, 10, 5, 149.00, '2025-04-27 11:23:32', '2025-04-27 11:23:32'),
(38, 34, 10, 5, 149.00, '2025-04-27 11:24:16', '2025-04-27 11:24:16'),
(40, 35, 10, 5, 149.00, '2025-04-27 11:26:49', '2025-04-27 11:26:49'),
(42, 36, 10, 5, 149.00, '2025-04-27 11:29:07', '2025-04-27 11:29:07'),
(44, 37, 10, 5, 149.00, '2025-04-27 11:59:24', '2025-04-27 11:59:24'),
(46, 38, 10, 5, 149.00, '2025-04-27 12:00:30', '2025-04-27 12:00:30'),
(48, 39, 10, 5, 149.00, '2025-04-27 12:03:36', '2025-04-27 12:03:36'),
(50, 40, 10, 5, 149.00, '2025-04-27 12:06:46', '2025-04-27 12:06:46'),
(52, 41, 10, 5, 149.00, '2025-04-27 12:09:36', '2025-04-27 12:09:36'),
(54, 42, 10, 5, 149.00, '2025-04-27 12:12:51', '2025-04-27 12:12:51'),
(56, 43, 10, 5, 149.00, '2025-04-27 12:14:14', '2025-04-27 12:14:14'),
(58, 44, 10, 5, 149.00, '2025-04-27 12:15:29', '2025-04-27 12:15:29'),
(60, 45, 10, 5, 149.00, '2025-04-27 12:17:15', '2025-04-27 12:17:15'),
(62, 46, 10, 5, 149.00, '2025-04-27 12:20:57', '2025-04-27 12:20:57'),
(64, 47, 10, 5, 149.00, '2025-04-27 12:21:37', '2025-04-27 12:21:37'),
(66, 48, 10, 5, 149.00, '2025-04-27 12:22:07', '2025-04-27 12:22:07'),
(68, 49, 10, 5, 149.00, '2025-04-27 12:23:18', '2025-04-27 12:23:18'),
(70, 50, 10, 5, 149.00, '2025-04-27 12:25:43', '2025-04-27 12:25:43'),
(72, 51, 10, 5, 149.00, '2025-04-27 12:26:17', '2025-04-27 12:26:17'),
(74, 52, 10, 5, 149.00, '2025-04-27 12:26:50', '2025-04-27 12:26:50'),
(76, 53, 10, 5, 149.00, '2025-04-27 12:27:17', '2025-04-27 12:27:17'),
(78, 54, 10, 5, 149.00, '2025-04-27 12:28:15', '2025-04-27 12:28:15'),
(80, 55, 10, 5, 149.00, '2025-04-27 12:30:08', '2025-04-27 12:30:08'),
(82, 56, 10, 5, 149.00, '2025-04-27 12:31:32', '2025-04-27 12:31:32'),
(84, 57, 10, 5, 149.00, '2025-04-27 12:35:10', '2025-04-27 12:35:10'),
(86, 58, 10, 5, 149.00, '2025-04-27 12:35:47', '2025-04-27 12:35:47'),
(88, 59, 10, 5, 149.00, '2025-04-27 12:40:13', '2025-04-27 12:40:13'),
(90, 60, 10, 5, 149.00, '2025-04-27 12:41:06', '2025-04-27 12:41:06'),
(92, 61, 10, 5, 149.00, '2025-04-27 12:43:46', '2025-04-27 12:43:46'),
(94, 62, 10, 5, 149.00, '2025-04-27 12:45:18', '2025-04-27 12:45:18'),
(96, 63, 10, 5, 149.00, '2025-04-27 12:47:16', '2025-04-27 12:47:16'),
(98, 64, 10, 5, 149.00, '2025-04-27 12:49:02', '2025-04-27 12:49:02'),
(100, 65, 10, 5, 149.00, '2025-04-27 12:52:32', '2025-04-27 12:52:32'),
(102, 66, 10, 5, 149.00, '2025-04-27 12:55:14', '2025-04-27 12:55:14'),
(104, 67, 10, 5, 149.00, '2025-04-27 13:43:29', '2025-04-27 13:43:29'),
(105, 68, 10, 5, 149.00, '2025-04-28 11:45:35', '2025-04-28 11:45:35'),
(106, 68, 3, 1, 349.00, '2025-04-28 11:45:36', '2025-04-28 11:45:36');

-- --------------------------------------------------------

--
-- Table structure for table `ligne_panier`
--

CREATE TABLE `ligne_panier` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `produit_id` bigint(20) UNSIGNED NOT NULL,
  `panier_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ligne_panier`
--

INSERT INTO `ligne_panier` (`id`, `produit_id`, `panier_id`, `quantity`, `created_at`, `updated_at`) VALUES
(5, 4, 2, 3, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(6, 1, 2, 1, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(7, 6, 2, 3, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(8, 3, 2, 1, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(9, 2, 3, 1, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(10, 7, 3, 1, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(11, 3, 3, 5, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(12, 6, 3, 4, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(44, 10, 1, 5, '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(46, 8, 2, 3, '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(47, 9, 2, 2, '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(51, 8, 3, 5, '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(82, 9, 19, 3, '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(86, 5, 20, 5, '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(140, 3, 1, 1, '2025-04-28 11:42:21', '2025-04-28 11:42:21');

-- --------------------------------------------------------

--
-- Table structure for table `livraisons`
--

CREATE TABLE `livraisons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `frais_expedition` decimal(15,2) NOT NULL,
  `nom_transporteur` varchar(50) NOT NULL,
  `date_envoi` date NOT NULL,
  `URL_suivi` varchar(50) NOT NULL,
  `poid` decimal(15,2) NOT NULL,
  `estime_arrive` varchar(50) NOT NULL,
  `status` enum('pending','shipped','delivered','canceled') NOT NULL DEFAULT 'pending',
  `commande_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `livraisons`
--

INSERT INTO `livraisons` (`id`, `frais_expedition`, `nom_transporteur`, `date_envoi`, `URL_suivi`, `poid`, `estime_arrive`, `status`, `commande_id`, `created_at`, `updated_at`) VALUES
(1, 10.00, 'Transporteur A', '2025-04-25', 'http://example.com/suivi/1', 2.50, '2023-10-10', 'pending', 1, '2025-04-25 09:57:12', '2025-04-25 09:57:12'),
(2, 15.00, 'Transporteur B', '2025-04-25', 'http://example.com/suivi/2', 3.00, '2023-10-12', 'pending', 2, '2025-04-25 09:57:12', '2025-04-25 09:57:12'),
(8, 100.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 15.00, '3-5 days', 'pending', 25, NULL, NULL),
(9, 120.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 9.00, '3-5 days', 'pending', 26, NULL, NULL),
(10, 200.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 9.00, '3-5 days', 'pending', 27, NULL, NULL),
(11, 120.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 9.00, '3-5 days', 'pending', 28, NULL, NULL),
(12, 130.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 9.00, '3-5 days', 'pending', 29, NULL, NULL),
(13, 130.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 9.00, '3-5 days', 'pending', 32, NULL, NULL),
(14, 120.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 9.00, '3-5 days', 'pending', 33, NULL, NULL),
(15, 120.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 9.00, '3-5 days', 'pending', 34, NULL, NULL),
(16, 150.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 9.00, '3-5 days', 'pending', 35, NULL, NULL),
(17, 150.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 36, NULL, NULL),
(18, 150.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 37, NULL, NULL),
(19, 150.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 38, NULL, NULL),
(20, 120.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 39, NULL, NULL),
(21, 120.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 40, NULL, NULL),
(22, 120.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 41, NULL, NULL),
(23, 130.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 42, NULL, NULL),
(24, 100.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 43, NULL, NULL),
(25, 120.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 44, NULL, NULL),
(26, 130.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 45, NULL, NULL),
(27, 150.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 46, NULL, NULL),
(28, 140.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 47, NULL, NULL),
(29, 150.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 48, NULL, NULL),
(30, 120.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 49, NULL, NULL),
(31, 120.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 50, NULL, NULL),
(32, 150.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 51, NULL, NULL),
(33, 120.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 55, NULL, NULL),
(34, 150.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 61, NULL, NULL),
(35, 150.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 62, NULL, NULL),
(36, 120.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 66, NULL, NULL),
(37, 150.00, 'Standard Transporter', '2025-04-27', 'http://example.com/track', 8.00, '3-5 days', 'pending', 67, NULL, NULL),
(38, 120.00, 'Standard Transporter', '2025-04-28', 'http://example.com/track', 6.00, '3-5 days', 'pending', 68, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2023_01_01_000001_create_tvas_table', 1),
(2, '2023_01_01_000002_create_categories_table', 1),
(3, '2023_01_01_000004_create_paniers_table', 1),
(4, '2023_01_01_000005_create_reductions_table', 1),
(5, '2023_01_01_000006_create_reduction_produit_table', 1),
(6, '2023_01_01_000007_create_produits_table', 1),
(7, '2023_01_01_000008_create_avis_table', 1),
(8, '2023_01_01_000009_create_users_table', 1),
(9, '2023_01_01_000010_create_commandes_table', 1),
(10, '2023_01_01_000010_create_favourites_table', 1),
(11, '2023_01_01_000011_create_caracteristiques_table', 1),
(12, '2023_01_01_000013_create_livraisons_table', 1),
(13, '2023_01_01_000014_create_factures_table', 1),
(14, '2023_01_01_000015_create_paiements_table', 1),
(15, '2023_01_01_000016_create_faqs_table', 1),
(16, '2023_01_01_00003_create_ligne_panier_table', 1),
(17, '2025_04_14_161824_create_personal_access_tokens_table', 1),
(18, '2025_04_14_163156_create_sessions_table', 1),
(19, '2025_04_16_164027_update_description_length_in_produits_table', 1),
(20, '2025_04_16_170416_add_quantity_to_ligne_panier_table', 1),
(21, '2025_04_17_173056_create_ligne_commandes_table', 1),
(22, '2025_04_18_103855_modify_description_in_categories_table', 1),
(23, '2025_04_25_113141_create_coupons_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `paiements`
--

CREATE TABLE `paiements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `methode` varchar(255) NOT NULL,
  `date_paiment` date NOT NULL,
  `updateDate` date DEFAULT NULL,
  `facture_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `paniers`
--

CREATE TABLE `paniers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `montant` decimal(15,2) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `paniers`
--

INSERT INTO `paniers` (`id`, `montant`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 675.00, 1, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(2, 308.00, 2, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(3, 791.00, 3, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(19, 258.00, 1, '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(20, 398.00, 2, '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(21, 147.00, 3, '2025-04-25 10:11:10', '2025-04-25 10:11:10');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 34, 'auth_token', '53f272627aef5626a984444bb1dee875b839c3c29b5229495cc764c310a2f7d1', '[\"*\"]', NULL, NULL, '2025-04-25 10:54:08', '2025-04-25 10:54:08'),
(2, 'App\\Models\\User', 1, 'auth_token', '63b2973816b6df15b6b417dc37c3d3afb90cd4b3d728653a9d1a74a0c68dd408', '[\"*\"]', NULL, NULL, '2025-04-27 10:42:01', '2025-04-27 10:42:01'),
(3, 'App\\Models\\User', 35, 'auth_token', 'e525b6e06238a87184303427eb0892ef5de33d1ed37ba348efaf68036634fc64', '[\"*\"]', NULL, NULL, '2025-04-28 11:21:49', '2025-04-28 11:21:49'),
(4, 'App\\Models\\User', 1, 'auth_token', '8c959df2ba416f801ecf58d945e9715b23dafa8083804eaefb050f6f64bc3478', '[\"*\"]', NULL, NULL, '2025-04-28 11:42:06', '2025-04-28 11:42:06');

-- --------------------------------------------------------

--
-- Table structure for table `produits`
--

CREATE TABLE `produits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `prix_HT` decimal(15,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `image` varchar(250) NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `tva_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `produits`
--

INSERT INTO `produits` (`id`, `nom`, `description`, `prix_HT`, `quantity`, `image`, `category_id`, `tva_id`, `created_at`, `updated_at`) VALUES
(1, 'Apple iPhone 14', 'The latest iPhone with A15 Bionic chip and advanced camera system.', 999.00, 15, 'produits/Fm8TKPdAhjZkJLVGioPxNDFr4QzYj4cQXtRNaIMs.jpg', 1, 1, NULL, '2025-04-27 14:27:50'),
(2, 'Samsung Galaxy S23', 'Flagship smartphone with Snapdragon 8 Gen 2 and 120Hz AMOLED display.', 899.00, 20, 'produits/LZTnaHDgvXyap3rw1JqwPEOrbOsEu3b10xIFxD4A.jpg', 1, 1, NULL, '2025-04-27 14:33:28'),
(3, 'Sony WH-1000XM5', 'Industry-leading noise-canceling headphones with exceptional sound quality.', 349.00, 30, 'produits/5apFQxrg6qhVHkVeRBS3j0uBlbIgQ1RFUPENZhM9.jpg', 1, 2, NULL, '2025-04-27 14:53:34'),
(4, 'Dell XPS 13', 'Ultra-thin and powerful laptop with Intel Core i7 and 16GB RAM.', 1299.00, 10, 'produits/NrlFlKuGkRnAanqHZW6KybpO8KxW2jZaNkRPuJPb.jpg', 1, 1, NULL, '2025-04-27 14:55:33'),
(5, 'Apple MacBook Pro 16\"', 'High-performance laptop with M2 Pro chip and Retina display.', 2499.00, 8, 'produits/M4lheuLNRLCRhClkHo6FnefzWL7rwpHywYf0O9Id.jpg', 1, 1, NULL, '2025-04-27 14:56:52'),
(6, 'Logitech MX Master 3', 'Advanced wireless mouse with ergonomic design and customizable buttons.', 99.00, 50, 'produits/D7paSqtPI5kQalPGF39bmFIPx4tRBxfRzcXhVChY.jpg', 1, 2, NULL, '2025-04-27 14:37:22'),
(7, 'Canon EOS R6', 'Full-frame mirrorless camera with 20MP sensor and 4K video recording.', 2499.00, 5, 'produits/6Gk6oSkTBuZGX8lMpo1cRLRBVqY1n0yqExnzIBRk.jpg', 1, 1, NULL, '2025-04-27 14:56:36'),
(8, 'Samsung 55\" QLED TV', '4K UHD Smart TV with Quantum Dot technology and HDR support.', 799.00, 12, 'produits/8RwO2woYlgffQBXkKYbw9N9hAwKaUh5yxMDE67aS.jpg', 1, 1, NULL, '2025-04-27 14:45:26'),
(9, 'Bose SoundLink Revolve+', 'Portable Bluetooth speaker with 360-degree sound and deep bass.', 299.00, 25, 'produits/POTWbZ5dMKaKd8TfkXVCcyH6lH3lgeGycP2yGKnV.jpg', 1, 2, NULL, '2025-04-27 14:53:19'),
(10, 'Fitbit Charge 5', 'Advanced fitness tracker with heart rate monitoring and GPS.', 149.00, 40, 'produits/9sfVZHWV15qxbdGeMUEhuxlyyliV2nHaPUTXx96v.jpg', 1, 2, NULL, '2025-04-27 14:51:56'),
(39, 'Harry Potter and the Sorcerer\'s Stone', 'First novel in the Harry Potter series.', 16.50, 28, 'produits/4kJIHgJR5JQKfQjfgitCSztIFUjOPfQBQSpvBSVI.jpg', 2, 1, NULL, '2025-04-28 12:20:33'),
(40, 'The Lord of the Rings', 'Epic fantasy novel by J.R.R. Tolkien.', 22.00, 10, 'produits/PHAUDZLO2tk0OyvitwTJAj4pMp0aKj5cbNbk1lH7.jpg', 2, 1, NULL, '2025-04-28 12:21:26'),
(41, 'The Alchemist', 'Philosophical novel by Paulo Coelho.', 14.20, 24, 'produits/F7FlRlyeync8kQ7qZoIy6RvNtTk3szWUWaLbfjbf.jpg', 2, 1, NULL, '2025-04-28 12:22:44'),
(42, 'Brave New World', 'Science fiction novel by Aldous Huxley.', 12.75, 21, 'produits/xFgEzSZADEI4X3KX4KjNKfzv1EjnFtkx3d6nmVY6.jpg', 2, 1, NULL, '2025-04-28 12:23:28'),
(43, 'Animal Farm', 'Political satire novel by George Orwell.', 8.99, 26, 'produits/vCeX38DcHa4C7bM9URMCAavzYLukBcR720iIgsKi.jpg', 2, 1, NULL, '2025-04-28 12:23:59'),
(45, 'A Game of Thrones', 'Fantasy novel by George R.R. Martin.', 20.00, 15, 'produits/YJeFTzJo7X62C8AC21iSOxxR6nT0tBq5oTu9EBST.jpg', 2, 1, NULL, '2025-04-28 12:25:30'),
(46, 'The Da Vinci Code', 'Mystery novel by Dan Brown.', 13.30, 18, 'produits/CJsAd2LnlQi6oUSkJxD1mqsSZfAuSJkRy9mYd7g6.jpg', 2, 1, NULL, '2025-04-28 12:26:13'),
(47, 'The Girl with the Dragon Tattoo', 'Mystery novel by Stieg Larsson.', 14.99, 22, 'produits/fRTZ0pK6RGdD4Hi1f73nOesncCu0aKjp3WWg0cYO.jpg', 2, 1, NULL, '2025-04-28 12:27:01'),
(51, 'Men\'s Cotton T-Shirt', 'Comfortable cotton t-shirt for men.', 19.99, 40, 'produits/9tTogENJrkxL7eLJpmcLoqG1f2IZ8wBVzX23QgxS.jpg', 3, 1, NULL, '2025-04-28 12:27:52'),
(53, 'Men\'s Slim Fit Jeans', 'Stylish slim-fit jeans.', 49.99, 30, 'produits/5Au7Qcb50fvneMRjcjsOcddzFFEEvijKsyy9m3zk.jpg', 3, 1, NULL, '2025-04-28 12:28:35'),
(55, 'Unisex Hoodie', 'Casual unisex hoodie.', 39.99, 35, 'produits/OlOzeHoOO5sxa5xWAj7WLjslWrWvhkfrNcjwNRgr.jpg', 3, 1, NULL, '2025-04-28 12:29:18'),
(56, 'Running Shoes', 'Lightweight running shoes.', 59.99, 28, 'produits/nDZje665Vn01SnUaYkZ6kPTuXDZ210DohjndGrQQ.jpg', 3, 1, NULL, '2025-04-28 12:30:17'),
(58, 'Women\'s Skinny Jeans', 'Trendy skinny jeans for women.', 44.99, 22, 'produits/AO8xXI4HfGiUiSOpXmYJlgQyoENVC26Sho2ZhjPZ.jpg', 3, 1, NULL, '2025-04-28 12:31:08'),
(59, 'Baseball Cap', 'Adjustable baseball cap.', 14.99, 50, 'produits/6fWxUVj8tNmmfYc0fmBz0TNJ9i5w4jKqBoyLjSjs.jpg', 3, 1, NULL, '2025-04-28 12:31:41'),
(60, 'Winter Scarf', 'Warm scarf for winter.', 24.99, 40, 'produits/Qj4hJeCtoDazCL10eNQLBTdDR5NJ0fRihvjewDs9.jpg', 3, 1, NULL, '2025-04-28 12:32:21'),
(61, 'Women\'s High Heels', 'Elegant high heels.', 69.99, 15, 'produits/qHKYftWMlJVXsMKpebqWSzj0mrvkCQR27pKndR1X.jpg', 3, 1, NULL, '2025-04-28 12:33:00'),
(62, 'Men\'s Sneakers', 'Casual sneakers for men.', 54.99, 30, 'produits/f3ehLhv9tOtNwJigPEviX7ggXRnoLFSqiPXrrZ3G.jpg', 3, 1, NULL, '2025-04-28 12:34:03');

-- --------------------------------------------------------

--
-- Table structure for table `reductions`
--

CREATE TABLE `reductions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(50) NOT NULL,
  `pourcentage_reduction` varchar(50) NOT NULL,
  `actif` tinyint(1) NOT NULL,
  `periode_reduction` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reductions`
--

INSERT INTO `reductions` (`id`, `nom`, `pourcentage_reduction`, `actif`, `periode_reduction`, `created_at`, `updated_at`) VALUES
(1, 'Black Friday', '20%', 1, '2023-11-24', '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(2, 'Cyber Monday', '15%', 1, '2023-11-27', '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(3, 'Black Friday', '20%', 1, '2023-11-24', '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(4, 'Cyber Monday', '15%', 1, '2023-11-27', '2025-04-25 10:11:10', '2025-04-25 10:11:10');

-- --------------------------------------------------------

--
-- Table structure for table `reduction_produit`
--

CREATE TABLE `reduction_produit` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `produit_id` bigint(20) UNSIGNED NOT NULL,
  `reduction_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reduction_produit`
--

INSERT INTO `reduction_produit` (`id`, `produit_id`, `reduction_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(2, 2, 1, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(3, 3, 2, '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(4, 1, 1, '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(5, 2, 1, '2025-04-25 10:11:10', '2025-04-25 10:11:10'),
(6, 3, 2, '2025-04-25 10:11:10', '2025-04-25 10:11:10');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('B0FkGuRJQAmkOzZgKjyC3jMzpc3ougaL7drj6u8f', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic1FoS0xlVVM4TDYycnU0cWU5eXE4RXMxQzJSRHhiV2tZeVNIUDVxRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1745579490);

-- --------------------------------------------------------

--
-- Table structure for table `tvas`
--

CREATE TABLE `tvas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(50) NOT NULL,
  `periode_TVA` varchar(50) NOT NULL,
  `taux` decimal(25,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tvas`
--

INSERT INTO `tvas` (`id`, `nom`, `periode_TVA`, `taux`, `created_at`, `updated_at`) VALUES
(1, 'TVA Standard', 'Mensuel', 20.00, '2025-04-25 09:57:03', '2025-04-25 09:57:03'),
(2, 'TVA Réduit', 'Trimestriel', 5.50, '2025-04-25 09:57:03', '2025-04-25 09:57:03'),
(3, 'nesciunt', 'ut', 7.26, '2025-04-25 09:57:09', '2025-04-25 09:57:09'),
(4, 'est', 'corporis', 7.45, '2025-04-25 09:57:09', '2025-04-25 09:57:09'),
(5, 'quia', 'atque', 37.54, '2025-04-25 09:57:10', '2025-04-25 09:57:10'),
(6, 'non', 'quas', 53.76, '2025-04-25 09:57:10', '2025-04-25 09:57:10'),
(7, 'qui', 'consequatur', 93.81, '2025-04-25 09:57:10', '2025-04-25 09:57:10'),
(8, 'et', 'aut', 68.09, '2025-04-25 09:57:11', '2025-04-25 09:57:11'),
(9, 'perferendis', 'enim', 49.54, '2025-04-25 09:57:11', '2025-04-25 09:57:11'),
(10, 'delectus', 'odio', 68.40, '2025-04-25 09:57:11', '2025-04-25 09:57:11'),
(11, 'repellendus', 'non', 71.57, '2025-04-25 09:57:12', '2025-04-25 09:57:12'),
(12, 'non', 'molestiae', 40.66, '2025-04-25 09:57:12', '2025-04-25 09:57:12'),
(13, 'TVA Standard', 'Mensuel', 20.00, '2025-04-25 10:11:06', '2025-04-25 10:11:06'),
(14, 'TVA Réduit', 'Trimestriel', 5.50, '2025-04-25 10:11:06', '2025-04-25 10:11:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `name` varchar(250) NOT NULL,
  `role` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `tele` varchar(20) DEFAULT NULL,
  `adresse` varchar(250) DEFAULT NULL,
  `points_fidélité` int(11) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `name`, `role`, `email`, `email_verified_at`, `password`, `tele`, `adresse`, `points_fidélité`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Chad', 'Franecki', 'user', 'jeramy.effertz@example.org', '2025-04-25 09:57:04', '$2y$12$qVi8eW/7NK2CkwXO2UL6a.BJMuDAbPRpbeXLC1FhWCGmfKrIfteIa', '(601) 510-0937', '970 Miller Camp\nEast Rosalindamouth, GA 77372', 4000, 'Z4AewAnMjb', '2025-04-25 09:57:08', '2025-04-28 11:45:34'),
(2, 'Lorenzo', 'Nicolas', 'admin', 'tgulgowski@example.com', '2025-04-25 09:57:05', '$2y$12$jm5ryNHuo2JN/Ve8wDLmQOqcYDigYQaC79Ss.hAumcfzr2IfOj6ye', '520.699.9127', '8609 Arnoldo Lodge\nBodeport, SD 17124-9812', 0, 'BFKEwaEqcc', '2025-04-25 09:57:08', '2025-04-25 09:57:08'),
(3, 'Gideon', 'Herzog', 'user', 'darion58@example.org', '2025-04-25 09:57:05', '$2y$12$NAEsjNeLA/g5oAWQJk5X1..xbD0EHBgWA24KWpVmPbSOqKIy1g7fm', '1-480-599-4070', '9446 Jewel Manor Suite 312\nKianfurt, MD 19423-5422', 0, 'tWOArUUwEt', '2025-04-25 09:57:08', '2025-04-25 09:57:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `avis_user_id_foreign` (`user_id`),
  ADD KEY `avis_produit_id_foreign` (`produit_id`);

--
-- Indexes for table `caracteristiques`
--
ALTER TABLE `caracteristiques`
  ADD PRIMARY KEY (`id`),
  ADD KEY `caracteristiques_produit_id_foreign` (`produit_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commandes_user_id_foreign` (`user_id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coupons_code_unique` (`code`);

--
-- Indexes for table `factures`
--
ALTER TABLE `factures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `factures_commande_id_foreign` (`commande_id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`Id_FAQ`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favourites_user_id_foreign` (`user_id`);

--
-- Indexes for table `ligne_commandes`
--
ALTER TABLE `ligne_commandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ligne_commandes_commande_id_foreign` (`commande_id`),
  ADD KEY `ligne_commandes_produit_id_foreign` (`produit_id`);

--
-- Indexes for table `ligne_panier`
--
ALTER TABLE `ligne_panier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ligne_panier_produit_id_foreign` (`produit_id`),
  ADD KEY `ligne_panier_panier_id_foreign` (`panier_id`);

--
-- Indexes for table `livraisons`
--
ALTER TABLE `livraisons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `livraisons_commande_id_foreign` (`commande_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paiements`
--
ALTER TABLE `paiements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paiements_facture_id_foreign` (`facture_id`);

--
-- Indexes for table `paniers`
--
ALTER TABLE `paniers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paniers_user_id_foreign` (`user_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `produits_category_id_foreign` (`category_id`),
  ADD KEY `produits_tva_id_foreign` (`tva_id`);

--
-- Indexes for table `reductions`
--
ALTER TABLE `reductions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reduction_produit`
--
ALTER TABLE `reduction_produit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reduction_produit_produit_id_foreign` (`produit_id`),
  ADD KEY `reduction_produit_reduction_id_foreign` (`reduction_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tvas`
--
ALTER TABLE `tvas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `avis`
--
ALTER TABLE `avis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `caracteristiques`
--
ALTER TABLE `caracteristiques`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `factures`
--
ALTER TABLE `factures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `Id_FAQ` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `favourites`
--
ALTER TABLE `favourites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ligne_commandes`
--
ALTER TABLE `ligne_commandes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `ligne_panier`
--
ALTER TABLE `ligne_panier`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `livraisons`
--
ALTER TABLE `livraisons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `paiements`
--
ALTER TABLE `paiements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `paniers`
--
ALTER TABLE `paniers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `reductions`
--
ALTER TABLE `reductions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reduction_produit`
--
ALTER TABLE `reduction_produit`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tvas`
--
ALTER TABLE `tvas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `avis_produit_id_foreign` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `avis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `caracteristiques`
--
ALTER TABLE `caracteristiques`
  ADD CONSTRAINT `caracteristiques_produit_id_foreign` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `factures`
--
ALTER TABLE `factures`
  ADD CONSTRAINT `factures_commande_id_foreign` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ligne_commandes`
--
ALTER TABLE `ligne_commandes`
  ADD CONSTRAINT `ligne_commandes_commande_id_foreign` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ligne_commandes_produit_id_foreign` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ligne_panier`
--
ALTER TABLE `ligne_panier`
  ADD CONSTRAINT `ligne_panier_panier_id_foreign` FOREIGN KEY (`panier_id`) REFERENCES `paniers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ligne_panier_produit_id_foreign` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `livraisons`
--
ALTER TABLE `livraisons`
  ADD CONSTRAINT `livraisons_commande_id_foreign` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `paiements`
--
ALTER TABLE `paiements`
  ADD CONSTRAINT `paiements_facture_id_foreign` FOREIGN KEY (`facture_id`) REFERENCES `factures` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `paniers`
--
ALTER TABLE `paniers`
  ADD CONSTRAINT `paniers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `produits_tva_id_foreign` FOREIGN KEY (`tva_id`) REFERENCES `tvas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reduction_produit`
--
ALTER TABLE `reduction_produit`
  ADD CONSTRAINT `reduction_produit_produit_id_foreign` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reduction_produit_reduction_id_foreign` FOREIGN KEY (`reduction_id`) REFERENCES `reductions` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
