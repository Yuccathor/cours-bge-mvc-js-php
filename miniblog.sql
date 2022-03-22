-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 25 fév. 2022 à 11:35
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `miniblog`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_moderated` bit(1) NOT NULL,
  `id_articles` bigint(20) NOT NULL,
  `id_user` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs1slvnkuemjsq2kj4h3vhx7i1` (`id_articles`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `content`, `created_at`, `is_moderated`, `id_articles`, `id_user`) VALUES
(1, '1-Lorem ipsum des los bananas si con ubuesque de unch tag. “arf kof kof kof” sied the generalizzime où est ?', '2022-02-01 14:07:12', b'0', 3, 4),
(2, '2-Kézako ? ici l\'admin, je repeated, ici l\'admin.\r\nKézako ?', '2022-02-01 14:07:12', b'0', 3, 3),
(3, '3-Ils sont fous ces belges', '2022-02-01 14:07:12', b'0', 3, 5),
(4, '4-Incroyable spectacle Mon fils n\'en revenait pas... tous ces écarts de shrink. Et quand ce petit flexbox c\'est pris le justify en pleine tronche, tellement bon enfant... Mon josé est rentré à la maison les mirettes pleins de debug. Merci.', '2022-02-25 10:50:37', b'0', 3, 5),
(5, '5-un commentaire par mano, ça useuuuh ça use!\r\nun commentaire par mano, ça useuuuh le clavier.', '2022-02-25 10:53:40', b'0', 2, 3),
(6, '6-Nous n\'en resterons pas là, soyez-en persuadé.', '2022-02-25 10:53:40', b'0', 2, 5);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id_article` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_moderated` bit(1) NOT NULL,
  `title` varchar(255) NOT NULL,
  `id_user` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id_article`),
  KEY `FK72mt33dhhs48hf9gcqrq4fxte` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id_article`, `content`, `created_at`, `is_moderated`, `title`, `id_user`) VALUES
(1, 'Article 1 De la BDD, Alinéa 7 du json \r\nSur présomptions d\'innocence, nous présenterons succinctement les preuves qui nous amèneront à penser que l\'accident survenue, n’était peut être finalement pas un simple accident... hum hum.', '2022-02-01 14:07:12', b'0', 'L\'affaires De la BDD empourprait.', 4),
(2, 'content admin,\r\nun pain coûtant,\r\nma main ton temps\r\n', '2022-02-01 14:07:12', b'0', 'Coucou admin\r\n', 3),
(3, 'Titre en feu, pestacle de flex, et acrobatie des siamois Jquery.', '2022-02-25 10:29:34', b'0', 'El titre !!', 5);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'ADMIN'),
(2, 'USER');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `id_role` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6sou31qus5dnws6dwfu61e71v` (`email`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`),
  KEY `FKn82ha3ccdebhokx3a8fgdqeyy` (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `pwd`, `username`, `id_role`) VALUES
(1, 'admintest@admintest.org', '$2a$10$fUb.Il7opbEQG4EqWRcpWeiQwy2a./PejPanMifW2Fz8P/p9Ix2Nu', 'AdminTest', 1),
(2, 'usertest@usertest.org', '$2a$10$DDOvZGfv.YQ49FPjRXrir.w5QdQK8KMCFyF5j3eCwx6rAKXs1UjeW', 'UserTest', 2),
(3, 'fauryyoann@gmail.com', '$2y$10$evAbYGNHEuiZRymYGdaglesbqTMo7skArmqCQZx/K6Wil4D6raHVq', 'yuccatt', 1),
(4, 'antoine@lemail.zip', '$2y$10$6c1F4q3PnMX87AUtQFPgheGCN8faGf.ZP91hE1SMpgsaY./tYwDZe', 'totonou', 2),
(5, 'berlinoise@gégé.hot', '$2y$10$nypMf7g7lPSx0LnUOPat9.M2uGc2fah3EFAF3n4SEnOtY/HS177TW', 'luluberline', 2),
(6, 'fbx@gmail.com', '$2y$10$NX8Eb32iE5H3pmOTB8UMLuIoBp7o58WPOmyi7piNj1WgXija/lLi.', 'fbx', 2);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKs1slvnkuemjsq2kj4h3vhx7i1` FOREIGN KEY (`id_articles`) REFERENCES `posts` (`id_article`);

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `FK72mt33dhhs48hf9gcqrq4fxte` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FKn82ha3ccdebhokx3a8fgdqeyy` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
