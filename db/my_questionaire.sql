/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : my_questionaire

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 22/06/2020 16:06:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `abstract` text NOT NULL,
  `createtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `endtime` datetime NOT NULL,
  `accesstype` int NOT NULL,
  `accessnum` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `title` (`title`) USING BTREE COMMENT 'title唯一'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of collection
-- ----------------------------
BEGIN;
INSERT INTO `collection` VALUES (1, '过期测试', '123@qq.com', 'wow', '2020-06-17 14:35:03', '2020-06-21 01:22:40', 3, 10);
INSERT INTO `collection` VALUES (2, '题目类型测试', '123@qq.com', 'wwww', '2020-06-22 14:36:46', '2020-07-04 20:57:52', 1, 6);
INSERT INTO `collection` VALUES (3, '级联测试', '123@qq.com', 'wowd', '2020-06-22 14:36:50', '2020-07-04 20:15:03', 3, 10);
COMMIT;

-- ----------------------------
-- Table structure for form_answer
-- ----------------------------
DROP TABLE IF EXISTS `form_answer`;
CREATE TABLE `form_answer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `qid` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `type` int NOT NULL,
  `op` int DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `num` int DEFAULT NULL,
  `score` int DEFAULT NULL,
  `createdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `title_ans` (`title`),
  CONSTRAINT `title_ans` FOREIGN KEY (`title`) REFERENCES `collection` (`title`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of form_answer
-- ----------------------------
BEGIN;
INSERT INTO `form_answer` VALUES (1, 1, '169.254.148.40', '题目类型测试', 2, 2, NULL, NULL, NULL, '2020-06-19 10:52:54');
INSERT INTO `form_answer` VALUES (2, 2, '169.254.148.40', '题目类型测试', 4, 3, NULL, NULL, NULL, '2020-06-19 10:52:56');
INSERT INTO `form_answer` VALUES (3, 3, '169.254.148.40', '题目类型测试', 7, NULL, 'AAAB', NULL, NULL, '2020-06-19 10:52:57');
INSERT INTO `form_answer` VALUES (4, 4, '169.254.148.40', '题目类型测试', 8, NULL, NULL, 7, NULL, '2020-06-19 10:52:59');
INSERT INTO `form_answer` VALUES (5, 5, '169.254.148.40', '题目类型测试', 9, NULL, NULL, NULL, 3, '2020-06-20 10:53:01');
INSERT INTO `form_answer` VALUES (6, 1, '123@qq.com', '题目类型测试', 2, 4, NULL, NULL, NULL, '2020-06-19 01:23:13');
INSERT INTO `form_answer` VALUES (7, 2, '123@qq.com', '题目类型测试', 4, 2, NULL, NULL, NULL, '2020-06-19 01:23:13');
INSERT INTO `form_answer` VALUES (8, 3, '123@qq.com', '题目类型测试', 7, NULL, '77jja', NULL, NULL, '2020-06-19 01:23:13');
INSERT INTO `form_answer` VALUES (9, 4, '123@qq.com', '题目类型测试', 8, NULL, NULL, 8, NULL, '2020-06-19 01:23:13');
INSERT INTO `form_answer` VALUES (10, 5, '123@qq.com', '题目类型测试', 9, NULL, NULL, NULL, 2, '2020-06-19 01:23:13');
INSERT INTO `form_answer` VALUES (24, 1, '169.254.148.40', '题目类型测试', 2, 2, NULL, NULL, NULL, '2020-06-21 10:52:24');
INSERT INTO `form_answer` VALUES (25, 2, '169.254.148.40', '题目类型测试', 4, 2, NULL, NULL, NULL, '2020-06-21 10:52:26');
INSERT INTO `form_answer` VALUES (26, 3, '169.254.148.40', '题目类型测试', 7, NULL, '333', NULL, NULL, '2020-06-21 10:52:28');
INSERT INTO `form_answer` VALUES (27, 4, '169.254.148.40', '题目类型测试', 8, NULL, NULL, 6, NULL, '2020-06-21 10:52:29');
INSERT INTO `form_answer` VALUES (28, 5, '169.254.148.40', '题目类型测试', 9, NULL, NULL, NULL, 5, '2020-06-21 10:52:31');
INSERT INTO `form_answer` VALUES (29, 1, '169.254.148.40', '题目类型测试', 2, 4, NULL, NULL, NULL, '2020-06-21 10:52:33');
INSERT INTO `form_answer` VALUES (30, 2, '169.254.148.40', '题目类型测试', 4, 2, NULL, NULL, NULL, '2020-06-21 10:52:34');
INSERT INTO `form_answer` VALUES (31, 3, '169.254.148.40', '题目类型测试', 7, NULL, 'yy55', NULL, NULL, '2020-06-21 10:52:36');
INSERT INTO `form_answer` VALUES (32, 4, '169.254.148.40', '题目类型测试', 8, NULL, NULL, 888, NULL, '2020-06-21 10:52:38');
INSERT INTO `form_answer` VALUES (33, 5, '169.254.148.40', '题目类型测试', 9, NULL, NULL, NULL, 7, '2020-06-21 10:52:42');
INSERT INTO `form_answer` VALUES (34, 1, '169.254.148.40', '题目类型测试', 2, 4, NULL, NULL, NULL, '2020-06-21 10:52:44');
INSERT INTO `form_answer` VALUES (35, 2, '169.254.148.40', '题目类型测试', 4, 3, NULL, NULL, NULL, '2020-06-21 10:52:46');
INSERT INTO `form_answer` VALUES (36, 3, '169.254.148.40', '题目类型测试', 7, NULL, 'jjjjjj', NULL, NULL, '2020-06-21 10:52:47');
INSERT INTO `form_answer` VALUES (37, 4, '169.254.148.40', '题目类型测试', 8, NULL, NULL, 9, NULL, '2020-06-21 10:52:49');
INSERT INTO `form_answer` VALUES (38, 5, '169.254.148.40', '题目类型测试', 9, NULL, NULL, NULL, 7, '2020-06-21 10:52:52');
INSERT INTO `form_answer` VALUES (39, 1, '169.254.148.40', '题目类型测试', 2, 2, NULL, NULL, NULL, '2020-06-21 10:51:35');
INSERT INTO `form_answer` VALUES (40, 2, '169.254.148.40', '题目类型测试', 4, 2, NULL, NULL, NULL, '2020-06-21 10:51:35');
INSERT INTO `form_answer` VALUES (41, 3, '169.254.148.40', '题目类型测试', 7, NULL, 'www', NULL, NULL, '2020-06-21 10:51:35');
INSERT INTO `form_answer` VALUES (42, 4, '169.254.148.40', '题目类型测试', 8, NULL, NULL, 5, NULL, '2020-06-21 10:51:35');
INSERT INTO `form_answer` VALUES (43, 5, '169.254.148.40', '题目类型测试', 9, NULL, NULL, NULL, 2, '2020-06-21 10:51:35');
INSERT INTO `form_answer` VALUES (44, 1, '123@qq.com', '级联测试', 2, 2, NULL, NULL, NULL, '2020-06-21 22:32:45');
INSERT INTO `form_answer` VALUES (45, 2, '123@qq.com', '级联测试', 3, 2, NULL, NULL, NULL, '2020-06-21 22:32:45');
INSERT INTO `form_answer` VALUES (46, 3, '123@qq.com', '级联测试', 9, NULL, NULL, NULL, 4, '2020-06-21 22:32:45');
INSERT INTO `form_answer` VALUES (47, 1, '123@qq.com', '级联测试', 2, 1, NULL, NULL, NULL, '2020-06-21 22:33:56');
INSERT INTO `form_answer` VALUES (48, 2, '123@qq.com', '级联测试', 3, 4, NULL, NULL, NULL, '2020-06-21 22:33:56');
INSERT INTO `form_answer` VALUES (49, 3, '123@qq.com', '级联测试', 9, NULL, NULL, NULL, 0, '2020-06-21 22:33:56');
INSERT INTO `form_answer` VALUES (50, 1, '123@qq.com', '级联测试', 2, 1, NULL, NULL, NULL, '2020-06-21 22:34:17');
INSERT INTO `form_answer` VALUES (51, 2, '123@qq.com', '级联测试', 3, 0, NULL, NULL, NULL, '2020-06-21 22:34:17');
INSERT INTO `form_answer` VALUES (52, 3, '123@qq.com', '级联测试', 9, NULL, NULL, NULL, 0, '2020-06-21 22:34:17');
INSERT INTO `form_answer` VALUES (53, 1, '123@qq.com', '级联测试', 2, 2, NULL, NULL, NULL, '2020-06-21 22:40:38');
INSERT INTO `form_answer` VALUES (54, 2, '123@qq.com', '级联测试', 3, 2, NULL, NULL, NULL, '2020-06-21 22:40:38');
INSERT INTO `form_answer` VALUES (55, 3, '123@qq.com', '级联测试', 9, NULL, NULL, NULL, 1, '2020-06-21 22:40:38');
COMMIT;

-- ----------------------------
-- Table structure for form_question
-- ----------------------------
DROP TABLE IF EXISTS `form_question`;
CREATE TABLE `form_question` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `qid` int NOT NULL,
  `qabstract` varchar(255) NOT NULL,
  `qtype` int unsigned NOT NULL,
  `op1` varchar(255) DEFAULT NULL,
  `op2` varchar(255) DEFAULT NULL,
  `op3` varchar(255) DEFAULT NULL,
  `op4` varchar(255) DEFAULT NULL,
  `qcas` int NOT NULL,
  `qcasnum` int DEFAULT NULL,
  `qcasop` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `title_q` (`title`),
  CONSTRAINT `title_q` FOREIGN KEY (`title`) REFERENCES `collection` (`title`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of form_question
-- ----------------------------
BEGIN;
INSERT INTO `form_question` VALUES (1, '过期测试', 1, 'ASas', 1, 'ddd', 'aaa', '', '', 0, 0, 0);
INSERT INTO `form_question` VALUES (2, '过期测试', 2, 'ASaswww', 5, 'ddd', '66aaa', '33aa', '', 0, 0, 0);
INSERT INTO `form_question` VALUES (3, '过期测试', 3, 'sfsg', 8, '', '', '', '', 0, 0, 0);
INSERT INTO `form_question` VALUES (18, '题目类型测试', 1, 'aaa', 2, 'aad', 'gg', 'jjk', '', 0, 0, 0);
INSERT INTO `form_question` VALUES (19, '题目类型测试', 2, 'aafv', 4, 'qq', 'ty', '', '', 0, 0, 0);
INSERT INTO `form_question` VALUES (20, '题目类型测试', 3, 'jvcc', 7, '', '', '', '', 0, 0, 0);
INSERT INTO `form_question` VALUES (21, '题目类型测试', 4, 'UUYN', 8, '', '', '', '', 0, 0, 0);
INSERT INTO `form_question` VALUES (22, '题目类型测试', 5, 'YJBB', 9, '', '', '', '', 0, 0, 0);
INSERT INTO `form_question` VALUES (23, '级联测试', 1, 'ASaswww', 2, 'ddd', '点我级联', '33aa', '', 0, 0, 0);
INSERT INTO `form_question` VALUES (24, '级联测试', 2, 'sfsg', 3, 'BBB', '点我级联', 'ggg', '44aa', 1, 1, 2);
INSERT INTO `form_question` VALUES (25, '级联测试', 3, 'sfsg', 9, '', '', '', '', 1, 2, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
