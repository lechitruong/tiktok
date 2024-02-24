-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2024 at 09:02 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tiktok`
--

-- --------------------------------------------------------

--
-- Table structure for table `avatars`
--

CREATE TABLE `avatars` (
  `id` int(11) NOT NULL,
  `publicId` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `avatars`
--

INSERT INTO `avatars` (`id`, `publicId`, `url`, `code`, `createdAt`, `updatedAt`) VALUES
(1, 'tiktok_avatar/qrabjbofeuu20wpg28o0', 'https://res.cloudinary.com/da5wewzih/image/upload/v1708242262/tiktok_avatar/qrabjbofeuu20wpg28o0.png', 'defaultAvatar', '2024-02-24 06:38:02', '2024-02-24 06:38:02');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categoriesofpost`
--

CREATE TABLE `categoriesofpost` (
  `id` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chatrooms`
--

CREATE TABLE `chatrooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commentspost`
--

CREATE TABLE `commentspost` (
  `id` int(11) NOT NULL,
  `commenter` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL DEFAULT '',
  `likes` int(11) NOT NULL DEFAULT 0,
  `replies` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commentsreply`
--

CREATE TABLE `commentsreply` (
  `id` int(11) NOT NULL,
  `responder` int(11) NOT NULL,
  `commentPostId` int(11) NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0,
  `content` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `id` int(11) NOT NULL,
  `follower` int(11) NOT NULL,
  `followee` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likescomment`
--

CREATE TABLE `likescomment` (
  `id` int(11) NOT NULL,
  `liker` int(11) NOT NULL,
  `commentPostId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likespost`
--

CREATE TABLE `likespost` (
  `id` int(11) NOT NULL,
  `liker` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `chatroomId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `isSeen` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otps`
--

INSERT INTO `otps` (`id`, `email`, `otp`, `createdAt`, `updatedAt`) VALUES
(1, 'hoanghuydev@gmail.com', 'kw4zfm', '2024-02-24 06:39:20', '2024-02-24 06:39:20');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0,
  `views` int(11) NOT NULL DEFAULT 0,
  `comments` int(11) NOT NULL DEFAULT 0,
  `shares` int(11) NOT NULL,
  `poster` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `thumnailUrl` varchar(255) DEFAULT NULL,
  `videoUrl` varchar(255) DEFAULT NULL,
  `thumnailId` varchar(255) DEFAULT NULL,
  `videoId` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `likes`, `views`, `comments`, `shares`, `poster`, `title`, `thumnailUrl`, `videoUrl`, `thumnailId`, `videoId`, `createdAt`, `updatedAt`) VALUES
(6, 0, 0, 0, 0, 1, 'How to marketing for Facebook', 'https://drive.google.com/uc?export=view&id=1f4Y6RdqdqAFWBI9t8hQKtWzuz3cLPnQV', 'http://res.cloudinary.com/da5wewzih/video/upload/v1708759993/tiktok_video/m0foyhbtwuknzhmjeetb.mp4', '1f4Y6RdqdqAFWBI9t8hQKtWzuz3cLPnQV', 'tiktok_video/m0foyhbtwuknzhmjeetb', '2024-02-24 07:33:04', '2024-02-24 07:33:18');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `code`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 'R1', 'Admin', '2024-02-17 05:58:49', '2024-02-17 05:58:49'),
(2, 'R2', 'Moderator', '2024-02-17 05:58:49', '2024-02-17 05:58:49'),
(3, 'R3', 'User', '2024-02-17 05:58:49', '2024-02-17 05:58:49');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('create-avatar.js'),
('create-category.js'),
('create-catogoryOfPost.js'),
('create-chatroom.js'),
('create-commentPost.js'),
('create-commentReply.js'),
('create-follower.js'),
('create-likeComment.js'),
('create-likePost.js'),
('create-message.js'),
('create-notification.js'),
('create-otp.js'),
('create-post.js'),
('create-role.js'),
('create-tmpPost.js'),
('create-user.js'),
('create-userInChatroom.js');

-- --------------------------------------------------------

--
-- Table structure for table `tmpposts`
--

CREATE TABLE `tmpposts` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `videoUrl` varchar(255) NOT NULL,
  `videoId` varchar(255) NOT NULL DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `association` varchar(255) DEFAULT '',
  `avatarPublicId` varchar(255) DEFAULT 'tiktok_avatar/qrabjbofeuu20wpg28o0',
  `isVertified` tinyint(1) DEFAULT 0,
  `roleCode` varchar(255) DEFAULT 'R3',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `userName`, `email`, `password`, `association`, `avatarPublicId`, `isVertified`, `roleCode`, `createdAt`, `updatedAt`) VALUES
(1, 'Hoàng Huy', 'hoanghuydev', 'hoanghuydev@gmail.com', '$2b$10$E1mmN84Cvmr2urQYPcXcMO0GCmHfSZOCivONt1szhhasrhuhmD7zW', '', 'tiktok_avatar/qrabjbofeuu20wpg28o0', 1, 'R3', '2024-02-24 06:39:20', '2024-02-24 06:39:20');

-- --------------------------------------------------------

--
-- Table structure for table `usersinchatroom`
--

CREATE TABLE `usersinchatroom` (
  `id` int(11) NOT NULL,
  `member` int(11) NOT NULL,
  `chatroomId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `avatars`
--
ALTER TABLE `avatars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `publicId` (`publicId`),
  ADD UNIQUE KEY `url` (`url`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `categoriesofpost`
--
ALTER TABLE `categoriesofpost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `chatrooms`
--
ALTER TABLE `chatrooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commentspost`
--
ALTER TABLE `commentspost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commenter` (`commenter`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `commentsreply`
--
ALTER TABLE `commentsreply`
  ADD PRIMARY KEY (`id`),
  ADD KEY `responder` (`responder`),
  ADD KEY `commentPostId` (`commentPostId`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follower` (`follower`),
  ADD KEY `followee` (`followee`);

--
-- Indexes for table `likescomment`
--
ALTER TABLE `likescomment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `liker` (`liker`),
  ADD KEY `commentPostId` (`commentPostId`);

--
-- Indexes for table `likespost`
--
ALTER TABLE `likespost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `liker` (`liker`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender` (`sender`),
  ADD KEY `chatroomId` (`chatroomId`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shares` (`shares`),
  ADD KEY `poster` (`poster`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tmpposts`
--
ALTER TABLE `tmpposts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD KEY `avatarPublicId` (`avatarPublicId`),
  ADD KEY `roleCode` (`roleCode`);

--
-- Indexes for table `usersinchatroom`
--
ALTER TABLE `usersinchatroom`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member` (`member`),
  ADD KEY `chatroomId` (`chatroomId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `avatars`
--
ALTER TABLE `avatars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categoriesofpost`
--
ALTER TABLE `categoriesofpost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chatrooms`
--
ALTER TABLE `chatrooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `commentspost`
--
ALTER TABLE `commentspost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `commentsreply`
--
ALTER TABLE `commentsreply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likescomment`
--
ALTER TABLE `likescomment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likespost`
--
ALTER TABLE `likespost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tmpposts`
--
ALTER TABLE `tmpposts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `usersinchatroom`
--
ALTER TABLE `usersinchatroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categoriesofpost`
--
ALTER TABLE `categoriesofpost`
  ADD CONSTRAINT `categoriesofpost_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `categoriesofpost_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

--
-- Constraints for table `commentspost`
--
ALTER TABLE `commentspost`
  ADD CONSTRAINT `commentspost_ibfk_1` FOREIGN KEY (`commenter`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `commentspost_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

--
-- Constraints for table `commentsreply`
--
ALTER TABLE `commentsreply`
  ADD CONSTRAINT `commentsreply_ibfk_1` FOREIGN KEY (`responder`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `commentsreply_ibfk_2` FOREIGN KEY (`commentPostId`) REFERENCES `commentspost` (`id`);

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`follower`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`followee`) REFERENCES `users` (`id`);

--
-- Constraints for table `likescomment`
--
ALTER TABLE `likescomment`
  ADD CONSTRAINT `likescomment_ibfk_1` FOREIGN KEY (`liker`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `likescomment_ibfk_2` FOREIGN KEY (`commentPostId`) REFERENCES `commentspost` (`id`);

--
-- Constraints for table `likespost`
--
ALTER TABLE `likespost`
  ADD CONSTRAINT `likespost_ibfk_1` FOREIGN KEY (`liker`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `likespost_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`chatroomId`) REFERENCES `chatrooms` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`poster`) REFERENCES `users` (`id`);

--
-- Constraints for table `tmpposts`
--
ALTER TABLE `tmpposts`
  ADD CONSTRAINT `tmpposts_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`avatarPublicId`) REFERENCES `avatars` (`publicId`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`roleCode`) REFERENCES `roles` (`code`);

--
-- Constraints for table `usersinchatroom`
--
ALTER TABLE `usersinchatroom`
  ADD CONSTRAINT `usersinchatroom_ibfk_1` FOREIGN KEY (`member`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `usersinchatroom_ibfk_2` FOREIGN KEY (`chatroomId`) REFERENCES `chatrooms` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
