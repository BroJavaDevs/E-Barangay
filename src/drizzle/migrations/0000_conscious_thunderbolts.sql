-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `tbl_announcements` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`body` text NOT NULL,
	`image` blob NOT NULL,
	`postedAt` datetime NOT NULL DEFAULT 'current_timestamp()'
);

*/