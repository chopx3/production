DROP DATABASE IF EXISTS firecatcher;
CREATE DATABASE firecatcher;
USE firecatcher;

--
-- Table structure for table `shop_category`
--

DROP TABLE IF EXISTS `shop_category`;
CREATE TABLE `shop_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `oktell_login` varchar(50) DEFAULT NULL,
  `notes` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `avito_link` bigint(20) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `time` bigint(20) NOT NULL,
  `message` varchar(20000) DEFAULT NULL,

  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


--
-- Table structure for table `taggroup`
--

DROP TABLE IF EXISTS `taggroup`;
CREATE TABLE `taggroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `description` varchar(2048) DEFAULT NULL

) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `description` varchar(2048) DEFAULT NULL,
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


--
-- Table structure for table `taggroup_tags`
--

DROP TABLE IF EXISTS `taggroup_tags`;
CREATE TABLE `taggroup_tags` (
  `tag_id` int(11) NOT NULL,
  `tagGroup_id` int(11) NOT NULL,
  UNIQUE (tag_id, tagGroup_id),
  FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`),
  FOREIGN KEY (`tagGroup_id`) REFERENCES `taggroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `calls`;
CREATE TABLE `calls` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) DEFAULT NULL,
  `tags` varchar(1024) DEFAULT NULL,
  `time_begin` bigint(20) NOT NULL,
  `time_end` bigint(20) NOT NULL,
  `avito_link` bigint(20) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `shop_category_id` int(11) DEFAULT NULL,
  `isManager` tinyint(1) DEFAULT '0',
  `chain_id` varchar(100) NOT NULL,
  `com_id` varchar(100) NOT NULL UNIQUE ,
  `comments` varchar(2048) DEFAULT NULL,
  `isOut` tinyint(1) NOT NULL DEFAULT '0',
  `type` enum('EMPTY','UPDATED','EMPTY_FEEDBACK','FULL_FEEDBACK' ) NOT NULL DEFAULT 'EMPTY',

  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON UPDATE CASCADE,
  FOREIGN KEY (`shop_category_id`) REFERENCES `shop_category` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Table structure for table `calls_tags`
--

DROP TABLE IF EXISTS `calls_tags`;
CREATE TABLE `calls_tags` (
  `call_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  UNIQUE (`call_id`,`tag_id`),
   FOREIGN KEY (`call_id`) REFERENCES `calls` (`id`),
   FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `user_roles`
--
CREATE TABLE `user_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  UNIQUE (`user_id`,`role_id`),
   FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
   FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# индексы на прод
CREATE INDEX type_calls ON firecatcher.calls(type) ;
CREATE INDEX chain_id_calls ON firecatcher.calls(chain_id); #1
CREATE INDEX users_username ON firecatcher.users(username);
CREATE INDEX users_oktell_login ON firecatcher.users(oktell_login);


#
# Dump completed on 2017-04-10 13:58:38


# Категории
SELECT shop_category.description AS Category, count(DISTINCT(calls.chain_id)) AS Total
FROM calls JOIN shop_category ON calls.shop_category_id = shop_category.id
WHERE shop_category_id = shop_category.id
      AND time_begin BETWEEN 1491177600000 AND 1491609600000
      AND calls.isOut = FALSE
GROUP BY shop_category_id
ORDER BY 2 DESC;


# Вопросы по пользователям
SELECT shop_category.description AS Category, question.description As Question, calls.avito_link AS User_ID, count(DISTINCT(calls.chain_id)) AS Total
FROM calls
  JOIN shop_category ON calls.shop_category_id = shop_category.id
  JOIN question ON calls.question_id = question.id
                   AND time_begin BETWEEN 1491782400000 AND 1491868800000
GROUP BY avito_link
ORDER BY 3 DESC;

# Менеджеры
SELECT shop_category.description AS Category, count(DISTINCT(calls.chain_id)) AS Total
FROM calls JOIN shop_category ON calls.shop_category_id = shop_category.id
WHERE shop_category_id = shop_category.id
      AND time_begin BETWEEN 1472450000000 AND 1502476500000
      AND calls.isManager = TRUE
GROUP BY shop_category_id
ORDER BY 2 DESC;

# Вопросы
SELECT question.description AS Question, count(DISTINCT(chain_id)) As Total
FROM calls JOIN question ON calls.question_id = question.id
WHERE question_id=question.id
      AND time_begin BETWEEN ? AND ?
GROUP BY question_id
ORDER BY 2 DESC;

# Исходящие
SELECT shop_category.description AS Category, count(isOut) AS Total
FROM calls JOIN shop_category ON calls.shop_category_id = shop_category.id
WHERE  isOut = TRUE
       AND time_begin BETWEEN ? AND ?
GROUP BY shop_category_id
ORDER BY 2 DESC;

# Незаполненные
SELECT users.oktell_login AS "Agent name", count(DISTINCT(chain_id)) AS "Empty calls"
FROM calls JOIN users ON calls.user_id = users.id
WHERE type ="EMPTY"
      AND time_begin BETWEEN ? AND ?
GROUP BY user_id
ORDER BY 2 DESC;