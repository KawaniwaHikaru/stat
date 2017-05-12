
CREATE DATABASE IF NOT EXISTS `stat` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `stat`;


DROP TABLE IF EXISTS `ranking`;
CREATE TABLE `ranking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `site` varchar(128) DEFAULT '' COLLATE utf8_unicode_ci NOT NULL,
  `keyword` varchar(255) DEFAULT '' COLLATE utf8_unicode_ci NOT NULL,
  `market` varchar(255) DEFAULT '' COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(255) DEFAULT '' COLLATE utf8_unicode_ci NOT NULL,
  `device` varchar(255) DEFAULT '' COLLATE utf8_unicode_ci NOT NULL,
  `google` int(10) DEFAULT 0 NOT NULL,
  `googleBaseRank` int(10) DEFAULT 0 NOT NULL,
  `yahoo` int(10) DEFAULT 0 NOT NULL,
  `bing` int(10) DEFAULT 0 NOT NULL,
  `global_monthly_searchs` int(10) DEFAULT 0 NOT NULL,
  `regional_monthly_searchs` int(10) DEFAULT 0 NOT NULL,
  PRIMARY KEY (`id`),
  INDEX(`date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;