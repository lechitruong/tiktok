CREATE TABLE `users` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `userName` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `association` varchar(30) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `isVertified` BOOLEAN NOT NULL DEFAULT false,
  `roleCode` varchar(10) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `otps` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(6) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `roles` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `code` varchar(10) UNIQUE NOT NULL,
  `value` varchar(50) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `notifications` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `isSeen` BOOLEAN NOT NULL DEFAULT false,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `chatrooms` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `usersInChatroom` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `member` INT(11) NOT NULL,
  `chatroomId` INT(11) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `messages` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `sender` INT(11) NOT NULL,
  `chatroomId` INT(11) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `friends` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `friend1` INT(11) NOT NULL,
  `friend2` INT(11) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `followers` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `followee` INT(11) NOT NULL,
  `follower` INT(11) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `posts` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) NOT NULL,
  `videoUrl` varchar(255) NOT NULL,
  `likes` INT NOT NULL DEFAULT 0,
  `comments` INT NOT NULL DEFAULT 0,
  `views` INT NOT NULL DEFAULT 0,
  `shares` INT NOT NULL DEFAULT 0,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `likesPost` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `liker` INT(11) NOT NULL,
  `postId` INT(11) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `commentsPost` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `commenter` INT(11) NOT NULL,
  `postId` INT(11) NOT NULL,
  `likes` INT NOT NULL DEFAULT 0,
  `replies` INT NOT NULL DEFAULT 0,
  `content` varchar(1000) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `likesComment` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `liker` INT(11) NOT NULL,
  `commentPostId` INT(11) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

CREATE TABLE `commentsReply` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `responder` INT(11) NOT NULL,
  `commentPostId` INT(11) NOT NULL,
  `likes` INT NOT NULL DEFAULT 0,
  `content` varchar(1000) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT 'current_timestamp'
);

ALTER TABLE `users` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`roleCode`) REFERENCES `roles` (`code`);

-- ALTER TABLE `otps` ADD CONSTRAINT `otps_fk0` FOREIGN KEY (`email`) REFERENCES `users` (`email`);

ALTER TABLE `notifications` ADD CONSTRAINT `notifications_fk0` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `usersInChatroom` ADD CONSTRAINT `usersInChatroom_fk0` FOREIGN KEY (`member`) REFERENCES `users` (`id`);

ALTER TABLE `usersInChatroom` ADD CONSTRAINT `usersInChatroom_fk1` FOREIGN KEY (`chatroomId`) REFERENCES `chatrooms` (`id`);

ALTER TABLE `messages` ADD CONSTRAINT `messages_fk0` FOREIGN KEY (`sender`) REFERENCES `users` (`id`);

ALTER TABLE `messages` ADD CONSTRAINT `messages_fk1` FOREIGN KEY (`chatroomId`) REFERENCES `chatrooms` (`id`);

ALTER TABLE `friends` ADD CONSTRAINT `friends_fk0` FOREIGN KEY (`friend1`) REFERENCES `users` (`id`);

ALTER TABLE `friends` ADD CONSTRAINT `friends_fk1` FOREIGN KEY (`friend2`) REFERENCES `users` (`id`);

ALTER TABLE `followers` ADD CONSTRAINT `followers_fk0` FOREIGN KEY (`followee`) REFERENCES `users` (`id`);

ALTER TABLE `followers` ADD CONSTRAINT `followers_fk1` FOREIGN KEY (`follower`) REFERENCES `users` (`id`);

ALTER TABLE `likesPost` ADD CONSTRAINT `likesPost_fk0` FOREIGN KEY (`liker`) REFERENCES `users` (`id`);

ALTER TABLE `likesPost` ADD CONSTRAINT `likesPost_fk1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

ALTER TABLE `commentsPost` ADD CONSTRAINT `commentsPost_fk0` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);

ALTER TABLE `commentsPost` ADD CONSTRAINT `commentsPost_fk1` FOREIGN KEY (`commenter`) REFERENCES `users` (`id`);

ALTER TABLE `likesComment` ADD CONSTRAINT `likesComment_fk0` FOREIGN KEY (`commentPostId`) REFERENCES `commentsPost` (`id`);

ALTER TABLE `likesComment` ADD CONSTRAINT `likesComment_fk1` FOREIGN KEY (`liker`) REFERENCES `users` (`id`);

ALTER TABLE `commentsReply` ADD CONSTRAINT `commentsReply_fk0` FOREIGN KEY (`responder`) REFERENCES `users` (`id`);

ALTER TABLE `commentsReply` ADD CONSTRAINT `commentsReply_fk1` FOREIGN KEY (`commentPostId`) REFERENCES `commentsPost` (`id`);
