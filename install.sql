DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `answer_precision` varchar(1000) DEFAULT NULL,
  `submit_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `answer`;
CREATE TABLE IF NOT EXISTS `answer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `propose` varchar(1000) NOT NULL,
  `question_id` int NOT NULL,
  `answer_prefix` int NOT NULL,
  `is_answer` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ANSWER_QUESTION_ID_QUESTION_ID` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Question insertion example

INSERT INTO question(content, answer_precision)
VALUES (
    'What is the answer ?',
    'Yeah, that is !'
);

SET @questionId = LAST_INSERT_ID();

INSERT INTO answer(propose, answer_prefix, is_answer, question_id)
VALUES
	('The answer', '1', 1, @questionId),
	('The question', '2', 0, @questionId),
	('Foo', '3', 0, @questionId),
	('Bar', '4', 0, @questionId);