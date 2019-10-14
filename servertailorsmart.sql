-- phpMyAdmin SQL Dump
-- version 4.7.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 03, 2019 at 05:17 PM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `servertailorsmart`
--

-- --------------------------------------------------------

--
-- Table structure for table `advertisement_master`
--

CREATE TABLE `advertisement_master` (
  `adId` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `photoUrl` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  `mediaType` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_slots`
--

CREATE TABLE `appointment_slots` (
  `slotId` int(11) NOT NULL,
  `slotTime` varchar(100) NOT NULL,
  `cityId` int(10) DEFAULT NULL,
  `isActive` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointment_slots`
--

INSERT INTO `appointment_slots` (`slotId`, `slotTime`, `cityId`, `isActive`) VALUES
(1, '10 am to 12 am', 1, 1),
(2, '12 am to 2 pm', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer_appointment_master`
--

CREATE TABLE `customer_appointment_master` (
  `appointmentId` int(11) NOT NULL,
  `customerId` int(11) DEFAULT NULL,
  `productIds` varchar(200) NOT NULL,
  `fabricIds` varchar(500) NOT NULL,
  `appointmentDate` date NOT NULL,
  `slotId` int(11) NOT NULL,
  `servingEmployeeId` int(11) DEFAULT NULL,
  `appointmentStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_gcm_apns_master`
--

CREATE TABLE `customer_gcm_apns_master` (
  `customerId` int(11) NOT NULL,
  `deviceId` varchar(300) NOT NULL,
  `osType` varchar(10) NOT NULL,
  `appVersion` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_gcm_apns_master`
--

INSERT INTO `customer_gcm_apns_master` (`customerId`, `deviceId`, `osType`, `appVersion`) VALUES
(7, 'cgKRpl4-wNU:APA91bF1-P2r3YWGGvLTXWBEh5VZb8rX6uRZ8gN0hojwM4jSgHaFwLDs5hNhFmjUrsPW0spXBKkOHBTkxZsgyBbz9x-p_VtF6Iw4ERzfv-VVmKaj3pkP3bMZKh1PVo3MRsndUbKFdP6B', 'Android', '1'),
(7, 'dIkjt4yGvoQ:APA91bEm4_72oRNa8-O3gxxdX33Noi7cCL_XWD2-pAuaZLqkVkCVPXxmnh1k-YO-4A8a4CnUTTkYgGbQvZj4jZfpUgANdbMw32zIagKw8WTFY_2stDXMdqDjWj1deCD1ovcRnC0jXTax', 'Android', '1'),
(7, 'dWE5cnJVOgA:APA91bG_VYNLORDTzpzYYsLgdPGHGwweLG93v_Zq9IjBfjq0afXeI5J9Mjf_F9axQU6uAxcfloMCMH-TAiwnZHXUcgFl6FPV0F7jAdLsQ3n2pO2uOSF_gw9K-xpVXpfCFXsn0Kbiebmd', 'Android', '1'),
(7, 'e6Svytrd4VU:APA91bFfuxf2KKev7NmOOR0_8QB9wVew7BPq1KoER_DxtfcKKiDb1Fwr4T8SgWuSpKEYc3rvN1Iem4aJp64MS-hxjTKoqcYV2VruisbfhsqamEdvncj85RVTGO-HLdqckJS8nQkO86lx', 'Android', '1'),
(7, 'eLbek1KhSck:APA91bGK5z40IB3NQmvmYtrpWzeiGEIqgP90HLnyrLsL5_zpYdcRmj-24Q9SISUW-Xjau4NTcB8GsvLF9FwgkoQ7daarJpoTLIKefy5tk5SrBWnbLUd6qUP9ko3R-f4Gz6PE39TzHWFT', 'Android', '1'),
(7, 'fld9Yym5j9Y:APA91bExGJAJn9v89UP4CED7fA53A7YV_Owd5gAd9yn0pwoa67I1UayJ9iOjUcMXf94EesJuspv_zG1rLfp7FqIMV-vM2-ENm5NS4e9oNtPW7T8W3B6gZEoGLOTJCCux4Mjg_IWPH_CU', 'Android', '1'),
(80, 'dWE5cnJVOgA:APA91bG_VYNLORDTzpzYYsLgdPGHGwweLG93v_Zq9IjBfjq0afXeI5J9Mjf_F9axQU6uAxcfloMCMH-TAiwnZHXUcgFl6FPV0F7jAdLsQ3n2pO2uOSF_gw9K-xpVXpfCFXsn0Kbiebmd', 'Android', '1'),
(81, 'dLf2AqLGKV8:APA91bHjfXmfSjZ2LMWxAiUKNurbHCYfYo2ZCeE1BAO-FlicV-4hG4hLdGAXDSoNeC1f0xNvSVZslJJnsOr1yAVeIsN__AYabflJFHsc6guJvw4keuGs0gGMe2OuezKJiECx0NjOHq4W', 'Android', '1'),
(82, 'cYgBsE_b_Ug:APA91bF3RciU3H3NPvgJdztCj4mNP-3um55du1nOpkHHhqE2NaDb5j00DGvjBuSwPzoH85KUq-KbLvXJJE540_Xky0EMbfjFRGimFK1h66FkwaVnFQY8tOXqaB0cBlb_kKOzxpuskI3j', 'Android', '1'),
(82, 'fBF_TSbwWFs:APA91bE3nFOU-7poHx0i0yjJlQeKvqES55hnL5J0w6lG0ADmVedrQ7iwAtY8URDg_v6VJyZTXNEG_yllU9Poh1Aufa-V1TblU1qaeDaZKwcG9ZEsWm4Ec56NsiZaIIBg8gVm9bLl09yH', 'Android', '1'),
(83, 'cSUPAZpMUQs:APA91bGRbcVwenwmFO_4Q0DUyPcwA81X2szpj2hU8W9joYQwaGPLOYvls35_dK2O57E2CE5tTCVmvhFDWklXgoZDxEe1CyJiFO6ofSn60Rkna2WxtMBIqLkbJZ5cisez5T6wEsEsaHgq', 'Android', '1');

-- --------------------------------------------------------

--
-- Table structure for table `customer_master`
--

CREATE TABLE `customer_master` (
  `customerId` int(11) NOT NULL,
  `firstName` varchar(300) DEFAULT NULL,
  `lastName` varchar(300) DEFAULT NULL,
  `email` varchar(300) NOT NULL,
  `date_birth` date DEFAULT NULL,
  `mobile` varchar(300) DEFAULT NULL,
  `landline` varchar(300) DEFAULT NULL,
  `city` varchar(300) DEFAULT NULL,
  `state` varchar(300) DEFAULT NULL,
  `country` varchar(30) NOT NULL,
  `address` text CHARACTER SET utf8,
  `isMale` int(11) DEFAULT '0',
  `password` varchar(300) DEFAULT NULL,
  `latitude` double NOT NULL DEFAULT '0',
  `longitude` double NOT NULL DEFAULT '0',
  `landmark` varchar(100) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT '1',
  `issocial` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_master`
--

INSERT INTO `customer_master` (`customerId`, `firstName`, `lastName`, `email`, `date_birth`, `mobile`, `landline`, `city`, `state`, `country`, `address`, `isMale`, `password`, `latitude`, `longitude`, `landmark`, `isActive`, `issocial`) VALUES
(7, 'PRASAD', 'Nikumbh', 'pvn2266@gmail.com', '0000-00-00', '7058420909', '', 'Pune', 'Maharashtra', 'India', 'Bibvewadi', 0, 'prasad', 0, 0, '', 1, 0),
(10, 'AJAY', 'SHARMA', 'ajaysharma20112124@gmail.com', '0000-00-00', '8208977573', '', 'Pune', 'Maharashtra', 'India', 'flat no 2 vishal prime gokul nagar dhanori.', 0, 'ajaysharma20112124@gmail.com', 0, 0, 'Kharadi', 1, 1),
(79, 'Praveen', 'Kamble', 'pravin@tailorsmart.in', '0000-00-00', '9325519474', '', 'Pune', 'Maharashtra', 'India', 'H 103 , NAV pinnac kanchanganga HSG society, near Parihar chowk Aundh Pune\n Maharashtra 411007, India', 0, 'nileema1981', 18.5301907, 73.9137294, 'Magarpatta', 1, 0),
(80, 'Kunal', 'Kapse', 'kunal@gmail.com', '0000-00-00', '9766695099', '', 'Pune', 'Maharashtra', 'India', 'dhule', 0, '1234', 0, 0, '', 1, 1),
(81, 'Darsh', 'Nikumbh', 'darshanvnikumbh@gmail.com', '0000-00-00', '', '', '', '', '', '', 0, 'darshanvnikumbh@gmail.com', 0, 0, '', 1, 1),
(82, 'Vikas', 'Pawar', 'vikaspawar3110@gmail.com', '0000-00-00', '9612345678', '', 'Pune', 'Maharashtra', 'India', 'plot no.01., shivajinagar Railway station,shivajinagar,pune-05, Pune, Maharashtra 411005, India', 0, 'vikaspawar3110@gmail.com', 18.5328725, 73.8493205, '', 1, 1),
(83, 'Kunal', 'Kapse', 'krkunal29@gmail.com', '0000-00-00', '9766695099', '', 'Pune', 'Maharashtra', 'India', 'plot no.01., shivajinagar Railway station,shivajinagar,pune-05, Pune, Maharashtra 411005, India', 0, 'krkunal29@gmail.com', 18.5328725, 73.8493205, '', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer_order_items_master`
--

CREATE TABLE `customer_order_items_master` (
  `orderItemId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `orderItemPrice` float NOT NULL,
  `employeeid` int(11) DEFAULT NULL,
  `creationDateTime` datetime NOT NULL,
  `isAlterNeeded` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_order_items_measurement`
--

CREATE TABLE `customer_order_items_measurement` (
  `orderItemid` int(11) NOT NULL,
  `measurementId` int(11) NOT NULL,
  `value` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_order_item_fabric_master`
--

CREATE TABLE `customer_order_item_fabric_master` (
  `orderItemid` int(11) NOT NULL,
  `fabricId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_order_item_style_master`
--

CREATE TABLE `customer_order_item_style_master` (
  `orderItemId` int(11) NOT NULL,
  `stitchStyleId` int(11) NOT NULL,
  `stitchSubStyleId` int(11) NOT NULL,
  `value` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_order_master`
--

CREATE TABLE `customer_order_master` (
  `orderId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `amount` float NOT NULL DEFAULT '0',
  `currency` varchar(50) NOT NULL,
  `purchaseDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `promoCode` varchar(50) DEFAULT NULL,
  `orderStatus` int(11) NOT NULL DEFAULT '0',
  `employeeId` int(11) NOT NULL,
  `isConfirmed` int(11) NOT NULL DEFAULT '0',
  `customerExpectedDate` date DEFAULT NULL,
  `FinalDeliveryDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_order_payments`
--

CREATE TABLE `customer_order_payments` (
  `paymentId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `paymentType` varchar(50) NOT NULL,
  `paymentMode` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `currency` varchar(50) NOT NULL,
  `isSuceed` int(11) NOT NULL DEFAULT '0',
  `createdBy` int(11) DEFAULT NULL,
  `paymentDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `deletedBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_referral_order_master`
--

CREATE TABLE `customer_referral_order_master` (
  `customerId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `orderDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_wishlist_master`
--

CREATE TABLE `customer_wishlist_master` (
  `wishId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `wishDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employee_master`
--

CREATE TABLE `employee_master` (
  `employeeId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `firstName` varchar(80) NOT NULL,
  `lastName` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `city` varchar(80) NOT NULL,
  `state` varchar(80) NOT NULL,
  `adharId` varchar(50) NOT NULL,
  `address` varchar(350) NOT NULL,
  `password` varchar(50) NOT NULL,
  `birthDate` date NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_master`
--

INSERT INTO `employee_master` (`employeeId`, `roleId`, `firstName`, `lastName`, `email`, `mobile`, `city`, `state`, `adharId`, `address`, `password`, `birthDate`, `isActive`) VALUES
(1, 1, 'kunal', 'kapse', 'krkunal29@gmail.com', '9975172266', 'Dhule', 'Maharashtra', '858596351234', 'Near Dhule', 'varun', '2019-02-04', 1),
(2, 2, 'vikas', 'pawar', 'vikaspawar3110@gmail.com', '7588622005', 'Rahuri', 'Maharashtra', '1234', 'shivaji nagar Pune', '1234', '2019-09-01', 1),
(3, 3, 'prasad', 'nikumbh', 'prasad@gmail.com', '7852112022', 'Pune', 'Maharashtra', '1234567892', 'Aundh Pune', '1234', '2019-09-12', 1),
(26, 4, 'pranav', 'kk', 'kk', '7575757575', '', '', '', '', '1234', '2019-09-17', 1),
(27, 4, 'darshan ', 'Nikumbh', 'darshan@gmail.com', '7474747474', 'pune', 'maharashtra', '123456', 'pune city', '1234', '2019-10-03', 1);

-- --------------------------------------------------------

--
-- Table structure for table `holiday_master`
--

CREATE TABLE `holiday_master` (
  `holidayId` int(11) NOT NULL,
  `skipDate` date NOT NULL,
  `holidayTitle` varchar(150) NOT NULL,
  `cityId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `holiday_master`
--

INSERT INTO `holiday_master` (`holidayId`, `skipDate`, `holidayTitle`, `cityId`) VALUES
(2, '2019-09-10', 'Diwali', 1),
(4, '2019-09-11', 'Holi', 2),
(7, '2019-09-17', 'Vasubaras', 3),
(8, '2019-09-25', 'barkari id', 4),
(9, '2019-10-02', 'Ganesh Chaturthi', 5);

-- --------------------------------------------------------

--
-- Table structure for table `measurement_item_master`
--

CREATE TABLE `measurement_item_master` (
  `measurementId` int(11) NOT NULL,
  `itemTitle` varchar(200) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `measurement_item_master`
--

INSERT INTO `measurement_item_master` (`measurementId`, `itemTitle`, `isActive`) VALUES
(1, 'KNEE LENGTH', 1),
(2, 'LENGTH', 1),
(3, 'Crs - FRONT', 1),
(4, 'FRONT - 1', 1),
(5, 'FRONT - 2', 1),
(6, 'SHOULDER', 1),
(7, 'FRONT - 3', 1),
(8, 'NECK', 1),
(9, 'SLEEVES', 1),
(10, 'CHEST', 1),
(11, 'HIP', 1),
(12, 'STOMACH', 1),
(13, 'CRS GHERA', 1),
(14, 'CHEST - DOWN', 1),
(15, 'Inseam', 1),
(16, 'Ready Fly', 1),
(17, 'Rounding', 1),
(18, 'Waist', 1),
(20, 'Thigh', 1),
(21, 'Knee', 1),
(22, 'Bottom', 1),
(23, 'Front Kata', 1),
(24, 'Back Kata', 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_feedback_master`
--

CREATE TABLE `order_feedback_master` (
  `feedbackId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `feedbackComments` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_catalog_measurement_master`
--

CREATE TABLE `product_catalog_measurement_master` (
  `productId` int(11) NOT NULL,
  `measurementId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_catalog_measurement_master`
--

INSERT INTO `product_catalog_measurement_master` (`productId`, `measurementId`) VALUES
(1, 1),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(6, 10),
(6, 16),
(2, 2),
(2, 6),
(2, 9),
(2, 10),
(2, 11),
(2, 12);

-- --------------------------------------------------------

--
-- Table structure for table `product_catalog_style_master`
--

CREATE TABLE `product_catalog_style_master` (
  `productId` int(11) NOT NULL,
  `stitchStyleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_catalog_style_master`
--

INSERT INTO `product_catalog_style_master` (`productId`, `stitchStyleId`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 14),
(1, 16),
(6, 11),
(6, 15),
(6, 16);

-- --------------------------------------------------------

--
-- Table structure for table `product_category_master`
--

CREATE TABLE `product_category_master` (
  `categoryId` int(11) NOT NULL,
  `categoryTitle` varchar(100) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_category_master`
--

INSERT INTO `product_category_master` (`categoryId`, `categoryTitle`, `isActive`) VALUES
(1, 'All', 1),
(2, 'From Designer\'s Desk', 1),
(3, 'Festive', 1),
(4, 'Most Liked', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_fabric_mapping_master`
--

CREATE TABLE `product_fabric_mapping_master` (
  `productId` int(11) NOT NULL,
  `fabricId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_fabric_mapping_master`
--

INSERT INTO `product_fabric_mapping_master` (`productId`, `fabricId`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 24),
(1, 25),
(1, 26),
(1, 27),
(1, 28),
(1, 30),
(1, 31),
(1, 32),
(1, 33),
(1, 34),
(1, 35),
(1, 36),
(1, 37),
(1, 38),
(1, 39),
(1, 40),
(1, 41),
(1, 42),
(1, 43),
(1, 44),
(1, 45),
(1, 46),
(1, 47),
(1, 48),
(1, 49),
(1, 50),
(1, 51),
(1, 52),
(1, 53),
(1, 54),
(1, 55),
(1, 56),
(1, 57),
(1, 58),
(1, 59),
(1, 60),
(1, 61),
(1, 62),
(1, 63),
(1, 64),
(1, 65),
(1, 66),
(1, 67),
(1, 68),
(1, 69),
(1, 70),
(1, 71),
(1, 72),
(1, 73),
(1, 74),
(1, 75),
(1, 76),
(1, 77),
(1, 78),
(1, 79),
(1, 80),
(1, 81),
(1, 82),
(1, 83),
(1, 84),
(1, 85),
(1, 86),
(1, 87),
(1, 88),
(1, 89),
(1, 90),
(1, 91),
(1, 92),
(1, 93),
(1, 94),
(1, 95),
(1, 96),
(1, 97),
(1, 98),
(1, 99),
(1, 100),
(1, 101),
(1, 102),
(1, 103),
(1, 104),
(1, 105),
(1, 106),
(1, 107),
(1, 108),
(1, 109),
(1, 110),
(1, 111),
(1, 112),
(1, 113),
(1, 114),
(1, 115),
(1, 116),
(1, 117),
(1, 118),
(1, 119),
(1, 120),
(1, 121),
(1, 122),
(1, 123),
(1, 124),
(1, 125),
(1, 126),
(1, 127),
(1, 128),
(1, 129),
(1, 130),
(1, 131),
(1, 132),
(1, 133),
(1, 134),
(1, 135),
(1, 136),
(1, 137),
(1, 138),
(1, 139),
(1, 140),
(1, 141),
(1, 142),
(1, 143),
(1, 144),
(1, 145),
(1, 146),
(1, 147),
(1, 148),
(1, 149),
(1, 150),
(1, 151),
(1, 152),
(1, 153),
(1, 154),
(1, 155),
(1, 156),
(1, 157),
(1, 158),
(6, 298),
(6, 299),
(6, 300),
(6, 301),
(6, 302),
(6, 303),
(6, 304),
(6, 305),
(6, 306),
(6, 307),
(6, 308),
(6, 309),
(6, 310),
(6, 311),
(6, 312),
(6, 313),
(6, 314),
(6, 315),
(6, 316),
(6, 317),
(6, 318),
(6, 319),
(6, 321),
(6, 322),
(6, 323),
(6, 324),
(6, 325),
(6, 326),
(6, 327),
(6, 328),
(6, 329),
(6, 330),
(6, 331),
(6, 332),
(6, 333),
(6, 334),
(6, 335),
(6, 336),
(6, 337),
(6, 338),
(6, 339),
(6, 340),
(6, 341),
(6, 342),
(6, 343),
(6, 344),
(6, 345),
(6, 346),
(6, 347),
(6, 348),
(6, 349),
(6, 350),
(6, 351),
(6, 352),
(6, 353),
(6, 354),
(6, 355),
(6, 356),
(6, 357),
(6, 358),
(6, 359),
(6, 360),
(6, 361),
(6, 362),
(6, 363),
(6, 364),
(6, 365),
(6, 366),
(6, 367),
(6, 368),
(6, 369),
(6, 370),
(6, 371),
(6, 372),
(6, 373),
(6, 374),
(6, 375),
(6, 376),
(6, 377),
(6, 378),
(6, 379),
(6, 380),
(6, 381),
(6, 382),
(6, 383),
(6, 384),
(6, 385),
(6, 386),
(6, 387),
(6, 388),
(6, 389),
(6, 390),
(6, 391),
(6, 392),
(6, 393),
(6, 394),
(6, 395),
(6, 396),
(6, 397),
(6, 398),
(6, 399),
(6, 400),
(6, 401),
(6, 402),
(6, 403),
(6, 404),
(6, 405),
(6, 406),
(6, 407),
(6, 408),
(6, 409),
(6, 410),
(6, 411),
(6, 412),
(6, 413),
(6, 414),
(6, 415),
(6, 416),
(6, 417),
(6, 418),
(6, 419),
(6, 420),
(6, 421),
(6, 422),
(6, 423),
(6, 424),
(6, 425),
(6, 426),
(6, 427),
(6, 428),
(6, 429),
(6, 430),
(6, 431),
(6, 432),
(6, 433),
(6, 434),
(6, 438),
(6, 439),
(6, 443),
(6, 444),
(6, 455),
(8, 456),
(8, 457),
(8, 458),
(8, 459),
(8, 460),
(8, 461),
(8, 462),
(8, 463),
(8, 464),
(8, 465),
(8, 466),
(8, 467),
(8, 468),
(8, 469),
(8, 470),
(8, 471),
(8, 472),
(8, 473),
(8, 474),
(8, 475),
(8, 476),
(8, 477),
(8, 478),
(8, 479),
(8, 480),
(8, 481),
(8, 482),
(8, 483),
(8, 484),
(8, 485),
(8, 486),
(8, 487),
(8, 488),
(8, 489),
(8, 490),
(8, 491),
(8, 492),
(8, 493),
(8, 494),
(8, 495),
(8, 496),
(8, 497),
(8, 498),
(8, 499),
(8, 500),
(8, 501),
(8, 502),
(8, 503),
(8, 504),
(8, 505),
(8, 506),
(8, 507),
(8, 508),
(8, 509),
(8, 510),
(8, 511),
(8, 512),
(8, 513),
(8, 514),
(8, 515),
(8, 516),
(8, 517),
(8, 518),
(8, 519),
(8, 520),
(8, 521),
(8, 522),
(8, 523),
(8, 524),
(8, 525),
(8, 526),
(8, 527),
(8, 528),
(8, 529),
(8, 530),
(8, 531),
(8, 532),
(8, 533),
(8, 534),
(8, 535),
(8, 536),
(8, 537),
(8, 538),
(8, 539),
(8, 540),
(8, 541),
(8, 542),
(8, 543),
(8, 544),
(8, 545),
(8, 546),
(8, 547),
(8, 548),
(8, 549),
(8, 550),
(8, 551),
(8, 552),
(8, 553),
(8, 554),
(8, 555),
(8, 556),
(8, 557),
(8, 558),
(8, 559),
(8, 560),
(8, 561),
(8, 562),
(9, 563),
(9, 564),
(9, 565),
(9, 566),
(9, 567),
(9, 568),
(9, 569),
(9, 570),
(9, 571),
(9, 572),
(9, 573),
(9, 574),
(9, 575),
(9, 576),
(9, 577),
(9, 578),
(9, 579),
(9, 580),
(9, 581),
(9, 582),
(9, 583),
(9, 584),
(9, 585),
(9, 586),
(9, 587),
(9, 588),
(9, 589),
(9, 590),
(9, 591),
(9, 592),
(9, 593),
(9, 594),
(9, 595),
(9, 596),
(9, 597),
(9, 598),
(9, 600),
(9, 601),
(9, 602),
(9, 603),
(9, 604),
(9, 605),
(9, 606),
(9, 607),
(9, 608),
(9, 609),
(9, 610),
(9, 611),
(9, 612),
(9, 614),
(9, 615),
(9, 616),
(9, 617),
(9, 618),
(9, 619),
(9, 620),
(9, 621),
(9, 622),
(9, 623),
(9, 624),
(9, 625),
(9, 626),
(9, 627),
(9, 628),
(9, 629),
(9, 630),
(9, 631),
(9, 632),
(9, 633),
(9, 634),
(9, 635),
(9, 636),
(9, 637),
(9, 638),
(9, 639),
(9, 640),
(9, 641),
(9, 642),
(9, 643),
(9, 644),
(9, 645),
(9, 646),
(9, 647),
(9, 648),
(9, 649),
(9, 650),
(9, 651),
(9, 652),
(9, 653),
(9, 654),
(9, 655),
(9, 656),
(9, 657),
(9, 658),
(9, 659),
(9, 660),
(9, 661),
(9, 662),
(9, 663),
(9, 664),
(9, 665),
(9, 666),
(9, 667),
(9, 668),
(9, 669);

-- --------------------------------------------------------

--
-- Table structure for table `product_fabric_master`
--

CREATE TABLE `product_fabric_master` (
  `fabricId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `fabricTitle` varchar(150) NOT NULL,
  `fabricBrand` varchar(200) NOT NULL,
  `fabricDetails` varchar(500) NOT NULL,
  `skuNo` varchar(100) NOT NULL,
  `ownerid` int(11) DEFAULT NULL,
  `fabricPrice` float NOT NULL DEFAULT '0',
  `releaseDate` date NOT NULL,
  `isPriceVariable` int(11) NOT NULL DEFAULT '0',
  `hexColor` varchar(20) NOT NULL DEFAULT '',
  `colorName` varchar(100) NOT NULL,
  `fabricType` varchar(150) NOT NULL,
  `isActive` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_fabric_master`
--

INSERT INTO `product_fabric_master` (`fabricId`, `categoryId`, `fabricTitle`, `fabricBrand`, `fabricDetails`, `skuNo`, `ownerid`, `fabricPrice`, `releaseDate`, `isPriceVariable`, `hexColor`, `colorName`, `fabricType`, `isActive`) VALUES
(1, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', 'details', 'RYB10001', 1, 5799, '0000-00-00', 0, '556898', 'Black', 'PV', 1),
(2, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10002', 1, 5799, '0000-00-00', 0, '556898', 'Deep Blue with Mini-checks', 'PV', 1),
(3, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10003', 1, 5799, '0000-00-00', 0, '556898', 'Black', 'PV', 1),
(4, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10004', 1, 5799, '0000-00-00', 0, '556898', 'Navy Blue', 'PV', 1),
(5, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10005', 1, 5799, '0000-00-00', 0, '556898', 'Chocolate Brown', 'PV', 1),
(6, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10006', 1, 5799, '0000-00-00', 0, '556898', 'Cream', 'PV', 1),
(7, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10007', 1, 5799, '0000-00-00', 0, '556898', 'Solid Blue', 'PV', 1),
(8, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10008', 1, 5799, '0000-00-00', 0, '556898', 'Deep Grey', 'PV', 1),
(9, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10009', 1, 5799, '0000-00-00', 0, '556898', 'Olive Green', 'PV', 1),
(10, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10010', 1, 5799, '0000-00-00', 0, '556898', 'Dark Grey', 'PV', 1),
(11, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10011', 1, 5799, '0000-00-00', 0, '556898', 'Glossy Deep Grey', 'PV', 1),
(12, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10012', 1, 5799, '0000-00-00', 0, '556898', 'Bluish Grey', 'PV', 1),
(13, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10013', 1, 5799, '0000-00-00', 0, '556898', 'Solid Grainy Black', 'PV', 1),
(14, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10014', 1, 5799, '0000-00-00', 0, '556898', 'Deep Black', 'PV', 1),
(15, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10015', 1, 5799, '0000-00-00', 0, '556898', 'Jet Black with Self Design', 'PV', 1),
(16, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10016', 1, 5799, '0000-00-00', 0, '556898', 'Solid Brown', 'PV', 1),
(17, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10017', 1, 5799, '0000-00-00', 0, '556898', 'Lt Brown', 'PV', 1),
(18, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10018', 1, 5799, '0000-00-00', 0, '556898', 'Bold Grey', 'PV', 1),
(19, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10019', 1, 5799, '0000-00-00', 0, '556898', 'Grey', 'PV', 1),
(20, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10020', 1, 5799, '0000-00-00', 0, '556898', 'Lt Grey', 'PV', 1),
(21, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10021', 1, 5799, '0000-00-00', 0, '556898', 'Deep Black', 'PV', 1),
(22, 1, 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10022', 1, 5799, '0000-00-00', 0, '556898', 'Navy Blue', 'PV', 1),
(24, 1, 'Raymond Terrywool Mens Blazers', 'Raymond', '', 'RYB1001', 1, 7772, '0000-00-00', 0, '556898', 'Navy Blue', 'Terrywool', 1),
(25, 1, 'Raymond Terrywool Mens Blazers', 'Raymond', '', 'RYB1002', 1, 7772, '0000-00-00', 0, '556898', 'Black', 'Terrywool', 1),
(26, 1, 'Raymond Terrywool Mens Blazers', 'Raymond', '', 'RYB1003', 1, 7772, '0000-00-00', 0, '556898', 'Grey', 'Terrywool', 1),
(27, 1, 'Raymond Terrywool Mens Blazers', 'Raymond', '', 'RYB1004', 1, 7772, '0000-00-00', 0, '556898', 'Ink Blue', 'Terrywool', 1),
(28, 1, 'Raymond Terrywool Mens Blazers', 'Raymond', '', 'RYB1005', 1, 7772, '0000-00-00', 0, '556898', 'Brown', 'Terrywool', 1),
(30, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB2001', 1, 7855, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(31, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB2002', 1, 7855, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(32, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB2003', 1, 7855, '0000-00-00', 0, '556898', 'Dark Blue', 'Wool Blend', 1),
(33, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB2004', 1, 7855, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(34, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB3001', 1, 8681, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(35, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB3002', 1, 8681, '0000-00-00', 0, '556898', 'Dark Grey', 'Wool Blend', 1),
(36, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB3003', 1, 8681, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(37, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB3004', 1, 8681, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(38, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB4001', 1, 9922, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(39, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB4002', 1, 9922, '0000-00-00', 0, '556898', 'Steel Grey', 'Wool Blend', 1),
(40, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB4003', 1, 9922, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(41, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB4004', 1, 9922, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(42, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB5001', 1, 10748, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(43, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB5002', 1, 10748, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(44, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB5003', 1, 10748, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(45, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB6001', 1, 11575, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(46, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB6002', 1, 11575, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(47, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB6003', 1, 11575, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(48, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB7001', 1, 12402, '0000-00-00', 0, '556898', 'Light Brown', 'Wool Blend', 1),
(49, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB7002', 1, 12402, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(50, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB7003', 1, 12402, '0000-00-00', 0, '556898', 'Blue', 'Wool Blend', 1),
(51, 1, 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB7004', 1, 12402, '0000-00-00', 0, '556898', 'black', 'Wool Blend', 1),
(52, 1, 'Raymond Poly Viscose Mens Blazers', 'Raymond', '', 'RYB8001', 1, 6614, '0000-00-00', 0, '556898', 'Brown', 'Poly Viscose', 1),
(53, 1, 'Raymond Poly Viscose Mens Blazers', 'Raymond', '', 'RYB8002', 1, 6614, '0000-00-00', 0, '556898', 'Black', 'Poly Viscose', 1),
(54, 1, 'Raymond Poly Viscose Mens Blazers', 'Raymond', '', 'RYB8003', 1, 6614, '0000-00-00', 0, '556898', 'Charcoal Black', 'Poly Viscose', 1),
(55, 1, 'Raymond Poly Viscose Mens Blazers', 'Raymond', '', 'RYB8004', 1, 6614, '0000-00-00', 0, '556898', 'Navy Blue', 'Poly Viscose', 1),
(56, 1, 'Raymond Fine Worsted Mens Blazers', 'Raymond', '', 'RYB9001', 1, 9508, '0000-00-00', 0, '556898', 'Brown', 'Fine Worsted', 1),
(57, 1, 'Raymond Fine Worsted Mens Blazers', 'Raymond', '', 'RYB9002', 1, 9508, '0000-00-00', 0, '556898', 'Black', 'Fine Worsted', 1),
(58, 1, 'Raymond Fine Worsted Mens Blazers', 'Raymond', '', 'RYB9003', 1, 9508, '0000-00-00', 0, '556898', 'Cream', 'Fine Worsted', 1),
(59, 1, 'Raymond Fine Worsted Mens Blazers', 'Raymond', '', 'RYB9004', 1, 9508, '0000-00-00', 0, '556898', 'Blue', 'Fine Worsted', 1),
(60, 1, 'Raymond Fine Worsted Mens Blazers', 'Raymond', '', 'RYB9005', 1, 9508, '0000-00-00', 0, '556898', 'Grey', 'Fine Worsted', 1),
(61, 1, 'Siyarams Poly Viscose Mens Blazers', 'Siyarams', '', 'SYB1001', 1, 5788, '0000-00-00', 0, '556898', 'Grey', 'Poly Viscose', 1),
(62, 1, 'Siyarams Poly Viscose Mens Blazers', 'Siyarams', '', 'SYB1002', 1, 5788, '0000-00-00', 0, '556898', 'Blue', 'Poly Viscose', 1),
(63, 1, 'Siyarams Poly Viscose Mens Blazers', 'Siyarams', '', 'SYB1003', 1, 5788, '0000-00-00', 0, '556898', 'Dark Grey', 'Poly Viscose', 1),
(64, 1, 'Siyarams Poly Viscose Mens Blazers', 'Siyarams', '', 'SYB1004', 1, 5788, '0000-00-00', 0, '556898', 'Black', 'Poly Viscose', 1),
(65, 1, 'Siyarams Terry wool Mens Blazers', 'Siyarams', '', 'SYB2001', 1, 6201, '0000-00-00', 0, '556898', 'Black', 'Terry wool', 1),
(66, 1, 'Siyarams Terry wool Mens Blazers', 'Siyarams', '', 'SYB2002', 1, 6201, '0000-00-00', 0, '556898', 'Grey', 'Terry wool', 1),
(67, 1, 'Siyarams Terry wool Mens Blazers', 'Siyarams', '', 'SYB2003', 1, 6201, '0000-00-00', 0, '556898', 'Blue', 'Terry wool', 1),
(68, 1, 'Siyarams TR Mens Blazers', 'Siyarams', '', 'SYB3001', 1, 6614, '0000-00-00', 0, '556898', 'Grey', 'TR', 1),
(69, 1, 'Siyarams TR Mens Blazers', 'Siyarams', '', 'SYB3002', 1, 6614, '0000-00-00', 0, '556898', 'Black', 'TR', 1),
(70, 1, 'Siyarams TR Mens Blazers', 'Siyarams', '', 'SYB3003', 1, 6614, '0000-00-00', 0, '556898', 'Blue', 'TR', 1),
(71, 1, 'Siyarams Worsted Mens Blazers', 'Siyarams', '', 'SYB4001', 1, 5581, '0000-00-00', 0, '556898', 'Black', 'Worsted', 1),
(72, 1, 'Siyarams Worsted Mens Blazers', 'Siyarams', '', 'SYB4002', 1, 5581, '0000-00-00', 0, '556898', 'Blue', 'Worsted', 1),
(73, 1, 'Siyarams Worsted Mens Blazers', 'Siyarams', '', 'SYB4003', 1, 5581, '0000-00-00', 0, '556898', 'Grey', 'Worsted', 1),
(74, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUBDSC_0696', 1, 6263, '0000-00-00', 0, '556898', 'dark brown', 'Worsted', 1),
(75, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUBDSC_0687', 1, 6263, '0000-00-00', 0, '556898', 'charcoal grey', 'Worsted', 1),
(76, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUBDSC_0688', 1, 6263, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(77, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUBDSC_0689', 1, 6263, '0000-00-00', 0, '556898', 'beige', 'Worsted', 1),
(78, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUBDSC_0690', 1, 6263, '0000-00-00', 0, '556898', 'steel grey', 'Worsted', 1),
(79, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0777', 1, 6056, '0000-00-00', 0, '556898', 'dark royal blue', 'Worsted', 1),
(80, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0758', 1, 6056, '0000-00-00', 0, '556898', 'light royal blue', 'Worsted', 1),
(81, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0759', 1, 6056, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(82, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0760', 1, 6056, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(83, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0761', 1, 6056, '0000-00-00', 0, '556898', 'khaki brown', 'Worsted', 1),
(84, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0762', 1, 6056, '0000-00-00', 0, '556898', 'navy blue', 'Worsted', 1),
(85, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0765', 1, 6056, '0000-00-00', 0, '556898', 'brick brown', 'Worsted', 1),
(86, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0766', 1, 6056, '0000-00-00', 0, '556898', 'brown', 'Worsted', 1),
(87, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0767', 1, 6056, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(88, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0769', 1, 6056, '0000-00-00', 0, '556898', 'khaki lt brown', 'Worsted', 1),
(89, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0770', 1, 6056, '0000-00-00', 0, '556898', 'grey', 'Worsted', 1),
(90, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0771', 1, 6056, '0000-00-00', 0, '556898', 'dark mustard ', 'Worsted', 1),
(91, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0772', 1, 6056, '0000-00-00', 0, '556898', 'light mustard', 'Worsted', 1),
(92, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0776', 1, 6056, '0000-00-00', 0, '556898', 'fawn', 'Worsted', 1),
(93, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0757', 1, 6056, '0000-00-00', 0, '556898', 'fawn', 'Worsted', 1),
(94, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0742', 1, 6056, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(95, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0744', 1, 6056, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(96, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0746', 1, 6056, '0000-00-00', 0, '556898', 'light royal blue', 'Worsted', 1),
(97, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0747', 1, 6056, '0000-00-00', 0, '556898', 'khaki brown', 'Worsted', 1),
(98, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0748', 1, 6056, '0000-00-00', 0, '556898', 'lt grey with black strands', 'Worsted', 1),
(99, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0749', 1, 6056, '0000-00-00', 0, '556898', 'lt brown with black strands', 'Worsted', 1),
(100, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0751', 1, 6056, '0000-00-00', 0, '556898', 'light khaki', 'Worsted', 1),
(101, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0752', 1, 6056, '0000-00-00', 0, '556898', 'cream', 'Worsted', 1),
(102, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0753', 1, 6056, '0000-00-00', 0, '556898', 'light grey', 'Worsted', 1),
(103, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0739', 1, 6056, '0000-00-00', 0, '556898', 'light brown', 'Worsted', 1),
(104, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0717', 1, 6056, '0000-00-00', 0, '556898', 'fawn', 'Worsted', 1),
(105, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0721', 1, 6056, '0000-00-00', 0, '556898', 'ink blue', 'Worsted', 1),
(106, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0723', 1, 6056, '0000-00-00', 0, '556898', 'charcoal grey', 'Worsted', 1),
(107, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0725', 1, 6056, '0000-00-00', 0, '556898', 'dark charcoal grey', 'Worsted', 1),
(108, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0727', 1, 6056, '0000-00-00', 0, '556898', 'navy blue ', 'Worsted', 1),
(109, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0728', 1, 6056, '0000-00-00', 0, '556898', 'dark brown', 'Worsted', 1),
(110, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0737', 1, 6056, '0000-00-00', 0, '556898', 'ivory', 'Worsted', 1),
(111, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0738', 1, 6056, '0000-00-00', 0, '556898', 'milky white', 'Worsted', 1),
(112, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUBDSC_0686', 1, 6056, '0000-00-00', 0, '556898', 'grey', 'Worsted', 1),
(113, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUBDSC_0671', 1, 6056, '0000-00-00', 0, '556898', 'khaki', 'Worsted', 1),
(114, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUBDSC_0675', 1, 6056, '0000-00-00', 0, '556898', 'dark ink blue', 'Worsted', 1),
(115, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUBDSC_0681', 1, 6056, '0000-00-00', 0, '556898', 'grey with buish checks', 'Worsted', 1),
(116, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUBDSC_0683', 1, 6056, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(117, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUBDSC_0712', 1, 6056, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(118, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUBDSC_0698', 1, 6056, '0000-00-00', 0, '556898', 'coffee brown', 'Worsted', 1),
(119, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUBDSC_0701', 1, 6056, '0000-00-00', 0, '556898', 'royal blue', 'Worsted', 1),
(120, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUBDSC_0705', 1, 6056, '0000-00-00', 0, '556898', 'dark bluish grey', 'Worsted', 1),
(121, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUBDSC_0708', 1, 6056, '0000-00-00', 0, '556898', 'brown', 'Worsted', 1),
(122, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUBDSC_0710', 1, 6056, '0000-00-00', 0, '556898', 'dark mustard ', 'Worsted', 1),
(123, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0639', 1, 6056, '0000-00-00', 0, '556898', 'brown', 'Worsted', 1),
(124, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0607', 1, 6056, '0000-00-00', 0, '556898', 'light royal blue', 'Worsted', 1),
(125, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0618', 1, 6056, '0000-00-00', 0, '556898', 'khaki with bluish tinge', 'Worsted', 1),
(126, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0621', 1, 6056, '0000-00-00', 0, '556898', 'purple with black strands', 'Worsted', 1),
(127, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0623', 1, 6056, '0000-00-00', 0, '556898', 'navy blue', 'Worsted', 1),
(128, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0624', 1, 6056, '0000-00-00', 0, '556898', 'dark royal blue', 'Worsted', 1),
(129, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0625', 1, 6056, '0000-00-00', 0, '556898', 'brown ', 'Worsted', 1),
(130, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0627', 1, 6056, '0000-00-00', 0, '556898', 'dark brown', 'Worsted', 1),
(131, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0630', 1, 6056, '0000-00-00', 0, '556898', 'coffee brown', 'Worsted', 1),
(132, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUBDSC_0662', 1, 6499, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(133, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUBDSC_0650', 1, 6499, '0000-00-00', 0, '556898', 'black', 'Worsted', 1),
(134, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUBDSC_0665', 1, 6499, '0000-00-00', 0, '556898', 'light brown', 'Worsted', 1),
(135, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUBDSC_0666', 1, 6499, '0000-00-00', 0, '556898', 'grey', 'Worsted', 1),
(136, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUBDSC_0667', 1, 6499, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(137, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'WAUBDSC_0712', 1, 6056, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(138, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'WAUBDSC_0698', 1, 6056, '0000-00-00', 0, '556898', 'coffee brown', 'Worsted', 1),
(139, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'WAUBDSC_0701', 1, 6056, '0000-00-00', 0, '556898', 'royal blue', 'Worsted', 1),
(140, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'WAUBDSC_0705', 1, 6056, '0000-00-00', 0, '556898', 'dark bluish grey', 'Worsted', 1),
(141, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'WAUBDSC_0708', 1, 6056, '0000-00-00', 0, '556898', 'brown', 'Worsted', 1),
(142, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'WAUBDSC_0710', 1, 6056, '0000-00-00', 0, '556898', 'dark mustard ', 'Worsted', 1),
(143, 1, 'Men\'s Casual Blazer Black', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT1001', 1, 5999, '0000-00-00', 0, '556898', 'black', 'Tropicana', 1),
(144, 1, 'Men\'s Casual Blazer Blue', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT1002', 1, 5999, '0000-00-00', 0, '556898', 'blue', 'Tropicana', 1),
(145, 1, 'Men\'s Casual Blazer Brown', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT1003', 1, 6799, '0000-00-00', 0, '556898', 'dark brown', 'Tropicana', 1),
(146, 1, 'Men\'s Casual Blazer Fawn', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT1006', 1, 6799, '0000-00-00', 0, '556898', 'fawn', 'Tropicana', 1),
(147, 1, 'Men\'s Casual Blazer Grey', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT1007', 1, 6499, '0000-00-00', 0, '556898', 'grey', 'Tropicana', 1),
(148, 1, 'Men\'s Casual Blazer Lt Grey', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT1008', 1, 7499, '0000-00-00', 0, '556898', 'Lt grey', 'Tropicana', 1),
(149, 1, 'Men\'s Casual Blazer Peach', 'Augustus Ultimo 102495', '65%poly 35%rayon', '', 1, 6499, '0000-00-00', 0, '556898', 'Peach', 'Tropicana', 1),
(150, 1, 'Men\'s Casual Corduroy Blazer Black', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2001', 1, 6499, '0000-00-00', 0, '556898', 'black', 'Tropicana', 1),
(151, 1, 'Men\'s Casual Corduroy Blazer Charcoal Black', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2002', 1, 6699, '0000-00-00', 0, '556898', 'charcoal black', 'Tropicana', 1),
(152, 1, 'Men\'s Casual Corduroy Blazer Chocolate Brown', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2003', 1, 6999, '0000-00-00', 0, '556898', 'chocolate brown', 'Tropicana', 1),
(153, 1, 'Men\'s Casual Corduroy Blazer Dark Grey', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2004', 1, 6999, '0000-00-00', 0, '556898', 'dark grey', 'Tropicana', 1),
(154, 1, 'Men\'s Casual Corduroy Blazer Grey', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2005', 1, 7399, '0000-00-00', 0, '556898', 'grey', 'Tropicana', 1),
(155, 1, 'Men\'s Casual Corduroy Blazer Ivory', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2006', 1, 6999, '0000-00-00', 0, '556898', 'ivory cream', 'Tropicana', 1),
(156, 1, 'Men\'s Casual Corduroy Blazer Lt Grey', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2007', 1, 6499, '0000-00-00', 0, '556898', 'lt grey', 'Tropicana', 1),
(157, 1, 'Men\'s Casual Corduroy Blazer Navy Blue', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2008', 1, 7399, '0000-00-00', 0, '556898', 'navy blue', 'Tropicana', 1),
(158, 1, 'Men\'s Casual Corduroy Blazer Olive Green', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2009', 1, 6999, '0000-00-00', 0, '556898', 'olive green', 'Tropicana', 1),
(159, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', 'details', 'RYS10001', 1, 7999, '0000-00-00', 0, '556898', 'Black', 'PV', 1),
(160, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10002', 1, 7999, '0000-00-00', 0, '556898', 'Deep Blue with Mini-checks', 'PV', 1),
(161, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10003', 1, 7999, '0000-00-00', 0, '556898', 'Black', 'PV', 1),
(162, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10004', 1, 7999, '0000-00-00', 0, '556898', 'Navy Blue', 'PV', 1),
(163, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10005', 1, 7999, '0000-00-00', 0, '556898', 'Chocolate Brown', 'PV', 1),
(164, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10006', 1, 7999, '0000-00-00', 0, '556898', 'Cream', 'PV', 1),
(165, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10007', 1, 7999, '0000-00-00', 0, '556898', 'Solid Blue', 'PV', 1),
(166, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10008', 1, 7999, '0000-00-00', 0, '556898', 'Deep Grey', 'PV', 1),
(167, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10009', 1, 7999, '0000-00-00', 0, '556898', 'Olive Green', 'PV', 1),
(168, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10010', 1, 7999, '0000-00-00', 0, '556898', 'Dark Grey', 'PV', 1),
(169, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10011', 1, 7999, '0000-00-00', 0, '556898', 'Glossy Deep Grey', 'PV', 1),
(170, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10012', 1, 7999, '0000-00-00', 0, '556898', 'Bluish Grey', 'PV', 1),
(171, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10013', 1, 7999, '0000-00-00', 0, '556898', 'Solid Grainy Black', 'PV', 1),
(172, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10014', 1, 7999, '0000-00-00', 0, '556898', 'Deep Black', 'PV', 1),
(173, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10015', 1, 7999, '0000-00-00', 0, '556898', 'Jet Black with Self Design', 'PV', 1),
(174, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10016', 1, 7999, '0000-00-00', 0, '556898', 'Solid Brown', 'PV', 1),
(175, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10017', 1, 7999, '0000-00-00', 0, '556898', 'Lt Brown', 'PV', 1),
(176, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10018', 1, 7999, '0000-00-00', 0, '556898', 'Bold Grey', 'PV', 1),
(177, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10019', 1, 7999, '0000-00-00', 0, '556898', 'Grey', 'PV', 1),
(178, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10020', 1, 7999, '0000-00-00', 0, '556898', 'Lt Grey', 'PV', 1),
(179, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10021', 1, 7999, '0000-00-00', 0, '556898', 'Deep Black', 'PV', 1),
(180, 1, 'Raymond Poly Viscose Mens Suit', 'Raymond', '', 'RYS10022', 1, 7999, '0000-00-00', 0, '556898', 'Navy Blue', 'PV', 1),
(184, 1, 'Raymond Terrywool Mens Suit ', 'Raymond', '', 'RYS1001', 1, 10614, '0000-00-00', 0, '556898', 'Navy Blue', 'Terrywool', 1),
(185, 1, 'Raymond Terrywool Mens Suit ', 'Raymond', '', 'RYS1002', 1, 10614, '0000-00-00', 0, '556898', 'Black', 'Terrywool', 1),
(186, 1, 'Raymond Terrywool Mens Suit ', 'Raymond', '', 'RYS1003', 1, 10614, '0000-00-00', 0, '556898', 'Grey', 'Terrywool', 1),
(187, 1, 'Raymond Terrywool Mens Suit ', 'Raymond', '', 'RYS1004', 1, 10614, '0000-00-00', 0, '556898', 'Ink Blue', 'Terrywool', 1),
(188, 1, 'Raymond Terrywool Mens Suit ', 'Raymond', '', 'RYS1005', 1, 10614, '0000-00-00', 0, '556898', 'Brown', 'Terrywool', 1),
(189, 1, 'Raymond Wool Blend Mens Suit ', 'Raymond', '', 'RYS2001', 1, 10748, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(190, 1, 'Raymond Wool Blend Mens Suit ', 'Raymond', '', 'RYS2002', 1, 10748, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(191, 1, 'Raymond Wool Blend Mens Suit ', 'Raymond', '', 'RYS2003', 1, 10748, '0000-00-00', 0, '556898', 'Dark Blue', 'Wool Blend', 1),
(192, 1, 'Raymond Wool Blend Mens Suit ', 'Raymond', '', 'RYS2004', 1, 10748, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(193, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS3001', 1, 12092, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(194, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS3002', 1, 12092, '0000-00-00', 0, '556898', 'Dark Grey', 'Wool Blend', 1),
(195, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS3003', 1, 12092, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(196, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS3004', 1, 12092, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(197, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS4001', 1, 14107, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(198, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS4002', 1, 14107, '0000-00-00', 0, '556898', 'Steel Grey', 'Wool Blend', 1),
(199, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS4003', 1, 14107, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(200, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS4004', 1, 14107, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(201, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS5001', 1, 15451, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(202, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS5002', 1, 15451, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(203, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS5003', 1, 15451, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(204, 1, 'Raymond Wool Blend Mens Suit ', 'Raymond', '', 'RYS6001', 1, 16794, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(205, 1, 'Raymond Wool Blend Mens Suit ', 'Raymond', '', 'RYS6002', 1, 16794, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(206, 1, 'Raymond Wool Blend Mens Suit ', 'Raymond', '', 'RYS6003', 1, 16794, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(207, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS7001', 1, 18138, '0000-00-00', 0, '556898', 'Light Brown', 'Wool Blend', 1),
(208, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS7002', 1, 18138, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(209, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS7003', 1, 18138, '0000-00-00', 0, '556898', 'Blue', 'Wool Blend', 1),
(210, 1, 'Raymond Wool Blend Mens Suit', 'Raymond', '', 'RYS7004', 1, 18138, '0000-00-00', 0, '556898', 'black', 'Wool Blend', 1),
(211, 1, 'Raymond Poly Viscose Mens Suit ', 'Raymond', '', 'RYS8001', 1, 8733, '0000-00-00', 0, '556898', 'Brown', 'Poly Viscose', 1),
(212, 1, 'Raymond Poly Viscose Mens Suit ', 'Raymond', '', 'RYS8002', 1, 8733, '0000-00-00', 0, '556898', 'Black', 'Poly Viscose', 1),
(213, 1, 'Raymond Poly Viscose Mens Suit ', 'Raymond', '', 'RYS8003', 1, 8733, '0000-00-00', 0, '556898', 'Charcoal Black', 'Poly Viscose', 1),
(214, 1, 'Raymond Poly Viscose Mens Suit ', 'Raymond', '', 'RYS8004', 1, 8733, '0000-00-00', 0, '556898', 'Navy Blue', 'Poly Viscose', 1),
(215, 1, 'Raymond Fine Worsted Mens Suit', 'Raymond', '', 'RYS9001', 1, 13436, '0000-00-00', 0, '556898', 'Brown', 'Fine Worsted', 1),
(216, 1, 'Raymond Fine Worsted Mens Suit', 'Raymond', '', 'RYS9002', 1, 13436, '0000-00-00', 0, '556898', 'Black', 'Fine Worsted', 1),
(217, 1, 'Raymond Fine Worsted Mens Suit', 'Raymond', '', 'RYS9003', 1, 13436, '0000-00-00', 0, '556898', 'Cream', 'Fine Worsted', 1),
(218, 1, 'Raymond Fine Worsted Mens Suit', 'Raymond', '', 'RYS9004', 1, 13436, '0000-00-00', 0, '556898', 'Blue', 'Fine Worsted', 1),
(219, 1, 'Raymond Fine Worsted Mens Suit', 'Raymond', '', 'RYS9005', 1, 13436, '0000-00-00', 0, '556898', 'Grey', 'Fine Worsted', 1),
(220, 1, 'Siyarams Poly Viscose Mens Suit ', 'Siyarams', '', 'SYS1001', 1, 7390, '0000-00-00', 0, '556898', 'Grey', 'Poly Viscose', 1),
(221, 1, 'Siyarams Poly Viscose Mens Suit ', 'Siyarams', '', 'SYS1002', 1, 7390, '0000-00-00', 0, '556898', 'Blue', 'Poly Viscose', 1),
(222, 1, 'Siyarams Poly Viscose Mens Suit ', 'Siyarams', '', 'SYS1003', 1, 7390, '0000-00-00', 0, '556898', 'Dark Grey', 'Poly Viscose', 1),
(223, 1, 'Siyarams Poly Viscose Mens Suit ', 'Siyarams', '', 'SYS1004', 1, 7390, '0000-00-00', 0, '556898', 'Black', 'Poly Viscose', 1),
(224, 1, 'Siyarams Terry wool Mens Suit ', 'Siyarams', '', 'SYS2001', 1, 8061, '0000-00-00', 0, '556898', 'Black', 'Terry wool', 1),
(225, 1, 'Siyarams Terry wool Mens Suit ', 'Siyarams', '', 'SYS2002', 1, 8061, '0000-00-00', 0, '556898', 'Grey', 'Terry wool', 1),
(226, 1, 'Siyarams Terry wool Mens Suit ', 'Siyarams', '', 'SYS2003', 1, 8061, '0000-00-00', 0, '556898', 'Blue', 'Terry wool', 1),
(227, 1, 'Siyarams TR Mens Suit', 'Siyarams', '', 'SYS3001', 1, 8733, '0000-00-00', 0, '556898', 'Grey', 'TR', 1),
(228, 1, 'Siyarams TR Mens Suit', 'Siyarams', '', 'SYS3002', 1, 8733, '0000-00-00', 0, '556898', 'Black', 'TR', 1),
(229, 1, 'Siyarams TR Mens Suit', 'Siyarams', '', 'SYS3003', 1, 8733, '0000-00-00', 0, '556898', 'Blue', 'TR', 1),
(230, 1, 'Siyarams Worsted Mens Suit', 'Siyarams', '', 'SYS4001', 1, 7054, '0000-00-00', 0, '556898', 'Black', 'Worsted', 1),
(231, 1, 'Siyarams Worsted Mens Suit', 'Siyarams', '', 'SYS4002', 1, 7054, '0000-00-00', 0, '556898', 'Blue', 'Worsted', 1),
(232, 1, 'Siyarams Worsted Mens Suit', 'Siyarams', '', 'SYS4003', 1, 7054, '0000-00-00', 0, '556898', 'Grey', 'Worsted', 1),
(234, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUSDSC_0696', 1, 8499, '0000-00-00', 0, '556898', 'dark brown', 'Worsted', 1),
(235, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUSDSC_0687', 1, 8499, '0000-00-00', 0, '556898', 'charcoal grey', 'Worsted', 1),
(236, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUSDSC_0688', 1, 8499, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(237, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUSDSC_0689', 1, 8499, '0000-00-00', 0, '556898', 'beige', 'Worsted', 1),
(238, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUSDSC_0690', 1, 8499, '0000-00-00', 0, '556898', 'steel grey', 'Worsted', 1),
(239, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0777', 1, 8499, '0000-00-00', 0, '556898', 'dark royal blue', 'Worsted', 1),
(240, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0758', 1, 8499, '0000-00-00', 0, '556898', 'light royal blue', 'Worsted', 1),
(241, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0759', 1, 8499, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(242, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0760', 1, 8499, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(243, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0761', 1, 8499, '0000-00-00', 0, '556898', 'khaki brown', 'Worsted', 1),
(244, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0762', 1, 8499, '0000-00-00', 0, '556898', 'navy blue', 'Worsted', 1),
(245, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0765', 1, 8499, '0000-00-00', 0, '556898', 'brick brown', 'Worsted', 1),
(246, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0766', 1, 8499, '0000-00-00', 0, '556898', 'brown', 'Worsted', 1),
(247, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0767', 1, 8499, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(248, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0769', 1, 8499, '0000-00-00', 0, '556898', 'khaki lt brown', 'Worsted', 1),
(249, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0770', 1, 8499, '0000-00-00', 0, '556898', 'grey', 'Worsted', 1),
(250, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0771', 1, 8499, '0000-00-00', 0, '556898', 'dark mustard ', 'Worsted', 1),
(251, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0772', 1, 8499, '0000-00-00', 0, '556898', 'light mustard', 'Worsted', 1),
(252, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUSDSC_0776', 1, 8499, '0000-00-00', 0, '556898', 'fawn', 'Worsted', 1),
(253, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUSDSC_0757', 1, 8499, '0000-00-00', 0, '556898', 'fawn', 'Worsted', 1),
(254, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUSDSC_0742', 1, 8499, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(255, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUSDSC_0744', 1, 8499, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(256, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUSDSC_0746', 1, 8499, '0000-00-00', 0, '556898', 'light royal blue', 'Worsted', 1),
(257, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUSDSC_0747', 1, 8499, '0000-00-00', 0, '556898', 'khaki brown', 'Worsted', 1),
(258, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUSDSC_0748', 1, 8499, '0000-00-00', 0, '556898', 'lt grey with black strands', 'Worsted', 1),
(259, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUSDSC_0749', 1, 8499, '0000-00-00', 0, '556898', 'lt brown with black strands', 'Worsted', 1),
(260, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUSDSC_0751', 1, 8499, '0000-00-00', 0, '556898', 'light khaki', 'Worsted', 1),
(261, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUSDSC_0752', 1, 8499, '0000-00-00', 0, '556898', 'cream', 'Worsted', 1),
(262, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUSDSC_0753', 1, 8499, '0000-00-00', 0, '556898', 'light grey', 'Worsted', 1),
(263, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUSDSC_0739', 1, 8499, '0000-00-00', 0, '556898', 'light brown', 'Worsted', 1),
(264, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUSDSC_0717', 1, 8499, '0000-00-00', 0, '556898', 'fawn', 'Worsted', 1),
(265, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUSDSC_0721', 1, 8499, '0000-00-00', 0, '556898', 'ink blue', 'Worsted', 1),
(266, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUSDSC_0723', 1, 8499, '0000-00-00', 0, '556898', 'charcoal grey', 'Worsted', 1),
(267, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUSDSC_0725', 1, 8499, '0000-00-00', 0, '556898', 'dark charcoal grey', 'Worsted', 1),
(268, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUSDSC_0727', 1, 8499, '0000-00-00', 0, '556898', 'navy blue ', 'Worsted', 1),
(269, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUSDSC_0728', 1, 8499, '0000-00-00', 0, '556898', 'dark brown', 'Worsted', 1),
(270, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUSDSC_0737', 1, 8499, '0000-00-00', 0, '556898', 'ivory', 'Worsted', 1),
(271, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUSDSC_0738', 1, 8499, '0000-00-00', 0, '556898', 'milky white', 'Worsted', 1),
(272, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUSDSC_0686', 1, 8499, '0000-00-00', 0, '556898', 'grey', 'Worsted', 1),
(273, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUSDSC_0671', 1, 8499, '0000-00-00', 0, '556898', 'khaki', 'Worsted', 1),
(274, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUSDSC_0675', 1, 8499, '0000-00-00', 0, '556898', 'dark ink blue', 'Worsted', 1),
(275, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUSDSC_0681', 1, 8499, '0000-00-00', 0, '556898', 'grey with buish checks', 'Worsted', 1),
(276, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUSDSC_0683', 1, 8499, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(277, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUSDSC_0712', 1, 8499, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(278, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUSDSC_0698', 1, 8499, '0000-00-00', 0, '556898', 'coffee brown', 'Worsted', 1),
(279, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUSDSC_0701', 1, 8499, '0000-00-00', 0, '556898', 'royal blue', 'Worsted', 1),
(280, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUSDSC_0705', 1, 8499, '0000-00-00', 0, '556898', 'dark bluish grey', 'Worsted', 1),
(281, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUSDSC_0708', 1, 8499, '0000-00-00', 0, '556898', 'brown', 'Worsted', 1),
(282, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUSDSC_0710', 1, 8499, '0000-00-00', 0, '556898', 'dark mustard ', 'Worsted', 1),
(283, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUSDSC_0639', 1, 8499, '0000-00-00', 0, '556898', 'brown', 'Worsted', 1),
(284, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUSDSC_0607', 1, 8499, '0000-00-00', 0, '556898', 'light royal blue', 'Worsted', 1),
(285, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUSDSC_0618', 1, 8499, '0000-00-00', 0, '556898', 'khaki with bluish tinge', 'Worsted', 1),
(286, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUSDSC_0621', 1, 8499, '0000-00-00', 0, '556898', 'purple with black strands', 'Worsted', 1),
(287, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUSDSC_0623', 1, 8499, '0000-00-00', 0, '556898', 'navy blue', 'Worsted', 1),
(288, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUSDSC_0624', 1, 8499, '0000-00-00', 0, '556898', 'dark royal blue', 'Worsted', 1),
(289, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUSDSC_0625', 1, 8499, '0000-00-00', 0, '556898', 'brown ', 'Worsted', 1),
(290, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUSDSC_0627', 1, 8499, '0000-00-00', 0, '556898', 'dark brown', 'Worsted', 1),
(291, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUSDSC_0630', 1, 8499, '0000-00-00', 0, '556898', 'coffee brown', 'Worsted', 1),
(292, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUSDSC_0662', 1, 8899, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(293, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUSDSC_0650', 1, 8899, '0000-00-00', 0, '556898', 'black', 'Worsted', 1),
(294, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUSDSC_0665', 1, 8899, '0000-00-00', 0, '556898', 'light brown', 'Worsted', 1),
(295, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUSDSC_0666', 1, 8899, '0000-00-00', 0, '556898', 'grey', 'Worsted', 1),
(296, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUSDSC_0667', 1, 8899, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(298, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', 'details', 'RYT10001', 1, 1999, '0000-00-00', 0, '556898', 'Black', 'PV', 1),
(299, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10002', 1, 1999, '0000-00-00', 0, '556898', 'Deep Blue with Mini-checks', 'PV', 1),
(300, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10003', 1, 1999, '0000-00-00', 0, '556898', 'Black', 'PV', 1),
(301, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10004', 1, 1999, '0000-00-00', 0, '556898', 'Navy Blue', 'PV', 1),
(302, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10005', 1, 1999, '0000-00-00', 0, '556898', 'Chocolate Brown', 'PV', 1),
(303, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10006', 1, 1999, '0000-00-00', 0, '556898', 'Cream', 'PV', 1),
(304, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10007', 1, 1999, '0000-00-00', 0, '556898', 'Solid Blue', 'PV', 1),
(305, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10008', 1, 1999, '0000-00-00', 0, '556898', 'Deep Grey', 'PV', 1),
(306, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10009', 1, 1999, '0000-00-00', 0, '556898', 'Olive Green', 'PV', 1),
(307, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10010', 1, 1999, '0000-00-00', 0, '556898', 'Dark Grey', 'PV', 1),
(308, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10011', 1, 1999, '0000-00-00', 0, '556898', 'Glossy Deep Grey', 'PV', 1),
(309, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10012', 1, 1999, '0000-00-00', 0, '556898', 'Bluish Grey', 'PV', 1),
(310, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10013', 1, 1999, '0000-00-00', 0, '556898', 'Solid Grainy Black', 'PV', 1),
(311, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10014', 1, 1999, '0000-00-00', 0, '556898', 'Deep Black', 'PV', 1),
(312, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10015', 1, 1999, '0000-00-00', 0, '556898', 'Jet Black with Self Design', 'PV', 1),
(313, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10016', 1, 1999, '0000-00-00', 0, '556898', 'Solid Brown', 'PV', 1),
(314, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10017', 1, 1999, '0000-00-00', 0, '556898', 'Lt Brown', 'PV', 1),
(315, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10018', 1, 1999, '0000-00-00', 0, '556898', 'Bold Grey', 'PV', 1),
(316, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10019', 1, 1999, '0000-00-00', 0, '556898', 'Grey', 'PV', 1),
(317, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10020', 1, 1999, '0000-00-00', 0, '556898', 'Lt Grey', 'PV', 1),
(318, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10021', 1, 1999, '0000-00-00', 0, '556898', 'Deep Black', 'PV', 1),
(319, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT10022', 1, 1999, '0000-00-00', 0, '556898', 'Navy Blue', 'PV', 1),
(321, 1, 'Raymond Terrywool Mens Trousers', 'Raymond', '', 'RYT1', 1, 0, '0000-00-00', 0, '556898', 'Navy Blue', 'Terrywool', 1),
(322, 1, 'Raymond Terrywool Mens Trousers', 'Raymond', '', 'RYT1001', 1, 3129, '0000-00-00', 0, '556898', 'Navy Blue', 'Terrywool', 1),
(323, 1, 'Raymond Terrywool Mens Trousers', 'Raymond', '', 'RYT1002', 1, 3129, '0000-00-00', 0, '556898', 'Black', 'Terrywool', 1),
(324, 1, 'Raymond Terrywool Mens Trousers', 'Raymond', '', 'RYT1003', 1, 3129, '0000-00-00', 0, '556898', 'Grey', 'Terrywool', 1),
(325, 1, 'Raymond Terrywool Mens Trousers', 'Raymond', '', 'RYT1004', 1, 3129, '0000-00-00', 0, '556898', 'Ink Blue', 'Terrywool', 1),
(326, 1, 'Raymond Terrywool Mens Trousers', 'Raymond', '', 'RYT1005', 1, 3129, '0000-00-00', 0, '556898', 'Brown', 'Terrywool', 1),
(327, 1, 'Raymond Terrywool Mens Trousers', 'Raymond', '', 'RYB1', 1, 0, '0000-00-00', 0, '556898', 'Brown', 'Terrywool', 1),
(328, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT2001', 1, 3183, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(329, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT2002', 1, 3183, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(330, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT2003', 1, 3183, '0000-00-00', 0, '556898', 'Dark Blue', 'Wool Blend', 1),
(331, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT2004', 1, 3183, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(332, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT3001', 1, 3721, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(333, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT3002', 1, 3721, '0000-00-00', 0, '556898', 'Dark Grey', 'Wool Blend', 1),
(334, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT3003', 1, 3721, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(335, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT3004', 1, 3721, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(336, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT4001', 1, 4527, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(337, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT4002', 1, 4527, '0000-00-00', 0, '556898', 'Steel Grey', 'Wool Blend', 1),
(338, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT4003', 1, 4527, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(339, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT4004', 1, 4527, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(340, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT5001', 1, 5064, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(341, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT5002', 1, 5064, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(342, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT5003', 1, 5064, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(343, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT6001', 1, 5602, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(344, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT6002', 1, 5602, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(345, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT6003', 1, 5602, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(346, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT7001', 1, 6139, '0000-00-00', 0, '556898', 'Light Brown', 'Wool Blend', 1),
(347, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT7002', 1, 6139, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(348, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT7003', 1, 6139, '0000-00-00', 0, '556898', 'Blue', 'Wool Blend', 1),
(349, 1, 'Raymond Wool Blend Mens Trousers', 'Raymond', '', 'RYT7004', 1, 6139, '0000-00-00', 0, '556898', 'black', 'Wool Blend', 1),
(350, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT8001', 1, 2377, '0000-00-00', 0, '556898', 'Brown', 'Poly Viscose', 1),
(351, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT8002', 1, 2377, '0000-00-00', 0, '556898', 'Black', 'Poly Viscose', 1),
(352, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT8003', 1, 2377, '0000-00-00', 0, '556898', 'Charcoal Black', 'Poly Viscose', 1),
(353, 1, 'Raymond Poly Viscose Mens Trousers', 'Raymond', '', 'RYT8004', 1, 2377, '0000-00-00', 0, '556898', 'Navy Blue', 'Poly Viscose', 1),
(354, 1, 'Raymond Fine Worsted Mens Trousers', 'Raymond', '', 'RYT9001', 1, 4258, '0000-00-00', 0, '556898', 'Brown', 'Fine Worsted', 1),
(355, 1, 'Raymond Fine Worsted Mens Trousers', 'Raymond', '', 'RYT9002', 1, 4258, '0000-00-00', 0, '556898', 'Black', 'Fine Worsted', 1),
(356, 1, 'Raymond Fine Worsted Mens Trousers', 'Raymond', '', 'RYT9003', 1, 4258, '0000-00-00', 0, '556898', 'Cream', 'Fine Worsted', 1),
(357, 1, 'Raymond Fine Worsted Mens Trousers', 'Raymond', '', 'RYT9004', 1, 4258, '0000-00-00', 0, '556898', 'Blue', 'Fine Worsted', 1),
(358, 1, 'Raymond Fine Worsted Mens Trousers', 'Raymond', '', 'RYT9005', 1, 4258, '0000-00-00', 0, '556898', 'Grey', 'Fine Worsted', 1),
(359, 1, 'Siyarams Poly Viscose Mens Trousers', 'Siyarams', '', 'SYT1001', 1, 1840, '0000-00-00', 0, '556898', 'Grey', 'Poly Viscose', 1);
INSERT INTO `product_fabric_master` (`fabricId`, `categoryId`, `fabricTitle`, `fabricBrand`, `fabricDetails`, `skuNo`, `ownerid`, `fabricPrice`, `releaseDate`, `isPriceVariable`, `hexColor`, `colorName`, `fabricType`, `isActive`) VALUES
(360, 1, 'Siyarams Poly Viscose Mens Trousers', 'Siyarams', '', 'SYT1002', 1, 1840, '0000-00-00', 0, '556898', 'Blue', 'Poly Viscose', 1),
(361, 1, 'Siyarams Poly Viscose Mens Trousers', 'Siyarams', '', 'SYT1003', 1, 1840, '0000-00-00', 0, '556898', 'Dark Grey', 'Poly Viscose', 1),
(362, 1, 'Siyarams Poly Viscose Mens Trousers', 'Siyarams', '', 'SYT1004', 1, 1840, '0000-00-00', 0, '556898', 'Black', 'Poly Viscose', 1),
(363, 1, 'Siyarams Terry wool Mens Trousers', 'Siyarams', '', 'SYT2001', 1, 2108, '0000-00-00', 0, '556898', 'Black', 'Terry wool', 1),
(364, 1, 'Siyarams Terry wool Mens Trousers', 'Siyarams', '', 'SYT2002', 1, 2108, '0000-00-00', 0, '556898', 'Grey', 'Terry wool', 1),
(365, 1, 'Siyarams Terry wool Mens Trousers', 'Siyarams', '', 'SYT2003', 1, 2108, '0000-00-00', 0, '556898', 'Blue', 'Terry wool', 1),
(366, 1, 'Siyarams TR Mens Trousers', 'Siyarams', '', 'SYT3001', 1, 2377, '0000-00-00', 0, '556898', 'Grey', 'TR', 1),
(367, 1, 'Siyarams TR Mens Trousers', 'Siyarams', '', 'SYT3002', 1, 2377, '0000-00-00', 0, '556898', 'Black', 'TR', 1),
(368, 1, 'Siyarams TR Mens Trousers', 'Siyarams', '', 'SYT3003', 1, 2377, '0000-00-00', 0, '556898', 'Blue', 'TR', 1),
(369, 1, 'Siyarams Worsted Mens Trousers', 'Siyarams', '', 'SYT4001', 1, 1705, '0000-00-00', 0, '556898', 'Black', 'Worsted', 1),
(370, 1, 'Siyarams Worsted Mens Trousers', 'Siyarams', '', 'SYT4002', 1, 1705, '0000-00-00', 0, '556898', 'Blue', 'Worsted', 1),
(371, 1, 'Siyarams Worsted Mens Trousers', 'Siyarams', '', 'SYT4003', 1, 1705, '0000-00-00', 0, '556898', 'Grey', 'Worsted', 1),
(372, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUTDSC_0696', 1, 2149, '0000-00-00', 0, '556898', 'dark brown', 'Worsted', 1),
(373, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUTDSC_0687', 1, 2149, '0000-00-00', 0, '556898', 'charcoal grey', 'Worsted', 1),
(374, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUTDSC_0688', 1, 2149, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(375, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUTDSC_0689', 1, 2149, '0000-00-00', 0, '556898', 'beige', 'Worsted', 1),
(376, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUTDSC_0690', 1, 2149, '0000-00-00', 0, '556898', 'steel grey', 'Worsted', 1),
(377, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0777', 1, 2014, '0000-00-00', 0, '556898', 'dark royal blue', 'Worsted', 1),
(378, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0758', 1, 2014, '0000-00-00', 0, '556898', 'light royal blue', 'Worsted', 1),
(379, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0759', 1, 2014, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(380, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0760', 1, 2014, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(381, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0761', 1, 2014, '0000-00-00', 0, '556898', 'khaki brown', 'Worsted', 1),
(382, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0762', 1, 2014, '0000-00-00', 0, '556898', 'navy blue', 'Worsted', 1),
(383, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0765', 1, 2014, '0000-00-00', 0, '556898', 'brick brown', 'Worsted', 1),
(384, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0766', 1, 2014, '0000-00-00', 0, '556898', 'brown', 'Worsted', 1),
(385, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0767', 1, 2014, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(386, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0769', 1, 2014, '0000-00-00', 0, '556898', 'khaki lt brown', 'Worsted', 1),
(387, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0770', 1, 2014, '0000-00-00', 0, '556898', 'grey', 'Worsted', 1),
(388, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0771', 1, 2014, '0000-00-00', 0, '556898', 'dark mustard ', 'Worsted', 1),
(389, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0772', 1, 2014, '0000-00-00', 0, '556898', 'light mustard', 'Worsted', 1),
(390, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUTDSC_0776', 1, 2014, '0000-00-00', 0, '556898', 'fawn', 'Worsted', 1),
(391, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUTDSC_0757', 1, 2014, '0000-00-00', 0, '556898', 'fawn', 'Worsted', 1),
(392, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUTDSC_0742', 1, 2014, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(393, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUTDSC_0744', 1, 2014, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(394, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUTDSC_0746', 1, 2014, '0000-00-00', 0, '556898', 'light royal blue', 'Worsted', 1),
(395, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUTDSC_0747', 1, 2014, '0000-00-00', 0, '556898', 'khaki brown', 'Worsted', 1),
(396, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUTDSC_0748', 1, 2014, '0000-00-00', 0, '556898', 'lt grey with black strands', 'Worsted', 1),
(397, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUTDSC_0749', 1, 2014, '0000-00-00', 0, '556898', 'lt brown with black strands', 'Worsted', 1),
(398, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUTDSC_0751', 1, 2014, '0000-00-00', 0, '556898', 'light khaki', 'Worsted', 1),
(399, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUTDSC_0752', 1, 2014, '0000-00-00', 0, '556898', 'cream', 'Worsted', 1),
(400, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUTDSC_0753', 1, 2014, '0000-00-00', 0, '556898', 'light grey', 'Worsted', 1),
(401, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUTDSC_0739', 1, 2014, '0000-00-00', 0, '556898', 'light brown', 'Worsted', 1),
(402, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUTDSC_0717', 1, 2014, '0000-00-00', 0, '556898', 'fawn', 'Worsted', 1),
(403, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUTDSC_0721', 1, 2014, '0000-00-00', 0, '556898', 'ink blue', 'Worsted', 1),
(404, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUTDSC_0723', 1, 2014, '0000-00-00', 0, '556898', 'charcoal grey', 'Worsted', 1),
(405, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUTDSC_0725', 1, 2014, '0000-00-00', 0, '556898', 'dark charcoal grey', 'Worsted', 1),
(406, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUTDSC_0727', 1, 2014, '0000-00-00', 0, '556898', 'navy blue ', 'Worsted', 1),
(407, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUTDSC_0728', 1, 2014, '0000-00-00', 0, '556898', 'dark brown', 'Worsted', 1),
(408, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUTDSC_0737', 1, 2014, '0000-00-00', 0, '556898', 'ivory', 'Worsted', 1),
(409, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUTDSC_0738', 1, 2014, '0000-00-00', 0, '556898', 'milky white', 'Worsted', 1),
(410, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUTDSC_0686', 1, 2014, '0000-00-00', 0, '556898', 'grey', 'Worsted', 1),
(411, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUTDSC_0671', 1, 2014, '0000-00-00', 0, '556898', 'khaki', 'Worsted', 1),
(412, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUTDSC_0675', 1, 2014, '0000-00-00', 0, '556898', 'dark ink blue', 'Worsted', 1),
(413, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUTDSC_0681', 1, 2014, '0000-00-00', 0, '556898', 'grey with buish checks', 'Worsted', 1),
(414, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUTDSC_0683', 1, 2014, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(415, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUTDSC_0712', 1, 2014, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(416, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUTDSC_0698', 1, 2014, '0000-00-00', 0, '556898', 'coffee brown', 'Worsted', 1),
(417, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUTDSC_0701', 1, 2014, '0000-00-00', 0, '556898', 'royal blue', 'Worsted', 1),
(418, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUTDSC_0705', 1, 2014, '0000-00-00', 0, '556898', 'dark bluish grey', 'Worsted', 1),
(419, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUTDSC_0708', 1, 2014, '0000-00-00', 0, '556898', 'brown', 'Worsted', 1),
(420, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUTDSC_0710', 1, 2014, '0000-00-00', 0, '556898', 'dark mustard ', 'Worsted', 1),
(421, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUTDSC_0639', 1, 2014, '0000-00-00', 0, '556898', 'brown', 'Worsted', 1),
(422, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUTDSC_0607', 1, 2014, '0000-00-00', 0, '556898', 'light royal blue', 'Worsted', 1),
(423, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUTDSC_0618', 1, 2014, '0000-00-00', 0, '556898', 'khaki with bluish tinge', 'Worsted', 1),
(424, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUTDSC_0621', 1, 2014, '0000-00-00', 0, '556898', 'purple with black strands', 'Worsted', 1),
(425, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUTDSC_0623', 1, 2014, '0000-00-00', 0, '556898', 'navy blue', 'Worsted', 1),
(426, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUTDSC_0624', 1, 2014, '0000-00-00', 0, '556898', 'dark royal blue', 'Worsted', 1),
(427, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUTDSC_0625', 1, 2014, '0000-00-00', 0, '556898', 'brown ', 'Worsted', 1),
(428, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUTDSC_0627', 1, 2014, '0000-00-00', 0, '556898', 'dark brown', 'Worsted', 1),
(429, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUTDSC_0630', 1, 2014, '0000-00-00', 0, '556898', 'coffee brown', 'Worsted', 1),
(430, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUTDSC_0662', 1, 2081, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(431, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUTDSC_0650', 1, 2081, '0000-00-00', 0, '556898', 'black', 'Worsted', 1),
(432, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUTDSC_0665', 1, 2081, '0000-00-00', 0, '556898', 'light brown', 'Worsted', 1),
(433, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUTDSC_0666', 1, 2081, '0000-00-00', 0, '556898', 'grey', 'Worsted', 1),
(434, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUTDSC_0667', 1, 2081, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(438, 1, 'Men\'s Cotton Trouser Camel Brown', 'Augustus Ultimo 102495', '', 'MCT1004', 1, 2199, '0000-00-00', 0, '556898', 'camel brown', 'Worsted', 0),
(439, 1, 'Men\'s Cotton Trouser Coffee Brown', 'Augustus Ultimo 102495', '', 'MCT1005', 1, 2099, '0000-00-00', 0, '556898', 'coffee brown', 'Worsted', 0),
(443, 1, 'Men\'s Cotton Trouser Peach', 'Augustus Ultimo 102495', '', 'MCT1009', 1, 2499, '0000-00-00', 0, '556898', 'Peach', 'Worsted', 0),
(444, 1, 'Men\'s Cotton Trouser Cream', 'Augustus Ultimo 102495', '', 'MCT1010', 1, 2699, '0000-00-00', 0, '556898', 'Cream', 'Worsted', 0),
(455, 1, 'Men\'s Corduroy Trouser Tan', 'Augustus Ultimo 102495', '', 'MCT2010', 1, 2599, '0000-00-00', 0, '556898', 'tan', 'Worsted', 0),
(456, 1, 'Raymond Terrywool Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB1001', 1, 7772, '0000-00-00', 0, '556898', 'Navy Blue', 'Sapphire', 1),
(457, 1, 'Raymond Terrywool Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB1002', 1, 7772, '0000-00-00', 0, '556898', 'Black', 'Sapphire', 1),
(458, 1, 'Raymond Terrywool Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB1003', 1, 7772, '0000-00-00', 0, '556898', 'Grey', 'Sapphire', 1),
(459, 1, 'Raymond Terrywool Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB1004', 1, 7772, '0000-00-00', 0, '556898', 'Ink Blue', 'Sapphire', 1),
(460, 1, 'Raymond Terrywool Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB1005', 1, 7772, '0000-00-00', 0, '556898', 'Brown', 'Sapphire', 1),
(461, 1, 'Raymond Terrywool Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYS1', 1, 0, '0000-00-00', 0, '556898', '', 'Sapphire', 1),
(462, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB2001', 1, 7855, '0000-00-00', 0, '556898', 'Navy Blue', 'Super 70\'s', 1),
(463, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB2002', 1, 7855, '0000-00-00', 0, '556898', 'Black', 'Super 70\'s', 1),
(464, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB2003', 1, 7855, '0000-00-00', 0, '556898', 'Dark Blue', 'Super 70\'s', 1),
(465, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB2004', 1, 7855, '0000-00-00', 0, '556898', 'Grey', 'Super 70\'s', 1),
(466, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB3001', 1, 8681, '0000-00-00', 0, '556898', 'Grey', 'Super 90\'s', 1),
(467, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB3002', 1, 8681, '0000-00-00', 0, '556898', 'Dark Grey', 'Super 90\'s', 1),
(468, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB3003', 1, 8681, '0000-00-00', 0, '556898', 'Black', 'Super 90\'s', 1),
(469, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB3004', 1, 8681, '0000-00-00', 0, '556898', 'Navy Blue', 'Super 90\'s', 1),
(470, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB4001', 1, 9922, '0000-00-00', 0, '556898', 'Grey', 'Super 120\'s', 1),
(471, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB4002', 1, 9922, '0000-00-00', 0, '556898', 'Steel Grey', 'Super 120\'s', 1),
(472, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB4003', 1, 9922, '0000-00-00', 0, '556898', 'Navy Blue', 'Super 120\'s', 1),
(473, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB4004', 1, 9922, '0000-00-00', 0, '556898', 'Black', 'Super 120\'s', 1),
(474, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB5001', 1, 10748, '0000-00-00', 0, '556898', 'Navy Blue', 'Super 140\'s', 1),
(475, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB5002', 1, 10748, '0000-00-00', 0, '556898', 'Black', 'Super 140\'s', 1),
(476, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB5003', 1, 10748, '0000-00-00', 0, '556898', 'Grey', 'Super 140\'s', 1),
(477, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB6001', 1, 11575, '0000-00-00', 0, '556898', 'Black', 'Super 160\'s', 1),
(478, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB6002', 1, 11575, '0000-00-00', 0, '556898', 'Navy Blue', 'Super 160\'s', 1),
(479, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB6003', 1, 11575, '0000-00-00', 0, '556898', 'Grey', 'Super 160\'s', 1),
(480, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB7001', 1, 12402, '0000-00-00', 0, '556898', 'Light Brown', 'Super 180\'s', 1),
(481, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB7002', 1, 12402, '0000-00-00', 0, '556898', 'Grey', 'Super 180\'s', 1),
(482, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB7003', 1, 12402, '0000-00-00', 0, '556898', 'Blue', 'Super 180\'s', 1),
(483, 1, 'Raymond Wool Blend Womens Blazers', 'Raymond', '65%poly 35%rayon', 'WRYB7004', 1, 12402, '0000-00-00', 0, '556898', 'black', 'Super 180\'s', 1),
(484, 1, 'Raymond Poly Viscose Womens Blazers', 'Raymond', '70%poly 30%viscose', 'WRYB8001', 1, 6614, '0000-00-00', 0, '556898', 'Brown', 'Tropicana', 1),
(485, 1, 'Raymond Poly Viscose Womens Blazers', 'Raymond', '70%poly 30%viscose', 'WRYB8002', 1, 6614, '0000-00-00', 0, '556898', 'Black', 'Tropicana', 1),
(486, 1, 'Raymond Poly Viscose Womens Blazers', 'Raymond', '70%poly 30%viscose', 'WRYB8003', 1, 6614, '0000-00-00', 0, '556898', 'Charcoal Black', 'Tropicana', 1),
(487, 1, 'Raymond Poly Viscose Womens Blazers', 'Raymond', '70%poly 30%viscose', 'WRYB8004', 1, 6614, '0000-00-00', 0, '556898', 'Navy Blue', 'Tropicana', 1),
(488, 1, 'Raymond Fine Worsted Womens Blazers', 'Raymond', '70%poly 30%viscose', 'WRYB9001', 1, 9508, '0000-00-00', 0, '556898', 'Brown', 'Tropicana', 1),
(489, 1, 'Raymond Fine Worsted Womens Blazers', 'Raymond', '70%poly 30%viscose', 'WRYB9002', 1, 9508, '0000-00-00', 0, '556898', 'Black', 'Tropicana', 1),
(490, 1, 'Raymond Fine Worsted Womens Blazers', 'Raymond', '70%poly 30%viscose', 'WRYB9003', 1, 9508, '0000-00-00', 0, '556898', 'Cream', 'Tropicana', 1),
(491, 1, 'Raymond Fine Worsted Womens Blazers', 'Raymond', '70%poly 30%viscose', 'WRYB9004', 1, 9508, '0000-00-00', 0, '556898', 'Blue', 'Tropicana', 1),
(492, 1, 'Raymond Fine Worsted Womens Blazers', 'Raymond', '70%poly 30%viscose', 'WRYB9005', 1, 9508, '0000-00-00', 0, '556898', 'Grey', 'Tropicana', 1),
(493, 1, 'Siyarams Poly Viscose Womens Blazers', 'Siyarams', '80%poly 20%viscose', 'WSYB1001', 1, 5788, '0000-00-00', 0, '556898', 'Grey', 'Tropicana', 1),
(494, 1, 'Siyarams Poly Viscose Womens Blazers', 'Siyarams', '80%poly 20%viscose', 'WSYB1002', 1, 5788, '0000-00-00', 0, '556898', 'Blue', 'Tropicana', 1),
(495, 1, 'Siyarams Poly Viscose Womens Blazers', 'Siyarams', '80%poly 20%viscose', 'WSYB1003', 1, 5788, '0000-00-00', 0, '556898', 'Dark Grey', 'Tropicana', 1),
(496, 1, 'Siyarams Poly Viscose Womens Blazers', 'Siyarams', '80%poly 20%viscose', 'WSYB1004', 1, 5788, '0000-00-00', 0, '556898', 'Black', 'Tropicana', 1),
(497, 1, 'Siyarams Terry wool Womens Blazers', 'Siyarams', '80%poly 20%viscose', 'WSYB2001', 1, 6201, '0000-00-00', 0, '556898', 'Black', 'Tropicana', 1),
(498, 1, 'Siyarams Terry wool Womens Blazers', 'Siyarams', '80%poly 20%viscose', 'WSYB2002', 1, 6201, '0000-00-00', 0, '556898', 'Grey', 'Tropicana', 1),
(499, 1, 'Siyarams Terry wool Womens Blazers', 'Siyarams', '80%poly 20%viscose', 'WSYB2003', 1, 6201, '0000-00-00', 0, '556898', 'Blue', 'Tropicana', 1),
(500, 1, 'Siyarams TR Womens Blazers', 'Siyarams', '65%poly 35%rayon', 'WSYB3001', 1, 6614, '0000-00-00', 0, '556898', 'Grey', 'Tropicana', 1),
(501, 1, 'Siyarams TR Womens Blazers', 'Siyarams', '65%poly 35%rayon', 'WSYB3002', 1, 6614, '0000-00-00', 0, '556898', 'Black', 'Tropicana', 1),
(502, 1, 'Siyarams TR Womens Blazers', 'Siyarams', '65%poly 35%rayon', 'WSYB3003', 1, 6614, '0000-00-00', 0, '556898', 'Blue', 'Tropicana', 1),
(503, 1, 'Siyarams Worsted Womens Blazers', 'Siyarams', '65%poly 35%rayon', 'WSYB4001', 1, 5581, '0000-00-00', 0, '556898', 'Black', 'Tropicana', 1),
(504, 1, 'Siyarams Worsted Womens Blazers', 'Siyarams', '65%poly 35%rayon', 'WSYB4002', 1, 5581, '0000-00-00', 0, '556898', 'Blue', 'Tropicana', 1),
(505, 1, 'Siyarams Worsted Womens Blazers', 'Siyarams', '65%poly 35%rayon', 'WSYB4003', 1, 5581, '0000-00-00', 0, '556898', 'Grey', 'Tropicana', 1),
(506, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '65%poly 35%rayon', 'WAUBDSC_0696', 1, 6263, '0000-00-00', 0, '556898', 'dark brown', 'Tropicana', 1),
(507, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '65%poly 35%rayon', 'WAUBDSC_0687', 1, 6263, '0000-00-00', 0, '556898', 'charcoal grey', 'Tropicana', 1),
(508, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '65%poly 35%rayon', 'WAUBDSC_0688', 1, 6263, '0000-00-00', 0, '556898', 'dark grey', 'Tropicana', 1),
(509, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '65%poly 35%rayon', 'WAUBDSC_0689', 1, 6263, '0000-00-00', 0, '556898', 'beige', 'Tropicana', 1),
(510, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '65%poly 35%rayon', 'WAUBDSC_0690', 1, 6263, '0000-00-00', 0, '556898', 'steel grey', 'Tropicana', 1),
(511, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0777', 1, 6056, '0000-00-00', 0, '556898', 'dark royal blue', 'Tropicana', 1),
(512, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0758', 1, 6056, '0000-00-00', 0, '556898', 'light royal blue', 'Tropicana', 1),
(513, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0759', 1, 6056, '0000-00-00', 0, '556898', 'dark grey', 'Tropicana', 1),
(514, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0760', 1, 6056, '0000-00-00', 0, '556898', 'bluish grey', 'Tropicana', 1),
(515, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0761', 1, 6056, '0000-00-00', 0, '556898', 'khaki brown', 'Tropicana', 1),
(516, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0762', 1, 6056, '0000-00-00', 0, '556898', 'navy blue', 'Tropicana', 1),
(517, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0765', 1, 6056, '0000-00-00', 0, '556898', 'brick brown', 'Tropicana', 1),
(518, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0766', 1, 6056, '0000-00-00', 0, '556898', 'brown', 'Tropicana', 1),
(519, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0767', 1, 6056, '0000-00-00', 0, '556898', 'dark grey', 'Tropicana', 1),
(520, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0769', 1, 6056, '0000-00-00', 0, '556898', 'khaki lt brown', 'Tropicana', 1),
(521, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0770', 1, 6056, '0000-00-00', 0, '556898', 'grey', 'Tropicana', 1),
(522, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0771', 1, 6056, '0000-00-00', 0, '556898', 'dark mustard ', 'Tropicana', 1),
(523, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0772', 1, 6056, '0000-00-00', 0, '556898', 'light mustard', 'Tropicana', 1),
(524, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUBDSC_0776', 1, 6056, '0000-00-00', 0, '556898', 'fawn', 'Tropicana', 1),
(525, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUBDSC_0757', 1, 6056, '0000-00-00', 0, '556898', 'fawn', 'Tropicana', 1),
(526, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUBDSC_0742', 1, 6056, '0000-00-00', 0, '556898', 'bluish grey', 'Tropicana', 1),
(527, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUBDSC_0744', 1, 6056, '0000-00-00', 0, '556898', 'dark grey', 'Tropicana', 1),
(528, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUBDSC_0746', 1, 6056, '0000-00-00', 0, '556898', 'light royal blue', 'Tropicana', 1),
(529, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUBDSC_0747', 1, 6056, '0000-00-00', 0, '556898', 'khaki brown', 'Tropicana', 1),
(530, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUBDSC_0748', 1, 6056, '0000-00-00', 0, '556898', 'lt grey with black strands', 'Tropicana', 1),
(531, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUBDSC_0749', 1, 6056, '0000-00-00', 0, '556898', 'lt brown with black strands', 'Tropicana', 1),
(532, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUBDSC_0751', 1, 6056, '0000-00-00', 0, '556898', 'light khaki', 'Tropicana', 1),
(533, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUBDSC_0752', 1, 6056, '0000-00-00', 0, '556898', 'cream', 'Tropicana', 1),
(534, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUBDSC_0753', 1, 6056, '0000-00-00', 0, '556898', 'light grey', 'Tropicana', 1),
(535, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUBDSC_0739', 1, 6056, '0000-00-00', 0, '556898', 'light brown', 'Tropicana', 1),
(536, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUBDSC_0717', 1, 6056, '0000-00-00', 0, '556898', 'fawn', 'Tropicana', 1),
(537, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUBDSC_0721', 1, 6056, '0000-00-00', 0, '556898', 'ink blue', 'Tropicana', 1),
(538, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUBDSC_0723', 1, 6056, '0000-00-00', 0, '556898', 'charcoal grey', 'Tropicana', 1),
(539, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUBDSC_0725', 1, 6056, '0000-00-00', 0, '556898', 'dark charcoal grey', 'Tropicana', 1),
(540, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUBDSC_0727', 1, 6056, '0000-00-00', 0, '556898', 'navy blue ', 'Tropicana', 1),
(541, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUBDSC_0728', 1, 6056, '0000-00-00', 0, '556898', 'dark brown', 'Tropicana', 1),
(542, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUBDSC_0737', 1, 6056, '0000-00-00', 0, '556898', 'ivory', 'Tropicana', 1),
(543, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUBDSC_0738', 1, 6056, '0000-00-00', 0, '556898', 'milky white', 'Tropicana', 1),
(544, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '65%poly 35%rayon', 'WAUBDSC_0686', 1, 6056, '0000-00-00', 0, '556898', 'grey', 'Tropicana', 1),
(545, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '65%poly 35%rayon', 'WAUBDSC_0671', 1, 6056, '0000-00-00', 0, '556898', 'khaki', 'Tropicana', 1),
(546, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '65%poly 35%rayon', 'WAUBDSC_0675', 1, 6056, '0000-00-00', 0, '556898', 'dark ink blue', 'Tropicana', 1),
(547, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '65%poly 35%rayon', 'WAUBDSC_0681', 1, 6056, '0000-00-00', 0, '556898', 'grey with buish checks', 'Tropicana', 1),
(548, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '65%poly 35%rayon', 'WAUBDSC_0683', 1, 6056, '0000-00-00', 0, '556898', 'dark grey', 'Tropicana', 1),
(549, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUBDSC_0639', 1, 6056, '0000-00-00', 0, '556898', 'brown', 'Tropicana', 1),
(550, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUBDSC_0607', 1, 6056, '0000-00-00', 0, '556898', 'light royal blue', 'Tropicana', 1),
(551, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUBDSC_0618', 1, 6056, '0000-00-00', 0, '556898', 'khaki with bluish tinge', 'Tropicana', 1),
(552, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUBDSC_0621', 1, 6056, '0000-00-00', 0, '556898', 'purple with black strands', 'Tropicana', 1),
(553, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUBDSC_0623', 1, 6056, '0000-00-00', 0, '556898', 'navy blue', 'Tropicana', 1),
(554, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUBDSC_0624', 1, 6056, '0000-00-00', 0, '556898', 'dark royal blue', 'Tropicana', 1),
(555, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUBDSC_0625', 1, 6056, '0000-00-00', 0, '556898', 'brown ', 'Tropicana', 1),
(556, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUBDSC_0627', 1, 6056, '0000-00-00', 0, '556898', 'dark brown', 'Tropicana', 1),
(557, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUBDSC_0630', 1, 6056, '0000-00-00', 0, '556898', 'coffee brown', 'Tropicana', 1),
(558, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'WAUBDSC_0662', 1, 6160, '0000-00-00', 0, '556898', 'dark grey', 'Tropicana', 1),
(559, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'WAUBDSC_0650', 1, 6160, '0000-00-00', 0, '556898', 'black', 'Tropicana', 1),
(560, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'WAUBDSC_0665', 1, 6160, '0000-00-00', 0, '556898', 'light brown', 'Tropicana', 1),
(561, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'WAUBDSC_0666', 1, 6160, '0000-00-00', 0, '556898', 'grey', 'Tropicana', 1),
(562, 1, 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'WAUBDSC_0667', 1, 6160, '0000-00-00', 0, '556898', 'bluish grey', 'Tropicana', 1),
(563, 1, 'Raymond Terrywool Women Suit ', 'Raymond', '65%poly 35%rayon', 'WRYS1001', 1, 7772, '0000-00-00', 0, '556898', 'Navy Blue', 'Terrywool', 1),
(564, 1, 'Raymond Terrywool Women Suit ', 'Raymond', '65%poly 35%rayon', 'WRYS1002', 1, 7772, '0000-00-00', 0, '556898', 'Black', 'Terrywool', 1),
(565, 1, 'Raymond Terrywool Women Suit ', 'Raymond', '65%poly 35%rayon', 'WRYS1003', 1, 7772, '0000-00-00', 0, '556898', 'Grey', 'Terrywool', 1),
(566, 1, 'Raymond Terrywool Women Suit ', 'Raymond', '65%poly 35%rayon', 'WRYS1004', 1, 7772, '0000-00-00', 0, '556898', 'Ink Blue', 'Terrywool', 1),
(567, 1, 'Raymond Terrywool Women Suit ', 'Raymond', '65%poly 35%rayon', 'WRYS1005', 1, 7772, '0000-00-00', 0, '556898', 'Brown', 'Terrywool', 1),
(568, 1, 'Raymond Wool Blend Women Suit ', 'Raymond', '65%poly 35%rayon', 'WRYS2001', 1, 0, '0000-00-00', 0, '556898', '', 'Wool Blend', 1),
(569, 1, 'Raymond Wool Blend Women Suit ', 'Raymond', '65%poly 35%rayon', 'WRYS2002', 1, 7855, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(570, 1, 'Raymond Wool Blend Women Suit ', 'Raymond', '65%poly 35%rayon', 'WRYS2003', 1, 7855, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(571, 1, 'Raymond Wool Blend Women Suit ', 'Raymond', '65%poly 35%rayon', 'WRYS2004', 1, 7855, '0000-00-00', 0, '556898', 'Dark Blue', 'Wool Blend', 1),
(572, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS3001', 1, 7855, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(573, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS3002', 1, 8681, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(574, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS3003', 1, 8681, '0000-00-00', 0, '556898', 'Dark Grey', 'Wool Blend', 1),
(575, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS3004', 1, 8681, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(576, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS4001', 1, 8681, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(577, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS4002', 1, 9922, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(578, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS4003', 1, 9922, '0000-00-00', 0, '556898', 'Steel Grey', 'Wool Blend', 1),
(579, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS4004', 1, 9922, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(580, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS5001', 1, 9922, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(581, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS5002', 1, 10748, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(582, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS5003', 1, 10748, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(583, 1, 'Raymond Wool Blend Women Suit ', 'Raymond', '65%poly 35%rayon', 'WRYS6001', 1, 10748, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(584, 1, 'Raymond Wool Blend Women Suit ', 'Raymond', '65%poly 35%rayon', 'WRYS6002', 1, 11575, '0000-00-00', 0, '556898', 'Black', 'Wool Blend', 1),
(585, 1, 'Raymond Wool Blend Women Suit ', 'Raymond', '65%poly 35%rayon', 'WRYS6003', 1, 11575, '0000-00-00', 0, '556898', 'Navy Blue', 'Wool Blend', 1),
(586, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS7001', 1, 11575, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(587, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS7002', 1, 12402, '0000-00-00', 0, '556898', 'Light Brown', 'Wool Blend', 1),
(588, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS7003', 1, 12402, '0000-00-00', 0, '556898', 'Grey', 'Wool Blend', 1),
(589, 1, 'Raymond Wool Blend Women Suit', 'Raymond', '65%poly 35%rayon', 'WRYS7004', 1, 12402, '0000-00-00', 0, '556898', 'Blue', 'Wool Blend', 1),
(590, 1, 'Raymond Poly Viscose Women Suit ', 'Raymond', '70%poly 30%viscose', 'WRYS8001', 1, 12402, '0000-00-00', 0, '556898', 'black', 'Poly Viscose', 1),
(591, 1, 'Raymond Poly Viscose Women Suit ', 'Raymond', '70%poly 30%viscose', 'WRYS8002', 1, 6614, '0000-00-00', 0, '556898', 'Brown', 'Poly Viscose', 1),
(592, 1, 'Raymond Poly Viscose Women Suit ', 'Raymond', '70%poly 30%viscose', 'WRYS8003', 1, 6614, '0000-00-00', 0, '556898', 'Black', 'Poly Viscose', 1),
(593, 1, 'Raymond Poly Viscose Women Suit ', 'Raymond', '70%poly 30%viscose', 'WRYS8004', 1, 6614, '0000-00-00', 0, '556898', 'Charcoal Black', 'Poly Viscose', 1),
(594, 1, 'Raymond Fine Worsted Women Suit', 'Raymond', '70%poly 30%viscose', 'WRYS9001', 1, 6614, '0000-00-00', 0, '556898', 'Navy Blue', 'Fine Worsted', 1),
(595, 1, 'Raymond Fine Worsted Women Suit', 'Raymond', '70%poly 30%viscose', 'WRYS9002', 1, 9508, '0000-00-00', 0, '556898', 'Brown', 'Fine Worsted', 1),
(596, 1, 'Raymond Fine Worsted Women Suit', 'Raymond', '70%poly 30%viscose', 'WRYS9003', 1, 9508, '0000-00-00', 0, '556898', 'Black', 'Fine Worsted', 1),
(597, 1, 'Raymond Fine Worsted Women Suit', 'Raymond', '70%poly 30%viscose', 'WRYS9004', 1, 9508, '0000-00-00', 0, '556898', 'Cream', 'Fine Worsted', 1),
(598, 1, 'Raymond Fine Worsted Women Suit', 'Raymond', '70%poly 30%viscose', 'WRYS9005', 1, 9508, '0000-00-00', 0, '556898', 'Blue', 'Fine Worsted', 1),
(600, 1, 'Siyarams Poly Viscose Women Suit ', 'Siyarams', '80%poly 20%viscose', 'WSYS1001', 1, 5788, '0000-00-00', 0, '556898', 'Grey', 'Poly Viscose', 1),
(601, 1, 'Siyarams Poly Viscose Women Suit ', 'Siyarams', '80%poly 20%viscose', 'WSYS1002', 1, 5788, '0000-00-00', 0, '556898', 'Blue', 'Poly Viscose', 1),
(602, 1, 'Siyarams Poly Viscose Women Suit ', 'Siyarams', '80%poly 20%viscose', 'WSYS1003', 1, 5788, '0000-00-00', 0, '556898', 'Dark Grey', 'Poly Viscose', 1),
(603, 1, 'Siyarams Poly Viscose Women Suit ', 'Siyarams', '80%poly 20%viscose', 'WSYS1004', 1, 5788, '0000-00-00', 0, '556898', 'Black', 'Poly Viscose', 1),
(604, 1, 'Siyarams Terry wool Women Suit ', 'Siyarams', '80%poly 20%viscose', 'WSYS2001', 1, 6201, '0000-00-00', 0, '556898', 'Black', 'Terry wool', 1),
(605, 1, 'Siyarams Terry wool Women Suit ', 'Siyarams', '80%poly 20%viscose', 'WSYS2002', 1, 6201, '0000-00-00', 0, '556898', 'Grey', 'Terry wool', 1),
(606, 1, 'Siyarams Terry wool Women Suit ', 'Siyarams', '80%poly 20%viscose', 'WSYS2003', 1, 6201, '0000-00-00', 0, '556898', 'Blue', 'Terry wool', 1),
(607, 1, 'Siyarams TR Women Suit', 'Siyarams', '65%poly 35%rayon', 'WSYS3001', 1, 6614, '0000-00-00', 0, '556898', 'Grey', 'TR', 1),
(608, 1, 'Siyarams TR Women Suit', 'Siyarams', '65%poly 35%rayon', 'WSYS3002', 1, 6614, '0000-00-00', 0, '556898', 'Black', 'TR', 1),
(609, 1, 'Siyarams TR Women Suit', 'Siyarams', '65%poly 35%rayon', 'WSYS3003', 1, 6614, '0000-00-00', 0, '556898', 'Blue', 'TR', 1),
(610, 1, 'Siyarams Worsted Women Suit', 'Siyarams', '65%poly 35%rayon', 'WSYS4001', 1, 5581, '0000-00-00', 0, '556898', 'Black', 'Worsted', 1),
(611, 1, 'Siyarams Worsted Women Suit', 'Siyarams', '65%poly 35%rayon', 'WSYS4002', 1, 5581, '0000-00-00', 0, '556898', 'Blue', 'Worsted', 1),
(612, 1, 'Siyarams Worsted Women Suit', 'Siyarams', '65%poly 35%rayon', 'WSYS4003', 1, 5581, '0000-00-00', 0, '556898', 'Grey', 'Worsted', 1),
(614, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '65%poly 35%rayon', 'WAUSDSC_0696', 1, 6263, '0000-00-00', 0, '556898', 'charcoal grey', 'Worsted', 1),
(615, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '65%poly 35%rayon', 'WAUSDSC_0687', 1, 6263, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(616, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '65%poly 35%rayon', 'WAUSDSC_0688', 1, 6263, '0000-00-00', 0, '556898', 'beige', 'Worsted', 1),
(617, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '65%poly 35%rayon', 'WAUSDSC_0689', 1, 6263, '0000-00-00', 0, '556898', 'steel grey', 'Worsted', 1),
(618, 1, 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '65%poly 35%rayon', 'WAUSDSC_0690', 1, 6056, '0000-00-00', 0, '556898', 'dark royal blue', 'Worsted', 1),
(619, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0777', 1, 6056, '0000-00-00', 0, '556898', 'light royal blue', 'Worsted', 1),
(620, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0758', 1, 6056, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(621, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0759', 1, 6056, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(622, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0760', 1, 6056, '0000-00-00', 0, '556898', 'khaki brown', 'Worsted', 1),
(623, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0761', 1, 6056, '0000-00-00', 0, '556898', 'navy blue', 'Worsted', 1),
(624, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0762', 1, 6056, '0000-00-00', 0, '556898', 'brick brown', 'Worsted', 1),
(625, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0765', 1, 6056, '0000-00-00', 0, '556898', 'brown', 'Worsted', 1),
(626, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0766', 1, 6056, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(627, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0767', 1, 6056, '0000-00-00', 0, '556898', 'khaki lt brown', 'Worsted', 1),
(628, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0769', 1, 6056, '0000-00-00', 0, '556898', 'grey', 'Worsted', 1),
(629, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0770', 1, 6056, '0000-00-00', 0, '556898', 'dark mustard ', 'Worsted', 1),
(630, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0771', 1, 6056, '0000-00-00', 0, '556898', 'light mustard', 'Worsted', 1),
(631, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0772', 1, 6056, '0000-00-00', 0, '556898', 'fawn', 'Worsted', 1),
(632, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '65%poly 35%rayon', 'WAUSDSC_0776', 1, 6056, '0000-00-00', 0, '556898', 'fawn', 'Worsted', 1),
(633, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUSDSC_0757', 1, 6056, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1),
(634, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUSDSC_0742', 1, 6056, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(635, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUSDSC_0744', 1, 6056, '0000-00-00', 0, '556898', 'light royal blue', 'Worsted', 1),
(636, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUSDSC_0746', 1, 6056, '0000-00-00', 0, '556898', 'khaki brown', 'Worsted', 1),
(637, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUSDSC_0747', 1, 6056, '0000-00-00', 0, '556898', 'lt grey with black strands', 'Worsted', 1),
(638, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUSDSC_0748', 1, 6056, '0000-00-00', 0, '556898', 'lt brown with black strands', 'Worsted', 1),
(639, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUSDSC_0749', 1, 6056, '0000-00-00', 0, '556898', 'light khaki', 'Worsted', 1),
(640, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUSDSC_0751', 1, 6056, '0000-00-00', 0, '556898', 'cream', 'Worsted', 1),
(641, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUSDSC_0752', 1, 6056, '0000-00-00', 0, '556898', 'light grey', 'Worsted', 1),
(642, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '65%poly 35%rayon', 'WAUSDSC_0753', 1, 6056, '0000-00-00', 0, '556898', 'light brown', 'Worsted', 1),
(643, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUSDSC_0739', 1, 6056, '0000-00-00', 0, '556898', 'fawn', 'Worsted', 1),
(644, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUSDSC_0717', 1, 6056, '0000-00-00', 0, '556898', 'ink blue', 'Worsted', 1),
(645, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUSDSC_0721', 1, 6056, '0000-00-00', 0, '556898', 'charcoal grey', 'Worsted', 1),
(646, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUSDSC_0723', 1, 6056, '0000-00-00', 0, '556898', 'dark charcoal grey', 'Worsted', 1),
(647, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUSDSC_0725', 1, 6056, '0000-00-00', 0, '556898', 'navy blue ', 'Worsted', 1),
(648, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUSDSC_0727', 1, 6056, '0000-00-00', 0, '556898', 'dark brown', 'Worsted', 1),
(649, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUSDSC_0728', 1, 6056, '0000-00-00', 0, '556898', 'ivory', 'Worsted', 1),
(650, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUSDSC_0737', 1, 6056, '0000-00-00', 0, '556898', 'milky white', 'Worsted', 1),
(651, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '65%poly 35%rayon', 'WAUSDSC_0738', 1, 6056, '0000-00-00', 0, '556898', 'grey', 'Worsted', 1),
(652, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '65%poly 35%rayon', 'WAUSDSC_0686', 1, 6056, '0000-00-00', 0, '556898', 'khaki', 'Worsted', 1),
(653, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '65%poly 35%rayon', 'WAUSDSC_0671', 1, 6056, '0000-00-00', 0, '556898', 'dark ink blue', 'Worsted', 1),
(654, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '65%poly 35%rayon', 'WAUSDSC_0675', 1, 6056, '0000-00-00', 0, '556898', 'grey with buish checks', 'Worsted', 1),
(655, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '65%poly 35%rayon', 'WAUSDSC_0681', 1, 6056, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(656, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '65%poly 35%rayon', 'WAUSDSC_0683', 1, 6056, '0000-00-00', 0, '556898', 'brown', 'Worsted', 1),
(657, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '65%poly 35%rayon', 'WAUSDSC_0712', 1, 6056, '0000-00-00', 0, '556898', 'light royal blue', 'Worsted', 1),
(658, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '65%poly 35%rayon', 'WAUSDSC_0698', 1, 6056, '0000-00-00', 0, '556898', 'khaki with bluish tinge', 'Worsted', 1),
(659, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '65%poly 35%rayon', 'WAUSDSC_0701', 1, 6056, '0000-00-00', 0, '556898', 'purple with black strands', 'Worsted', 1),
(660, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '65%poly 35%rayon', 'WAUSDSC_0705', 1, 6056, '0000-00-00', 0, '556898', 'navy blue', 'Worsted', 1),
(661, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '65%poly 35%rayon', 'WAUSDSC_0708', 1, 6056, '0000-00-00', 0, '556898', 'dark royal blue', 'Worsted', 1),
(662, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '65%poly 35%rayon', 'WAUSDSC_0710', 1, 6056, '0000-00-00', 0, '556898', 'brown ', 'Worsted', 1),
(663, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUSDSC_0639', 1, 6056, '0000-00-00', 0, '556898', 'dark brown', 'Worsted', 1),
(664, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUSDSC_0607', 1, 6056, '0000-00-00', 0, '556898', 'coffee brown', 'Worsted', 1),
(665, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUSDSC_0618', 1, 6160, '0000-00-00', 0, '556898', 'dark grey', 'Worsted', 1),
(666, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUSDSC_0621', 1, 6160, '0000-00-00', 0, '556898', 'black', 'Worsted', 1),
(667, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUSDSC_0623', 1, 6160, '0000-00-00', 0, '556898', 'light brown', 'Worsted', 1),
(668, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUSDSC_0624', 1, 6160, '0000-00-00', 0, '556898', 'grey', 'Worsted', 1),
(669, 1, 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '65%poly 35%rayon', 'WAUSDSC_0625', 1, 6160, '0000-00-00', 0, '556898', 'bluish grey', 'Worsted', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_master`
--

CREATE TABLE `product_master` (
  `productId` int(11) NOT NULL,
  `parentId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `productTitle` varchar(300) NOT NULL,
  `productSubTitle` varchar(300) NOT NULL,
  `productDetails` text NOT NULL,
  `price` float NOT NULL,
  `skuNo` varchar(100) NOT NULL,
  `releaseDate` date NOT NULL,
  `ownerId` int(11) NOT NULL,
  `sequenceNo` int(11) NOT NULL DEFAULT '1',
  `isPriceVariable` int(11) NOT NULL DEFAULT '0',
  `isActive` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_master`
--

INSERT INTO `product_master` (`productId`, `parentId`, `categoryId`, `productTitle`, `productSubTitle`, `productDetails`, `price`, `skuNo`, `releaseDate`, `ownerId`, `sequenceNo`, `isPriceVariable`, `isActive`) VALUES
(1, 1, 1, 'Blazers', '', '', 5000, '1', '2019-09-24', 27, 1, 0, 1),
(2, 2, 1, 'Casual Wear', '', '', 5000, '2', '2019-09-24', 2, 2, 0, 1),
(6, 5, 1, 'Men Suit', '', '', 5000, '5', '2019-09-24', 1, 5, 0, 1),
(7, 6, 1, 'Trousers', '', '', 4000, '6', '2019-09-24', 1, 6, 0, 1),
(8, 7, 1, 'Women Blazers', '', '', 4000, '8', '2019-09-24', 1, 8, 0, 1),
(9, 9, 1, 'Women Suit', '', '', 4000, '9', '2019-09-24', 1, 9, 1, 1),
(10, 3, 2, 'Customised Sherwani', 'Worsted', '', 8000, 'GOE002', '0000-00-00', 1, 6, 1, 1),
(11, 3, 3, 'Customised Sherwani Blue', 'Worsted', '', 8000, 'GOE003', '0000-00-00', 1, 6, 1, 1),
(12, 3, 2, 'Customised Sherwani Printed Grey', 'Worsted', '', 8000, 'GOE004', '0000-00-00', 1, 6, 1, 1),
(13, 3, 3, 'Customised Sherwani Royal blue', 'Worsted', '', 8000, 'GOE005', '0000-00-00', 1, 6, 1, 1),
(14, 3, 3, 'Customised Sherwani', 'Worsted', '', 8000, 'GOE006', '0000-00-00', 1, 6, 1, 1),
(15, 3, 3, 'Customised Sherwani', 'Worsted', '', 8000, 'GOE007', '0000-00-00', 1, 6, 1, 1),
(16, 3, 3, 'Customised Sherwani Black and Red', 'Worsted', '', 8000, 'GOE008', '0000-00-00', 1, 6, 1, 1),
(17, 3, 3, 'Customised Sherwani Black and Grey', 'Worsted', '', 8000, 'GOE009', '0000-00-00', 1, 6, 1, 1),
(18, 3, 3, 'Customised Sherwani White and Fawn', 'Worsted', '', 8000, 'GOE010', '0000-00-00', 1, 6, 1, 1),
(19, 3, 3, 'Customised Sherwani', 'Worsted', '', 8000, 'GOE011', '0000-00-00', 1, 6, 1, 1),
(20, 3, 3, 'Customised Sherwani Red', 'Worsted', '', 8000, 'GOE012', '0000-00-00', 1, 6, 1, 1),
(21, 3, 3, 'Customised Sherwani Glazze', 'Worsted', '', 8000, 'GOE013', '0000-00-00', 1, 6, 1, 1),
(22, 3, 3, 'Customised Sherwani', 'Worsted', '', 8000, 'GOE014', '0000-00-00', 1, 6, 1, 1),
(23, 3, 3, 'Customised Sherwani', 'Worsted', '', 8000, 'GOE015', '0000-00-00', 1, 6, 1, 1),
(24, 3, 3, 'Customised Sherwani White and Brown', 'Worsted', '', 8000, 'GOE016', '0000-00-00', 1, 6, 1, 1),
(25, 3, 3, 'Customised Sherwani Fawn', 'Worsted', '', 8000, 'GOE017', '0000-00-00', 1, 6, 1, 1),
(26, 3, 3, 'Customised Sherwani Sky Blue', 'Worsted', '', 8000, 'GOE018', '0000-00-00', 1, 6, 1, 1),
(27, 3, 2, 'Customised Sherwani Silver and Black', 'Worsted', '', 8000, 'GOE019', '0000-00-00', 1, 6, 1, 1),
(28, 3, 3, 'Customised Sherwani Black', 'Worsted', '', 8000, 'GOE020', '0000-00-00', 1, 6, 1, 1),
(29, 3, 2, 'Ethnic Jacket', 'Worsted', '', 8000, 'GOE021', '0000-00-00', 1, 6, 1, 1),
(30, 3, 3, 'Ethnic Jacket', 'Worsted', '', 5000, 'GOE022', '0000-00-00', 1, 6, 1, 1),
(31, 3, 4, 'Ethnic Jacket', 'Worsted', '', 5000, 'GOE023', '0000-00-00', 1, 6, 1, 1),
(32, 3, 4, 'Ethnic Jacket', 'Worsted', '', 5000, 'GOE024', '0000-00-00', 1, 6, 1, 1),
(33, 3, 4, 'Ethnic Jacket', 'Worsted', '', 5000, 'GOE025', '0000-00-00', 1, 6, 1, 1),
(34, 3, 3, 'Ethnic Jacket', 'Worsted', '', 5000, 'GOE026', '0000-00-00', 1, 6, 1, 1),
(35, 8, 2, 'Indo-Western Worsted Womens Designer wear', 'Worsted', 'Indo-Western', 1999, 'USWIW01', '0000-00-00', 1, 7, 1, 1),
(36, 8, 3, 'Indo-Western Worsted Womens Designer wear', 'Worsted', 'Indo-Western', 2499, 'USWIW01a', '0000-00-00', 1, 7, 1, 1),
(37, 8, 2, 'Indo-Western Worsted Womens Designer wear', 'Worsted', 'Indo-Western', 1999, 'USWIW02', '0000-00-00', 1, 7, 1, 1),
(38, 8, 3, 'Indo-Western Worsted Womens Designer wear', 'Worsted', 'Indo-Western', 2399, 'USWIW02a', '0000-00-00', 1, 7, 1, 1),
(39, 8, 3, 'Indo-Western Worsted Womens Designer wear', 'Worsted', 'Indo-Western', 2899, 'USWIW03', '0000-00-00', 1, 7, 1, 1),
(40, 8, 3, 'Indo-Western Worsted Womens Designer wear', 'Worsted', 'Indo-Western', 3499, 'USWIW03a', '0000-00-00', 1, 7, 1, 1),
(41, 8, 3, 'Indo-Western Worsted Womens Designer wear', 'Worsted', 'Indo-Western', 2999, 'USWIW04', '0000-00-00', 1, 7, 1, 1),
(42, 8, 3, 'Indo-Western Worsted Womens Designer wear', 'Worsted', 'Indo-Western', 3499, 'USWIW04a', '0000-00-00', 1, 7, 1, 1),
(43, 8, 3, 'Indo-Western Worsted Womens Designer wear', 'Worsted', 'Indo-Western', 2999, 'USWIW05', '0000-00-00', 1, 7, 1, 1),
(44, 8, 3, 'Indo-Western Worsted Womens Designer wear', 'Worsted', 'Indo-Western', 3499, 'USWIW06', '0000-00-00', 1, 7, 1, 1),
(45, 8, 3, 'Indo-Western Worsted Womens Designer wear', 'Worsted', 'Indo-Western', 3499, 'USWIW07', '0000-00-00', 1, 7, 1, 1),
(48, 1, 1, 'Women Designer wear', 'Blazers tiltle', 'Blazers tiltle detail', 500, '12345', '2019-10-15', 27, 50, 1, 0),
(49, 1, 1, 'Customised Sherwani', 'Blazers tiltle', 'Blazers tiltle detail', 800, '15', '2019-10-10', 27, 14245, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_parent_master`
--

CREATE TABLE `product_parent_master` (
  `parentId` int(11) NOT NULL,
  `styleId` int(11) NOT NULL,
  `subStyleId` int(11) NOT NULL,
  `isGroup` int(11) NOT NULL DEFAULT '0',
  `isActive` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_parent_master`
--

INSERT INTO `product_parent_master` (`parentId`, `styleId`, `subStyleId`, `isGroup`, `isActive`) VALUES
(1, 1, 1, 0, 1),
(2, 1, 2, 0, 1),
(3, 1, 3, 1, 1),
(4, 1, 4, 1, 1),
(5, 1, 5, 0, 1),
(6, 1, 6, 0, 1),
(7, 2, 1, 0, 1),
(8, 2, 7, 1, 1),
(9, 2, 5, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_style_master`
--

CREATE TABLE `product_style_master` (
  `styleId` int(11) NOT NULL,
  `styleTitle` varchar(100) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_style_master`
--

INSERT INTO `product_style_master` (`styleId`, `styleTitle`, `isActive`) VALUES
(1, 'MEN', 1),
(2, 'WOMEN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_substyle_master`
--

CREATE TABLE `product_substyle_master` (
  `subStyleId` int(11) NOT NULL,
  `subStyleTitle` varchar(100) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_substyle_master`
--

INSERT INTO `product_substyle_master` (`subStyleId`, `subStyleTitle`, `isActive`) VALUES
(1, 'Blazers', 1),
(2, ' Casual Wear', 1),
(3, 'Ethnic Wear', 1),
(4, 'Mens Designer wear', 1),
(5, 'Suit', 1),
(6, 'Trousers', 1),
(7, 'Designer wear', 1);

-- --------------------------------------------------------

--
-- Table structure for table `promo_code_master`
--

CREATE TABLE `promo_code_master` (
  `promoId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `request_for_alteration`
--

CREATE TABLE `request_for_alteration` (
  `requestId` int(11) NOT NULL,
  `orderItemId` int(11) NOT NULL,
  `remarks` varchar(350) NOT NULL,
  `requestDateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request_for_alteration`
--

INSERT INTO `request_for_alteration` (`requestId`, `orderItemId`, `remarks`, `requestDateTime`) VALUES
(1, 1, 'test', '2019-10-01 18:38:09'),
(2, 1, 'test', '2019-10-01 18:38:22');

-- --------------------------------------------------------

--
-- Table structure for table `stiching_master_orders`
--

CREATE TABLE `stiching_master_orders` (
  `masterOrderId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `assignDateTime` datetime NOT NULL,
  `completionDateTime` datetime NOT NULL,
  `remarks` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stitch_style_details_template_master`
--

CREATE TABLE `stitch_style_details_template_master` (
  `stitchSubStyleId` int(11) NOT NULL,
  `stitchStyleId` int(11) NOT NULL,
  `stitchSubStyleTitle` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stitch_style_details_template_master`
--

INSERT INTO `stitch_style_details_template_master` (`stitchSubStyleId`, `stitchStyleId`, `stitchSubStyleTitle`) VALUES
(1, 2, 'Back Open'),
(2, 1, 'SLIM'),
(3, 2, 'SIDE OPEN'),
(4, 1, 'REGULAR'),
(5, 2, 'NO OPEN'),
(6, 5, 'STAND'),
(7, 5, 'OUT WAY'),
(8, 1, 'MEDIUM'),
(9, 3, 'APPLE'),
(10, 8, 'DAAB'),
(11, 3, 'MANILA'),
(12, 8, 'INNER'),
(13, 3, 'SIDE OUT'),
(14, 6, 'DOWN'),
(15, 6, 'FULL DOWN'),
(16, 6, 'SQUARE'),
(17, 5, 'REGULAR'),
(18, 4, 'REGULAR'),
(19, 7, 'REGULAR'),
(20, 9, 'SINGLE'),
(21, 9, 'TWO'),
(22, 9, 'NO PLEETS'),
(23, 10, 'ONE'),
(24, 10, 'TWO'),
(25, 11, 'SIDE'),
(26, 11, 'CROSS'),
(27, 12, 'CENTER'),
(28, 12, 'SIDE'),
(29, 13, 'HIGH'),
(30, 13, 'LOW'),
(31, 14, 'LONG'),
(32, 14, 'CUT-HOOK'),
(33, 14, 'CUT-BUTTON'),
(34, 15, '1 INCH'),
(35, 15, '2 INCH'),
(36, 16, 'REGULAR'),
(37, 16, 'LONG');

-- --------------------------------------------------------

--
-- Table structure for table `stitch_style_template_master`
--

CREATE TABLE `stitch_style_template_master` (
  `stitchStyleId` int(11) NOT NULL,
  `stitchStyleTitle` varchar(200) NOT NULL,
  `stitchStyleDetails` varchar(450) NOT NULL,
  `stitchStyleType` int(11) NOT NULL DEFAULT '0',
  `isActive` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stitch_style_template_master`
--

INSERT INTO `stitch_style_template_master` (`stitchStyleId`, `stitchStyleTitle`, `stitchStyleDetails`, `stitchStyleType`, `isActive`) VALUES
(1, 'FITS', 'test', 0, 1),
(2, 'CUT', 'cut', 0, 1),
(3, 'SHIRT', 'test', 0, 1),
(4, 'LAPEL', 'lapel', 0, 1),
(5, 'COLLAR', 'collar', 0, 1),
(6, 'SHOULDER', 'test', 0, 1),
(7, 'BUTTON', 'button', 2, 1),
(8, 'FRONT PATI', 'test', 1, 1),
(9, 'PLEETS', '', 2, 1),
(10, 'HIP POCKETS', '', 2, 1),
(11, 'POCKETS', '', 2, 1),
(12, 'CREASE', '', 2, 1),
(13, 'WAIST', '', 2, 1),
(14, 'BELT', '', 2, 1),
(15, 'LOOPS', '', 2, 1),
(16, 'CHAIN FLY', '', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `supported_cities_master`
--

CREATE TABLE `supported_cities_master` (
  `cityid` int(10) NOT NULL,
  `cityName` varchar(150) NOT NULL,
  `currencyMultiplier` float NOT NULL,
  `currencyCode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supported_cities_master`
--

INSERT INTO `supported_cities_master` (`cityid`, `cityName`, `currencyMultiplier`, `currencyCode`) VALUES
(1, 'Dubai', 19.37, 'AED'),
(2, 'Mumbai', 1, 'INR'),
(3, 'Pune', 1, 'INR');

-- --------------------------------------------------------

--
-- Table structure for table `TABLE 34`
--

CREATE TABLE `TABLE 34` (
  `COL 1` varchar(3) DEFAULT NULL,
  `COL 2` varchar(1) DEFAULT NULL,
  `COL 3` varchar(44) DEFAULT NULL,
  `COL 4` varchar(25) DEFAULT NULL,
  `COL 5` varchar(16) DEFAULT NULL,
  `COL 6` varchar(12) DEFAULT NULL,
  `COL 7` varchar(5) DEFAULT NULL,
  `COL 8` varchar(10) DEFAULT NULL,
  `COL 9` varchar(1) DEFAULT NULL,
  `COL 10` varchar(6) DEFAULT NULL,
  `COL 11` varchar(27) DEFAULT NULL,
  `COL 12` varchar(12) DEFAULT NULL,
  `COL 13` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `TABLE 34`
--

INSERT INTO `TABLE 34` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`, `COL 6`, `COL 7`, `COL 8`, `COL 9`, `COL 10`, `COL 11`, `COL 12`, `COL 13`) VALUES
('1', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', 'details', 'RYB10001', '5799', '12/31/2018', '0', '556898', 'Black', 'PV', '1'),
('2', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10002', '5799', '1/1/2019', '0', '556898', 'Deep Blue with Mini-checks', 'PV', '1'),
('3', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10003', '5799', '1/2/2019', '0', '556898', 'Black', 'PV', '1'),
('4', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10004', '5799', '1/3/2019', '0', '556898', 'Navy Blue', 'PV', '1'),
('5', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10005', '5799', '1/4/2019', '0', '556898', 'Chocolate Brown', 'PV', '1'),
('6', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10006', '5799', '1/5/2019', '0', '556898', 'Cream', 'PV', '1'),
('7', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10007', '5799', '1/6/2019', '0', '556898', 'Solid Blue', 'PV', '1'),
('8', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10008', '5799', '1/7/2019', '0', '556898', 'Deep Grey', 'PV', '1'),
('9', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10009', '5799', '1/8/2019', '0', '556898', 'Olive Green', 'PV', '1'),
('10', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10010', '5799', '1/9/2019', '0', '556898', 'Dark Grey', 'PV', '1'),
('11', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10011', '5799', '1/10/2019', '0', '556898', 'Glossy Deep Grey', 'PV', '1'),
('12', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10012', '5799', '1/11/2019', '0', '556898', 'Bluish Grey', 'PV', '1'),
('13', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10013', '5799', '1/12/2019', '0', '556898', 'Solid Grainy Black', 'PV', '1'),
('14', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10014', '5799', '1/13/2019', '0', '556898', 'Deep Black', 'PV', '1'),
('15', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10015', '5799', '1/14/2019', '0', '556898', 'Jet Black with Self Design', 'PV', '1'),
('16', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10016', '5799', '1/15/2019', '0', '556898', 'Solid Brown', 'PV', '1'),
('17', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10017', '5799', '1/16/2019', '0', '556898', 'Lt Brown', 'PV', '1'),
('18', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10018', '5799', '1/17/2019', '0', '556898', 'Bold Grey', 'PV', '1'),
('19', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10019', '5799', '1/18/2019', '0', '556898', 'Grey', 'PV', '1'),
('20', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10020', '5799', '1/19/2019', '0', '556898', 'Lt Grey', 'PV', '1'),
('21', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10021', '5799', '1/20/2019', '0', '556898', 'Deep Black', 'PV', '1'),
('22', '1', 'Raymond Poly Viscose Mens Blazer', 'Raymond', '', 'RYB10022', '5799', '1/21/2019', '0', '556898', 'Navy Blue', 'PV', '1'),
('24', '1', 'Raymond Terrywool Mens Blazers', 'Raymond', '', 'RYB1001', '7772', '1/23/2019', '0', '556898', 'Navy Blue', 'Terrywool', '1'),
('25', '1', 'Raymond Terrywool Mens Blazers', 'Raymond', '', 'RYB1002', '7772', '1/24/2019', '0', '556898', 'Black', 'Terrywool', '1'),
('26', '1', 'Raymond Terrywool Mens Blazers', 'Raymond', '', 'RYB1003', '7772', '1/25/2019', '0', '556898', 'Grey', 'Terrywool', '1'),
('27', '1', 'Raymond Terrywool Mens Blazers', 'Raymond', '', 'RYB1004', '7772', '1/26/2019', '0', '556898', 'Ink Blue', 'Terrywool', '1'),
('28', '1', 'Raymond Terrywool Mens Blazers', 'Raymond', '', 'RYB1005', '7772', '1/27/2019', '0', '556898', 'Brown', 'Terrywool', '1'),
('30', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB2001', '7855', '1/29/2019', '0', '556898', 'Navy Blue', 'Wool Blend', '1'),
('31', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB2002', '7855', '1/30/2019', '0', '556898', 'Black', 'Wool Blend', '1'),
('32', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB2003', '7855', '1/31/2019', '0', '556898', 'Dark Blue', 'Wool Blend', '1'),
('33', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB2004', '7855', '2/1/2019', '0', '556898', 'Grey', 'Wool Blend', '1'),
('34', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB3001', '8681', '2/2/2019', '0', '556898', 'Grey', 'Wool Blend', '1'),
('35', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB3002', '8681', '2/3/2019', '0', '556898', 'Dark Grey', 'Wool Blend', '1'),
('36', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB3003', '8681', '2/4/2019', '0', '556898', 'Black', 'Wool Blend', '1'),
('37', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB3004', '8681', '2/5/2019', '0', '556898', 'Navy Blue', 'Wool Blend', '1'),
('38', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB4001', '9922', '2/6/2019', '0', '556898', 'Grey', 'Wool Blend', '1'),
('39', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB4002', '9922', '2/7/2019', '0', '556898', 'Steel Grey', 'Wool Blend', '1'),
('40', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB4003', '9922', '2/8/2019', '0', '556898', 'Navy Blue', 'Wool Blend', '1'),
('41', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB4004', '9922', '2/9/2019', '0', '556898', 'Black', 'Wool Blend', '1'),
('42', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB5001', '10748', '2/10/2019', '0', '556898', 'Navy Blue', 'Wool Blend', '1'),
('43', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB5002', '10748', '2/11/2019', '0', '556898', 'Black', 'Wool Blend', '1'),
('44', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB5003', '10748', '2/12/2019', '0', '556898', 'Grey', 'Wool Blend', '1'),
('45', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB6001', '11575', '2/13/2019', '0', '556898', 'Black', 'Wool Blend', '1'),
('46', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB6002', '11575', '2/14/2019', '0', '556898', 'Navy Blue', 'Wool Blend', '1'),
('47', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB6003', '11575', '2/15/2019', '0', '556898', 'Grey', 'Wool Blend', '1'),
('48', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB7001', '12402', '2/16/2019', '0', '556898', 'Light Brown', 'Wool Blend', '1'),
('49', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB7002', '12402', '2/17/2019', '0', '556898', 'Grey', 'Wool Blend', '1'),
('50', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB7003', '12402', '2/18/2019', '0', '556898', 'Blue', 'Wool Blend', '1'),
('51', '1', 'Raymond Wool Blend Mens Blazers', 'Raymond', '', 'RYB7004', '12402', '2/19/2019', '0', '556898', 'black', 'Wool Blend', '1'),
('52', '1', 'Raymond Poly Viscose Mens Blazers', 'Raymond', '', 'RYB8001', '6614', '2/20/2019', '0', '556898', 'Brown', 'Poly Viscose', '1'),
('53', '1', 'Raymond Poly Viscose Mens Blazers', 'Raymond', '', 'RYB8002', '6614', '2/21/2019', '0', '556898', 'Black', 'Poly Viscose', '1'),
('54', '1', 'Raymond Poly Viscose Mens Blazers', 'Raymond', '', 'RYB8003', '6614', '2/22/2019', '0', '556898', 'Charcoal Black', 'Poly Viscose', '1'),
('55', '1', 'Raymond Poly Viscose Mens Blazers', 'Raymond', '', 'RYB8004', '6614', '2/23/2019', '0', '556898', 'Navy Blue', 'Poly Viscose', '1'),
('56', '1', 'Raymond Fine Worsted Mens Blazers', 'Raymond', '', 'RYB9001', '9508', '2/24/2019', '0', '556898', 'Brown', 'Fine Worsted', '1'),
('57', '1', 'Raymond Fine Worsted Mens Blazers', 'Raymond', '', 'RYB9002', '9508', '2/25/2019', '0', '556898', 'Black', 'Fine Worsted', '1'),
('58', '1', 'Raymond Fine Worsted Mens Blazers', 'Raymond', '', 'RYB9003', '9508', '2/26/2019', '0', '556898', 'Cream', 'Fine Worsted', '1'),
('59', '1', 'Raymond Fine Worsted Mens Blazers', 'Raymond', '', 'RYB9004', '9508', '2/27/2019', '0', '556898', 'Blue', 'Fine Worsted', '1'),
('60', '1', 'Raymond Fine Worsted Mens Blazers', 'Raymond', '', 'RYB9005', '9508', '2/28/2019', '0', '556898', 'Grey', 'Fine Worsted', '1'),
('61', '1', 'Siyarams Poly Viscose Mens Blazers', 'Siyarams', '', 'SYB1001', '5788', '3/1/2019', '0', '556898', 'Grey', 'Poly Viscose', '1'),
('62', '1', 'Siyarams Poly Viscose Mens Blazers', 'Siyarams', '', 'SYB1002', '5788', '3/2/2019', '0', '556898', 'Blue', 'Poly Viscose', '1'),
('63', '1', 'Siyarams Poly Viscose Mens Blazers', 'Siyarams', '', 'SYB1003', '5788', '3/3/2019', '0', '556898', 'Dark Grey', 'Poly Viscose', '1'),
('64', '1', 'Siyarams Poly Viscose Mens Blazers', 'Siyarams', '', 'SYB1004', '5788', '3/4/2019', '0', '556898', 'Black', 'Poly Viscose', '1'),
('65', '1', 'Siyarams Terry wool Mens Blazers', 'Siyarams', '', 'SYB2001', '6201', '3/5/2019', '0', '556898', 'Black', 'Terry wool', '1'),
('66', '1', 'Siyarams Terry wool Mens Blazers', 'Siyarams', '', 'SYB2002', '6201', '3/6/2019', '0', '556898', 'Grey', 'Terry wool', '1'),
('67', '1', 'Siyarams Terry wool Mens Blazers', 'Siyarams', '', 'SYB2003', '6201', '3/7/2019', '0', '556898', 'Blue', 'Terry wool', '1'),
('68', '1', 'Siyarams TR Mens Blazers', 'Siyarams', '', 'SYB3001', '6614', '3/8/2019', '0', '556898', 'Grey', 'TR', '1'),
('69', '1', 'Siyarams TR Mens Blazers', 'Siyarams', '', 'SYB3002', '6614', '3/9/2019', '0', '556898', 'Black', 'TR', '1'),
('70', '1', 'Siyarams TR Mens Blazers', 'Siyarams', '', 'SYB3003', '6614', '3/10/2019', '0', '556898', 'Blue', 'TR', '1'),
('71', '1', 'Siyarams Worsted Mens Blazers', 'Siyarams', '', 'SYB4001', '5581', '3/11/2019', '0', '556898', 'Black', 'Worsted', '1'),
('72', '1', 'Siyarams Worsted Mens Blazers', 'Siyarams', '', 'SYB4002', '5581', '3/12/2019', '0', '556898', 'Blue', 'Worsted', '1'),
('73', '1', 'Siyarams Worsted Mens Blazers', 'Siyarams', '', 'SYB4003', '5581', '3/13/2019', '0', '556898', 'Grey', 'Worsted', '1'),
('74', '1', 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUBDSC_0696', '6263', '3/14/2019', '0', '556898', 'dark brown', 'Worsted', '1'),
('75', '1', 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUBDSC_0687', '6263', '3/15/2019', '0', '556898', 'charcoal grey', 'Worsted', '1'),
('76', '1', 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUBDSC_0688', '6263', '3/16/2019', '0', '556898', 'dark grey', 'Worsted', '1'),
('77', '1', 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUBDSC_0689', '6263', '3/17/2019', '0', '556898', 'beige', 'Worsted', '1'),
('78', '1', 'Augustus Imported Italian Fabric', 'Augustus Fortitude 101702', '', 'AUBDSC_0690', '6263', '3/18/2019', '0', '556898', 'steel grey', 'Worsted', '1'),
('79', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0777', '6056', '3/19/2019', '0', '556898', 'dark royal blue', 'Worsted', '1'),
('80', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0758', '6056', '3/20/2019', '0', '556898', 'light royal blue', 'Worsted', '1'),
('81', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0759', '6056', '3/21/2019', '0', '556898', 'dark grey', 'Worsted', '1'),
('82', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0760', '6056', '3/22/2019', '0', '556898', 'bluish grey', 'Worsted', '1'),
('83', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0761', '6056', '3/23/2019', '0', '556898', 'khaki brown', 'Worsted', '1'),
('84', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0762', '6056', '3/24/2019', '0', '556898', 'navy blue', 'Worsted', '1'),
('85', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0765', '6056', '3/25/2019', '0', '556898', 'brick brown', 'Worsted', '1'),
('86', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0766', '6056', '3/26/2019', '0', '556898', 'brown', 'Worsted', '1'),
('87', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0767', '6056', '3/27/2019', '0', '556898', 'dark grey', 'Worsted', '1'),
('88', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0769', '6056', '3/28/2019', '0', '556898', 'khaki lt brown', 'Worsted', '1'),
('89', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0770', '6056', '3/29/2019', '0', '556898', 'grey', 'Worsted', '1'),
('90', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0771', '6056', '3/30/2019', '0', '556898', 'dark mustard ', 'Worsted', '1'),
('91', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0772', '6056', '3/31/2019', '0', '556898', 'light mustard', 'Worsted', '1'),
('92', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101694', '', 'AUBDSC_0776', '6056', '4/1/2019', '0', '556898', 'fawn', 'Worsted', '1'),
('93', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0757', '6056', '4/2/2019', '0', '556898', 'fawn', 'Worsted', '1'),
('94', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0742', '6056', '4/3/2019', '0', '556898', 'bluish grey', 'Worsted', '1'),
('95', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0744', '6056', '4/4/2019', '0', '556898', 'dark grey', 'Worsted', '1'),
('96', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0746', '6056', '4/5/2019', '0', '556898', 'light royal blue', 'Worsted', '1'),
('97', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0747', '6056', '4/6/2019', '0', '556898', 'khaki brown', 'Worsted', '1'),
('98', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0748', '6056', '4/7/2019', '0', '556898', 'lt grey with black strands', 'Worsted', '1'),
('99', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0749', '6056', '4/8/2019', '0', '556898', 'lt brown with black strands', 'Worsted', '1'),
('100', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0751', '6056', '4/9/2019', '0', '556898', 'light khaki', 'Worsted', '1'),
('101', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0752', '6056', '4/10/2019', '0', '556898', 'cream', 'Worsted', '1'),
('102', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 101695', '', 'AUBDSC_0753', '6056', '4/11/2019', '0', '556898', 'light grey', 'Worsted', '1'),
('103', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0739', '6056', '4/12/2019', '0', '556898', 'light brown', 'Worsted', '1'),
('104', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0717', '6056', '4/13/2019', '0', '556898', 'fawn', 'Worsted', '1'),
('105', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0721', '6056', '4/14/2019', '0', '556898', 'ink blue', 'Worsted', '1'),
('106', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0723', '6056', '4/15/2019', '0', '556898', 'charcoal grey', 'Worsted', '1'),
('107', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0725', '6056', '4/16/2019', '0', '556898', 'dark charcoal grey', 'Worsted', '1'),
('108', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0727', '6056', '4/17/2019', '0', '556898', 'navy blue ', 'Worsted', '1'),
('109', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0728', '6056', '4/18/2019', '0', '556898', 'dark brown', 'Worsted', '1'),
('110', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0737', '6056', '4/19/2019', '0', '556898', 'ivory', 'Worsted', '1'),
('111', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102067', '', 'AUBDSC_0738', '6056', '4/20/2019', '0', '556898', 'milky white', 'Worsted', '1'),
('112', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUBDSC_0686', '6056', '4/21/2019', '0', '556898', 'grey', 'Worsted', '1'),
('113', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUBDSC_0671', '6056', '4/22/2019', '0', '556898', 'khaki', 'Worsted', '1'),
('114', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUBDSC_0675', '6056', '4/23/2019', '0', '556898', 'dark ink blue', 'Worsted', '1'),
('115', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUBDSC_0681', '6056', '4/24/2019', '0', '556898', 'grey with buish checks', 'Worsted', '1'),
('116', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102437', '', 'AUBDSC_0683', '6056', '4/25/2019', '0', '556898', 'dark grey', 'Worsted', '1'),
('117', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUBDSC_0712', '6056', '4/26/2019', '0', '556898', 'bluish grey', 'Worsted', '1'),
('118', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUBDSC_0698', '6056', '4/27/2019', '0', '556898', 'coffee brown', 'Worsted', '1'),
('119', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUBDSC_0701', '6056', '4/28/2019', '0', '556898', 'royal blue', 'Worsted', '1'),
('120', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUBDSC_0705', '6056', '4/29/2019', '0', '556898', 'dark bluish grey', 'Worsted', '1'),
('121', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUBDSC_0708', '6056', '4/30/2019', '0', '556898', 'brown', 'Worsted', '1'),
('122', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'AUBDSC_0710', '6056', '5/1/2019', '0', '556898', 'dark mustard ', 'Worsted', '1'),
('123', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0639', '6056', '5/2/2019', '0', '556898', 'brown', 'Worsted', '1'),
('124', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0607', '6056', '5/3/2019', '0', '556898', 'light royal blue', 'Worsted', '1'),
('125', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0618', '6056', '5/4/2019', '0', '556898', 'khaki with bluish tinge', 'Worsted', '1'),
('126', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0621', '6056', '5/5/2019', '0', '556898', 'purple with black strands', 'Worsted', '1'),
('127', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0623', '6056', '5/6/2019', '0', '556898', 'navy blue', 'Worsted', '1'),
('128', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0624', '6056', '5/7/2019', '0', '556898', 'dark royal blue', 'Worsted', '1'),
('129', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0625', '6056', '5/8/2019', '0', '556898', 'brown ', 'Worsted', '1'),
('130', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0627', '6056', '5/9/2019', '0', '556898', 'dark brown', 'Worsted', '1'),
('131', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102571', '', 'AUBDSC_0630', '6056', '5/10/2019', '0', '556898', 'coffee brown', 'Worsted', '1'),
('132', '1', 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUBDSC_0662', '6499', '5/11/2019', '0', '556898', 'dark grey', 'Worsted', '1'),
('133', '1', 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUBDSC_0650', '6499', '5/12/2019', '0', '556898', 'black', 'Worsted', '1'),
('134', '1', 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUBDSC_0665', '6499', '5/13/2019', '0', '556898', 'light brown', 'Worsted', '1'),
('135', '1', 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUBDSC_0666', '6499', '5/14/2019', '0', '556898', 'grey', 'Worsted', '1'),
('136', '1', 'Augustus Imported Italian Fabric', 'Augustus Ultimo 102495', '', 'AUBDSC_0667', '6499', '5/15/2019', '0', '556898', 'bluish grey', 'Worsted', '1'),
('137', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'WAUBDSC_0712', '6056', '5/16/2019', '0', '556898', 'bluish grey', 'Worsted', '1'),
('138', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'WAUBDSC_0698', '6056', '5/17/2019', '0', '556898', 'coffee brown', 'Worsted', '1'),
('139', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'WAUBDSC_0701', '6056', '5/18/2019', '0', '556898', 'royal blue', 'Worsted', '1'),
('140', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'WAUBDSC_0705', '6056', '5/19/2019', '0', '556898', 'dark bluish grey', 'Worsted', '1'),
('141', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'WAUBDSC_0708', '6056', '5/20/2019', '0', '556898', 'brown', 'Worsted', '1'),
('142', '1', 'Augustus Imported Italian Fabric', 'Augustus Triumph 102449', '', 'WAUBDSC_0710', '6056', '5/21/2019', '0', '556898', 'dark mustard ', 'Worsted', '1'),
('143', '1', 'Men\'s Casual Blazer Black', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT1001', '5999', '5/22/2019', '0', '556898', 'black', 'Tropicana', '1'),
('144', '1', 'Men\'s Casual Blazer Blue', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT1002', '5999', '5/23/2019', '0', '556898', 'blue', 'Tropicana', '1'),
('145', '1', 'Men\'s Casual Blazer Brown', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT1003', '6799', '5/24/2019', '0', '556898', 'dark brown', 'Tropicana', '1'),
('146', '1', 'Men\'s Casual Blazer Fawn', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT1006', '6799', '5/25/2019', '0', '556898', 'fawn', 'Tropicana', '1'),
('147', '1', 'Men\'s Casual Blazer Grey', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT1007', '6499', '5/26/2019', '0', '556898', 'grey', 'Tropicana', '1'),
('148', '1', 'Men\'s Casual Blazer Lt Grey', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT1008', '7499', '5/27/2019', '0', '556898', 'Lt grey', 'Tropicana', '1'),
('149', '1', 'Men\'s Casual Blazer Peach', 'Augustus Ultimo 102495', '65%poly 35%rayon', '', '6499', '5/29/2019', '0', '556898', 'Peach', 'Tropicana', '1'),
('150', '1', 'Men\'s Casual Corduroy Blazer Black', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2001', '6499', '5/30/2019', '0', '556898', 'black', 'Tropicana', '1'),
('151', '1', 'Men\'s Casual Corduroy Blazer Charcoal Black', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2002', '6699', '5/31/2019', '0', '556898', 'charcoal black', 'Tropicana', '1'),
('152', '1', 'Men\'s Casual Corduroy Blazer Chocolate Brown', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2003', '6999', '6/1/2019', '0', '556898', 'chocolate brown', 'Tropicana', '1'),
('153', '1', 'Men\'s Casual Corduroy Blazer Dark Grey', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2004', '6999', '6/2/2019', '0', '556898', 'dark grey', 'Tropicana', '1'),
('154', '1', 'Men\'s Casual Corduroy Blazer Grey', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2005', '7399', '6/3/2019', '0', '556898', 'grey', 'Tropicana', '1'),
('155', '1', 'Men\'s Casual Corduroy Blazer Ivory', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2006', '6999', '6/4/2019', '0', '556898', 'ivory cream', 'Tropicana', '1'),
('156', '1', 'Men\'s Casual Corduroy Blazer Lt Grey', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2007', '6499', '6/5/2019', '0', '556898', 'lt grey', 'Tropicana', '1'),
('157', '1', 'Men\'s Casual Corduroy Blazer Navy Blue', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2008', '7399', '6/6/2019', '0', '556898', 'navy blue', 'Tropicana', '1'),
('158', '1', 'Men\'s Casual Corduroy Blazer Olive Green', 'Augustus Ultimo 102495', '65%poly 35%rayon', 'MCT2009', '6999', '6/7/2019', '0', '556898', 'olive green', 'Tropicana', '1'),
('', '', '', '', '', '', '', '', '', '', '', '', ''),
('', '', '', '', '', '', '', '', '', '', '', '', ''),
('', '', '', '', '', '', '', '', '', '', '', '', ''),
('', '', '', '', '', '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `TABLE 36`
--

CREATE TABLE `TABLE 36` (
  `COL 1` int(1) DEFAULT NULL,
  `COL 2` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `TABLE 36`
--

INSERT INTO `TABLE 36` (`COL 1`, `COL 2`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 24),
(1, 25),
(1, 26),
(1, 27),
(1, 28),
(1, 30),
(1, 31),
(1, 32),
(1, 33),
(1, 34),
(1, 35),
(1, 36),
(1, 37),
(1, 38),
(1, 39),
(1, 40),
(1, 41),
(1, 42),
(1, 43),
(1, 44),
(1, 45),
(1, 46),
(1, 47),
(1, 48),
(1, 49),
(1, 50),
(1, 51),
(1, 52),
(1, 53),
(1, 54),
(1, 55),
(1, 56),
(1, 57),
(1, 58),
(1, 59),
(1, 60),
(1, 61),
(1, 62),
(1, 63),
(1, 64),
(1, 65),
(1, 66),
(1, 67),
(1, 68),
(1, 69),
(1, 70),
(1, 71),
(1, 72),
(1, 73),
(1, 74),
(1, 75),
(1, 76),
(1, 77),
(1, 78),
(1, 79),
(1, 80),
(1, 81),
(1, 82),
(1, 83),
(1, 84),
(1, 85),
(1, 86),
(1, 87),
(1, 88),
(1, 89),
(1, 90),
(1, 91),
(1, 92),
(1, 93),
(1, 94),
(1, 95),
(1, 96),
(1, 97),
(1, 98),
(1, 99),
(1, 100),
(1, 101),
(1, 102),
(1, 103),
(1, 104),
(1, 105),
(1, 106),
(1, 107),
(1, 108),
(1, 109),
(1, 110),
(1, 111),
(1, 112),
(1, 113),
(1, 114),
(1, 115),
(1, 116),
(1, 117),
(1, 118),
(1, 119),
(1, 120),
(1, 121),
(1, 122),
(1, 123),
(1, 124),
(1, 125),
(1, 126),
(1, 127),
(1, 128),
(1, 129),
(1, 130),
(1, 131),
(1, 132),
(1, 133),
(1, 134),
(1, 135),
(1, 136),
(1, 137),
(1, 138),
(1, 139),
(1, 140),
(1, 141),
(1, 142),
(1, 143),
(1, 144),
(1, 145),
(1, 146),
(1, 147),
(1, 148),
(1, 149),
(1, 150),
(1, 151),
(1, 152),
(1, 153),
(1, 154),
(1, 155),
(1, 156),
(1, 157),
(1, 158),
(5, 159),
(5, 160),
(5, 161),
(5, 162),
(5, 163),
(5, 164),
(5, 165),
(5, 166),
(5, 167),
(5, 168),
(5, 169),
(5, 170),
(5, 171),
(5, 172),
(5, 173),
(5, 174),
(5, 175),
(5, 176),
(5, 177),
(5, 178),
(5, 179),
(5, 180),
(5, 184),
(5, 185),
(5, 186),
(5, 187),
(5, 188),
(5, 189),
(5, 190),
(5, 191),
(5, 192),
(5, 193),
(5, 194),
(5, 195),
(5, 196),
(5, 197),
(5, 198),
(5, 199),
(5, 200),
(5, 201),
(5, 202),
(5, 203),
(5, 204),
(5, 205),
(5, 206),
(5, 207),
(5, 208),
(5, 209),
(5, 210),
(5, 211),
(5, 212),
(5, 213),
(5, 214),
(5, 215),
(5, 216),
(5, 217),
(5, 218),
(5, 219),
(5, 220),
(5, 221),
(5, 222),
(5, 223),
(5, 224),
(5, 225),
(5, 226),
(5, 227),
(5, 228),
(5, 229),
(5, 230),
(5, 231),
(5, 232),
(5, 234),
(5, 235),
(5, 236),
(5, 237),
(5, 238),
(5, 239),
(5, 240),
(5, 241),
(5, 242),
(5, 243),
(5, 244),
(5, 245),
(5, 246),
(5, 247),
(5, 248),
(5, 249),
(5, 250),
(5, 251),
(5, 252),
(5, 253),
(5, 254),
(5, 255),
(5, 256),
(5, 257),
(5, 258),
(5, 259),
(5, 260),
(5, 261),
(5, 262),
(5, 263),
(5, 264),
(5, 265),
(5, 266),
(5, 267),
(5, 268),
(5, 269),
(5, 270),
(5, 271),
(5, 272),
(5, 273),
(5, 274),
(5, 275),
(5, 276),
(5, 277),
(5, 278),
(5, 279),
(5, 280),
(5, 281),
(5, 282),
(5, 283),
(5, 284),
(5, 285),
(5, 286),
(5, 287),
(5, 288),
(5, 289),
(5, 290),
(5, 291),
(5, 292),
(5, 293),
(5, 294),
(5, 295),
(5, 296),
(6, 298),
(6, 299),
(6, 300),
(6, 301),
(6, 302),
(6, 303),
(6, 304),
(6, 305),
(6, 306),
(6, 307),
(6, 308),
(6, 309),
(6, 310),
(6, 311),
(6, 312),
(6, 313),
(6, 314),
(6, 315),
(6, 316),
(6, 317),
(6, 318),
(6, 319),
(6, 321),
(6, 322),
(6, 323),
(6, 324),
(6, 325),
(6, 326),
(6, 327),
(6, 328),
(6, 329),
(6, 330),
(6, 331),
(6, 332),
(6, 333),
(6, 334),
(6, 335),
(6, 336),
(6, 337),
(6, 338),
(6, 339),
(6, 340),
(6, 341),
(6, 342),
(6, 343),
(6, 344),
(6, 345),
(6, 346),
(6, 347),
(6, 348),
(6, 349),
(6, 350),
(6, 351),
(6, 352),
(6, 353),
(6, 354),
(6, 355),
(6, 356),
(6, 357),
(6, 358),
(6, 359),
(6, 360),
(6, 361),
(6, 362),
(6, 363),
(6, 364),
(6, 365),
(6, 366),
(6, 367),
(6, 368),
(6, 369),
(6, 370),
(6, 371),
(6, 372),
(6, 373),
(6, 374),
(6, 375),
(6, 376),
(6, 377),
(6, 378),
(6, 379),
(6, 380),
(6, 381),
(6, 382),
(6, 383),
(6, 384),
(6, 385),
(6, 386),
(6, 387),
(6, 388),
(6, 389),
(6, 390),
(6, 391),
(6, 392),
(6, 393),
(6, 394),
(6, 395),
(6, 396),
(6, 397),
(6, 398),
(6, 399),
(6, 400),
(6, 401),
(6, 402),
(6, 403),
(6, 404),
(6, 405),
(6, 406),
(6, 407),
(6, 408),
(6, 409),
(6, 410),
(6, 411),
(6, 412),
(6, 413),
(6, 414),
(6, 415),
(6, 416),
(6, 417),
(6, 418),
(6, 419),
(6, 420),
(6, 421),
(6, 422),
(6, 423),
(6, 424),
(6, 425),
(6, 426),
(6, 427),
(6, 428),
(6, 429),
(6, 430),
(6, 431),
(6, 432),
(6, 433),
(6, 434),
(6, 438),
(6, 439),
(6, 443),
(6, 444),
(6, 455),
(8, 456),
(8, 457),
(8, 458),
(8, 459),
(8, 460),
(8, 461),
(8, 462),
(8, 463),
(8, 464),
(8, 465),
(8, 466),
(8, 467),
(8, 468),
(8, 469),
(8, 470),
(8, 471),
(8, 472),
(8, 473),
(8, 474),
(8, 475),
(8, 476),
(8, 477),
(8, 478),
(8, 479),
(8, 480),
(8, 481),
(8, 482),
(8, 483),
(8, 484),
(8, 485),
(8, 486),
(8, 487),
(8, 488),
(8, 489),
(8, 490),
(8, 491),
(8, 492),
(8, 493),
(8, 494),
(8, 495),
(8, 496),
(8, 497),
(8, 498),
(8, 499),
(8, 500),
(8, 501),
(8, 502),
(8, 503),
(8, 504),
(8, 505),
(8, 506),
(8, 507),
(8, 508),
(8, 509),
(8, 510),
(8, 511),
(8, 512),
(8, 513),
(8, 514),
(8, 515),
(8, 516),
(8, 517),
(8, 518),
(8, 519),
(8, 520),
(8, 521),
(8, 522),
(8, 523),
(8, 524),
(8, 525),
(8, 526),
(8, 527),
(8, 528),
(8, 529),
(8, 530),
(8, 531),
(8, 532),
(8, 533),
(8, 534),
(8, 535),
(8, 536),
(8, 537),
(8, 538),
(8, 539),
(8, 540),
(8, 541),
(8, 542),
(8, 543),
(8, 544),
(8, 545),
(8, 546),
(8, 547),
(8, 548),
(8, 549),
(8, 550),
(8, 551),
(8, 552),
(8, 553),
(8, 554),
(8, 555),
(8, 556),
(8, 557),
(8, 558),
(8, 559),
(8, 560),
(8, 561),
(8, 562),
(9, 563),
(9, 564),
(9, 565),
(9, 566),
(9, 567),
(9, 568),
(9, 569),
(9, 570),
(9, 571),
(9, 572),
(9, 573),
(9, 574),
(9, 575),
(9, 576),
(9, 577),
(9, 578),
(9, 579),
(9, 580),
(9, 581),
(9, 582),
(9, 583),
(9, 584),
(9, 585),
(9, 586),
(9, 587),
(9, 588),
(9, 589),
(9, 590),
(9, 591),
(9, 592),
(9, 593),
(9, 594),
(9, 595),
(9, 596),
(9, 597),
(9, 598),
(9, 600),
(9, 601),
(9, 602),
(9, 603),
(9, 604),
(9, 605),
(9, 606),
(9, 607),
(9, 608),
(9, 609),
(9, 610),
(9, 611),
(9, 612),
(9, 614),
(9, 615),
(9, 616),
(9, 617),
(9, 618),
(9, 619),
(9, 620),
(9, 621),
(9, 622),
(9, 623),
(9, 624),
(9, 625),
(9, 626),
(9, 627),
(9, 628),
(9, 629),
(9, 630),
(9, 631),
(9, 632),
(9, 633),
(9, 634),
(9, 635),
(9, 636),
(9, 637),
(9, 638),
(9, 639),
(9, 640),
(9, 641),
(9, 642),
(9, 643),
(9, 644),
(9, 645),
(9, 646),
(9, 647),
(9, 648),
(9, 649),
(9, 650),
(9, 651),
(9, 652),
(9, 653),
(9, 654),
(9, 655),
(9, 656),
(9, 657),
(9, 658),
(9, 659),
(9, 660),
(9, 661),
(9, 662),
(9, 663),
(9, 664),
(9, 665),
(9, 666),
(9, 667),
(9, 668),
(9, 669);

-- --------------------------------------------------------

--
-- Table structure for table `testimonial_master`
--

CREATE TABLE `testimonial_master` (
  `testimonialId` int(11) NOT NULL,
  `title` varchar(350) NOT NULL,
  `details` varchar(350) NOT NULL,
  `wordsBy` varchar(150) NOT NULL,
  `isActive` int(11) NOT NULL,
  `photo` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `testimonial_master`
--

INSERT INTO `testimonial_master` (`testimonialId`, `title`, `details`, `wordsBy`, `isActive`, `photo`) VALUES
(1, 'I work in Dubai and was on a short trip to Pune to meet family. It was a great, royal experience to have the tailor visit your home in your busy day ', '', '- Mr. Mohit Bhishikar (Director, Praxello Solutions Pvt. Ltd.)', 1, 'https://www.theecca.com/images/5d18cadf14030-mohit.jpg'),
(2, 'I got custom made “Semi-formal jacket” made from Tailorsmart & I totally loved it', '', '-Ms. Sunetra Bhale', 1, 'https://www.theecca.com/images/5d18ca6dba817-akash.jpg'),
(3, 'That is what I call Tailorsmart. Since as I am busy working so getting the wardrobe ready for functions is a challenge.', '', '-Mr. Kamlesh Badkar', 1, 'https://www.theecca.com/images/5d18c9f61fb94-anurag.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(25) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`roleId`, `roleName`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', '2019-09-20 07:12:52', '2019-09-20 07:13:04'),
(2, 'Master', '2019-09-20 07:13:29', '2019-09-20 07:13:29'),
(3, 'Sales', '2019-09-20 07:13:52', '2019-09-20 07:13:52'),
(4, 'Vendor', '2019-09-20 07:14:08', '2019-09-20 07:14:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advertisement_master`
--
ALTER TABLE `advertisement_master`
  ADD PRIMARY KEY (`adId`);

--
-- Indexes for table `appointment_slots`
--
ALTER TABLE `appointment_slots`
  ADD PRIMARY KEY (`slotId`);

--
-- Indexes for table `customer_appointment_master`
--
ALTER TABLE `customer_appointment_master`
  ADD PRIMARY KEY (`appointmentId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `servingEmployeeId` (`servingEmployeeId`),
  ADD KEY `slotId` (`slotId`);

--
-- Indexes for table `customer_gcm_apns_master`
--
ALTER TABLE `customer_gcm_apns_master`
  ADD PRIMARY KEY (`customerId`,`deviceId`);

--
-- Indexes for table `customer_master`
--
ALTER TABLE `customer_master`
  ADD PRIMARY KEY (`customerId`,`email`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `customer_order_items_master`
--
ALTER TABLE `customer_order_items_master`
  ADD PRIMARY KEY (`orderItemId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `employeeid` (`employeeid`);

--
-- Indexes for table `customer_order_items_measurement`
--
ALTER TABLE `customer_order_items_measurement`
  ADD KEY `measurementId` (`measurementId`),
  ADD KEY `orderItemid` (`orderItemid`);

--
-- Indexes for table `customer_order_item_fabric_master`
--
ALTER TABLE `customer_order_item_fabric_master`
  ADD KEY `orderItemid` (`orderItemid`),
  ADD KEY `fabricId` (`fabricId`);

--
-- Indexes for table `customer_order_item_style_master`
--
ALTER TABLE `customer_order_item_style_master`
  ADD KEY `orderItemId` (`orderItemId`),
  ADD KEY `stitchStyleId` (`stitchStyleId`),
  ADD KEY `stitchSubStyleId` (`stitchSubStyleId`);

--
-- Indexes for table `customer_order_master`
--
ALTER TABLE `customer_order_master`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `employeeId` (`employeeId`);

--
-- Indexes for table `customer_order_payments`
--
ALTER TABLE `customer_order_payments`
  ADD PRIMARY KEY (`paymentId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `deletedBy` (`deletedBy`),
  ADD KEY `createdBy` (`createdBy`);

--
-- Indexes for table `customer_referral_order_master`
--
ALTER TABLE `customer_referral_order_master`
  ADD KEY `customerId` (`customerId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `customer_wishlist_master`
--
ALTER TABLE `customer_wishlist_master`
  ADD PRIMARY KEY (`wishId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `employee_master`
--
ALTER TABLE `employee_master`
  ADD PRIMARY KEY (`employeeId`),
  ADD UNIQUE KEY `mobile` (`mobile`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `holiday_master`
--
ALTER TABLE `holiday_master`
  ADD PRIMARY KEY (`holidayId`);

--
-- Indexes for table `measurement_item_master`
--
ALTER TABLE `measurement_item_master`
  ADD PRIMARY KEY (`measurementId`),
  ADD UNIQUE KEY `itemTitle` (`itemTitle`);

--
-- Indexes for table `order_feedback_master`
--
ALTER TABLE `order_feedback_master`
  ADD PRIMARY KEY (`feedbackId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `product_catalog_measurement_master`
--
ALTER TABLE `product_catalog_measurement_master`
  ADD KEY `measurementId` (`measurementId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product_catalog_style_master`
--
ALTER TABLE `product_catalog_style_master`
  ADD KEY `productId` (`productId`),
  ADD KEY `stitchStyleId` (`stitchStyleId`);

--
-- Indexes for table `product_category_master`
--
ALTER TABLE `product_category_master`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `product_fabric_mapping_master`
--
ALTER TABLE `product_fabric_mapping_master`
  ADD PRIMARY KEY (`productId`,`fabricId`),
  ADD UNIQUE KEY `productId` (`productId`,`fabricId`),
  ADD KEY `fabricId` (`fabricId`);

--
-- Indexes for table `product_fabric_master`
--
ALTER TABLE `product_fabric_master`
  ADD PRIMARY KEY (`fabricId`),
  ADD UNIQUE KEY `skuNo` (`skuNo`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `ownerid` (`ownerid`);

--
-- Indexes for table `product_master`
--
ALTER TABLE `product_master`
  ADD PRIMARY KEY (`productId`) USING BTREE,
  ADD UNIQUE KEY `skuNo` (`skuNo`),
  ADD KEY `parentId` (`parentId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `ownerId` (`ownerId`);

--
-- Indexes for table `product_parent_master`
--
ALTER TABLE `product_parent_master`
  ADD PRIMARY KEY (`parentId`),
  ADD UNIQUE KEY `styleId` (`styleId`,`subStyleId`),
  ADD KEY `subStyleId` (`subStyleId`);

--
-- Indexes for table `product_style_master`
--
ALTER TABLE `product_style_master`
  ADD PRIMARY KEY (`styleId`);

--
-- Indexes for table `product_substyle_master`
--
ALTER TABLE `product_substyle_master`
  ADD PRIMARY KEY (`subStyleId`);

--
-- Indexes for table `promo_code_master`
--
ALTER TABLE `promo_code_master`
  ADD PRIMARY KEY (`promoId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `request_for_alteration`
--
ALTER TABLE `request_for_alteration`
  ADD PRIMARY KEY (`requestId`);

--
-- Indexes for table `stiching_master_orders`
--
ALTER TABLE `stiching_master_orders`
  ADD PRIMARY KEY (`masterOrderId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `stitch_style_details_template_master`
--
ALTER TABLE `stitch_style_details_template_master`
  ADD PRIMARY KEY (`stitchSubStyleId`),
  ADD KEY `stitchStyleId` (`stitchStyleId`);

--
-- Indexes for table `stitch_style_template_master`
--
ALTER TABLE `stitch_style_template_master`
  ADD PRIMARY KEY (`stitchStyleId`),
  ADD UNIQUE KEY `stitchStyleTitle` (`stitchStyleTitle`);

--
-- Indexes for table `supported_cities_master`
--
ALTER TABLE `supported_cities_master`
  ADD PRIMARY KEY (`cityid`);

--
-- Indexes for table `testimonial_master`
--
ALTER TABLE `testimonial_master`
  ADD PRIMARY KEY (`testimonialId`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advertisement_master`
--
ALTER TABLE `advertisement_master`
  MODIFY `adId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointment_slots`
--
ALTER TABLE `appointment_slots`
  MODIFY `slotId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer_appointment_master`
--
ALTER TABLE `customer_appointment_master`
  MODIFY `appointmentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_master`
--
ALTER TABLE `customer_master`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `customer_order_items_master`
--
ALTER TABLE `customer_order_items_master`
  MODIFY `orderItemId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_order_master`
--
ALTER TABLE `customer_order_master`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_order_payments`
--
ALTER TABLE `customer_order_payments`
  MODIFY `paymentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_wishlist_master`
--
ALTER TABLE `customer_wishlist_master`
  MODIFY `wishId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_master`
--
ALTER TABLE `employee_master`
  MODIFY `employeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `holiday_master`
--
ALTER TABLE `holiday_master`
  MODIFY `holidayId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `measurement_item_master`
--
ALTER TABLE `measurement_item_master`
  MODIFY `measurementId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `order_feedback_master`
--
ALTER TABLE `order_feedback_master`
  MODIFY `feedbackId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_category_master`
--
ALTER TABLE `product_category_master`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_fabric_master`
--
ALTER TABLE `product_fabric_master`
  MODIFY `fabricId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=670;

--
-- AUTO_INCREMENT for table `product_master`
--
ALTER TABLE `product_master`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `product_parent_master`
--
ALTER TABLE `product_parent_master`
  MODIFY `parentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `product_style_master`
--
ALTER TABLE `product_style_master`
  MODIFY `styleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_substyle_master`
--
ALTER TABLE `product_substyle_master`
  MODIFY `subStyleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `promo_code_master`
--
ALTER TABLE `promo_code_master`
  MODIFY `promoId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `request_for_alteration`
--
ALTER TABLE `request_for_alteration`
  MODIFY `requestId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stiching_master_orders`
--
ALTER TABLE `stiching_master_orders`
  MODIFY `masterOrderId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stitch_style_details_template_master`
--
ALTER TABLE `stitch_style_details_template_master`
  MODIFY `stitchSubStyleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `stitch_style_template_master`
--
ALTER TABLE `stitch_style_template_master`
  MODIFY `stitchStyleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `supported_cities_master`
--
ALTER TABLE `supported_cities_master`
  MODIFY `cityid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `testimonial_master`
--
ALTER TABLE `testimonial_master`
  MODIFY `testimonialId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_appointment_master`
--
ALTER TABLE `customer_appointment_master`
  ADD CONSTRAINT `customer_appointment_master_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customer_master` (`customerId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_appointment_master_ibfk_2` FOREIGN KEY (`servingEmployeeId`) REFERENCES `employee_master` (`employeeId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_appointment_master_ibfk_3` FOREIGN KEY (`slotId`) REFERENCES `appointment_slots` (`slotId`) ON UPDATE NO ACTION;

--
-- Constraints for table `customer_order_items_master`
--
ALTER TABLE `customer_order_items_master`
  ADD CONSTRAINT `customer_order_items_master_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `customer_order_master` (`orderId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_order_items_master_ibfk_2` FOREIGN KEY (`employeeid`) REFERENCES `employee_master` (`employeeId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_order_items_master_ibfk_3` FOREIGN KEY (`productId`) REFERENCES `product_master` (`productId`) ON UPDATE NO ACTION;

--
-- Constraints for table `customer_order_items_measurement`
--
ALTER TABLE `customer_order_items_measurement`
  ADD CONSTRAINT `customer_order_items_measurement_ibfk_1` FOREIGN KEY (`orderItemid`) REFERENCES `customer_order_items_master` (`orderItemId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_order_items_measurement_ibfk_2` FOREIGN KEY (`measurementId`) REFERENCES `measurement_item_master` (`measurementId`) ON UPDATE NO ACTION;

--
-- Constraints for table `customer_order_item_fabric_master`
--
ALTER TABLE `customer_order_item_fabric_master`
  ADD CONSTRAINT `customer_order_item_fabric_master_ibfk_1` FOREIGN KEY (`fabricId`) REFERENCES `product_fabric_master` (`fabricId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_order_item_fabric_master_ibfk_2` FOREIGN KEY (`orderItemid`) REFERENCES `customer_order_items_master` (`orderItemId`) ON UPDATE NO ACTION;

--
-- Constraints for table `customer_order_item_style_master`
--
ALTER TABLE `customer_order_item_style_master`
  ADD CONSTRAINT `customer_order_item_style_master_ibfk_1` FOREIGN KEY (`orderItemId`) REFERENCES `customer_order_items_master` (`orderItemId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_order_item_style_master_ibfk_2` FOREIGN KEY (`stitchStyleId`) REFERENCES `stitch_style_template_master` (`stitchStyleId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_order_item_style_master_ibfk_3` FOREIGN KEY (`stitchSubStyleId`) REFERENCES `stitch_style_details_template_master` (`stitchSubStyleId`) ON UPDATE NO ACTION;

--
-- Constraints for table `customer_order_master`
--
ALTER TABLE `customer_order_master`
  ADD CONSTRAINT `customer_order_master_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customer_master` (`customerId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_order_master_ibfk_2` FOREIGN KEY (`employeeId`) REFERENCES `employee_master` (`employeeId`) ON UPDATE NO ACTION;

--
-- Constraints for table `customer_order_payments`
--
ALTER TABLE `customer_order_payments`
  ADD CONSTRAINT `customer_order_payments_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `customer_order_master` (`orderId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_order_payments_ibfk_2` FOREIGN KEY (`deletedBy`) REFERENCES `employee_master` (`employeeId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_order_payments_ibfk_3` FOREIGN KEY (`createdBy`) REFERENCES `employee_master` (`employeeId`) ON UPDATE NO ACTION;

--
-- Constraints for table `customer_referral_order_master`
--
ALTER TABLE `customer_referral_order_master`
  ADD CONSTRAINT `customer_referral_order_master_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customer_master` (`customerId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_referral_order_master_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `customer_order_master` (`orderId`) ON UPDATE NO ACTION;

--
-- Constraints for table `customer_wishlist_master`
--
ALTER TABLE `customer_wishlist_master`
  ADD CONSTRAINT `customer_wishlist_master_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customer_master` (`customerId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `customer_wishlist_master_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product_master` (`productId`) ON UPDATE NO ACTION;

--
-- Constraints for table `employee_master`
--
ALTER TABLE `employee_master`
  ADD CONSTRAINT `employee_master_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `user_roles` (`roleId`) ON UPDATE NO ACTION;

--
-- Constraints for table `order_feedback_master`
--
ALTER TABLE `order_feedback_master`
  ADD CONSTRAINT `order_feedback_master_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `customer_order_master` (`orderId`) ON UPDATE NO ACTION;

--
-- Constraints for table `product_catalog_measurement_master`
--
ALTER TABLE `product_catalog_measurement_master`
  ADD CONSTRAINT `product_catalog_measurement_master_ibfk_1` FOREIGN KEY (`measurementId`) REFERENCES `measurement_item_master` (`measurementId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_catalog_measurement_master_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product_master` (`productId`) ON UPDATE NO ACTION;

--
-- Constraints for table `product_catalog_style_master`
--
ALTER TABLE `product_catalog_style_master`
  ADD CONSTRAINT `product_catalog_style_master_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product_master` (`productId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_catalog_style_master_ibfk_2` FOREIGN KEY (`stitchStyleId`) REFERENCES `stitch_style_template_master` (`stitchStyleId`) ON UPDATE NO ACTION;

--
-- Constraints for table `product_fabric_mapping_master`
--
ALTER TABLE `product_fabric_mapping_master`
  ADD CONSTRAINT `product_fabric_mapping_master_ibfk_1` FOREIGN KEY (`fabricId`) REFERENCES `product_fabric_master` (`fabricId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_fabric_mapping_master_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product_master` (`productId`) ON UPDATE NO ACTION;

--
-- Constraints for table `product_fabric_master`
--
ALTER TABLE `product_fabric_master`
  ADD CONSTRAINT `product_fabric_master_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `product_category_master` (`categoryId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_fabric_master_ibfk_2` FOREIGN KEY (`ownerid`) REFERENCES `employee_master` (`employeeId`) ON UPDATE NO ACTION;

--
-- Constraints for table `product_master`
--
ALTER TABLE `product_master`
  ADD CONSTRAINT `product_master_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `product_category_master` (`categoryId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_master_ibfk_2` FOREIGN KEY (`parentId`) REFERENCES `product_parent_master` (`parentId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_master_ibfk_3` FOREIGN KEY (`ownerId`) REFERENCES `employee_master` (`employeeId`) ON UPDATE NO ACTION;

--
-- Constraints for table `product_parent_master`
--
ALTER TABLE `product_parent_master`
  ADD CONSTRAINT `product_parent_master_ibfk_1` FOREIGN KEY (`styleId`) REFERENCES `product_style_master` (`styleId`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_parent_master_ibfk_2` FOREIGN KEY (`subStyleId`) REFERENCES `product_substyle_master` (`subStyleId`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
