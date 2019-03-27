/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE IF NOT EXISTS `site` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `site`;

CREATE TABLE IF NOT EXISTS `auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `key` char(32) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_auth_users` (`user_id`),
  CONSTRAINT `FK_auth_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','teacher','student') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- отсюда внеси в heidisql
CREATE TABLE `marks` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_id` INT(11) UNSIGNED NULL DEFAULT NULL,
	`subject_id` INT(11) UNSIGNED NULL DEFAULT NULL,
	`semester_id` INT(11) UNSIGNED NULL DEFAULT NULL,
	`mark` ENUM('2','3','4','5') NULL DEFAULT NULL,
	PRIMARY KEY (`id`),
	INDEX `FK_marks_users` (`user_id`),
	INDEX `FK_marks_subject` (`subject_id`),
	INDEX `FK_marks_semester` (`semester_id`),
	CONSTRAINT `FK_marks_semester` FOREIGN KEY (`semester_id`) REFERENCES `semester` (`id`),
	CONSTRAINT `FK_marks_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
	CONSTRAINT `FK_marks_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB;

CREATE TABLE `subject` (
	`id` INT(10) UNSIGNED NOT NULL,
	`name` VARCHAR(255) NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB;

CREATE TABLE `semester` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`date` DATE NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
