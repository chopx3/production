use firecatcher;
DROP TABLE IF EXISTS nested_category;
CREATE TABLE nested_category (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  lft INT NOT NULL,
  rgt INT NOT NULL
);

INSERT INTO nested_category VALUES  (1,'ELECTRONICS',1,20),
                                    (2,'TELEVISIONS',2,9),
                                    (3,'TUBE',3,4),
                                    (4,'LCD',5,6),
                                    (5,'PLASMA',7,8),
                                    (6,'PORTABLE ELECTRONICS',10,19),
                                    (7,'MP3 PLAYERS',11,14),
                                    (8,'FLASH',12,13),
                                    (9,'CD PLAYERS',15,16),
                                    (10,'2 WAY RADIOS',17,18);

DROP TABLE if EXISTS product;
CREATE TABLE product
(
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(40),
  category_id INT NOT NULL
);

INSERT INTO product(name, category_id) VALUES('20" TV',3),
                                              ('36" TV',3),
                                              ('Super-LCD 42"',4),
                                              ('Ultra-Plasma 62"',5),
                                              ('Value Plasma 38"',5),
                                              ('Power-MP3 5gb',7),
                                              ('Super-Player 1gb',8),
                                              ('Porta CD',9),
                                              ('CD To go!',9),
                                              ('Family Talk 360',10);



#CRUD Nodes
DROP PROCEDURE IF EXISTS addNode;
CREATE PROCEDURE `addNode` (IN groupName VARCHAR(100), categoryName VARCHAR(100))
LANGUAGE SQL
  SQL SECURITY INVOKER
  COMMENT 'добавление узла в последовательном порядке'
  BEGIN
    SELECT @myRight := rgt FROM nested_category
    WHERE name = groupName;
    UPDATE nested_category SET rgt = rgt + 2 WHERE rgt > @myRight;
    UPDATE nested_category SET lft = lft + 2 WHERE lft > @myRight;
    INSERT INTO nested_category(name, lft, rgt) VALUES(categoryName, @myRight + 1, @myRight + 2);
  END;

DROP PROCEDURE IF EXISTS addChildNode;
CREATE PROCEDURE `addChildNode` (IN parentName VARCHAR(100), childName VARCHAR(100))
LANGUAGE SQL
  SQL SECURITY INVOKER
  COMMENT 'добавление узла без учета порядка'
  BEGIN
    SELECT @myLeft := lft FROM nested_category
    WHERE name = parentName;
    UPDATE nested_category SET rgt = rgt + 2 WHERE rgt > @myLeft;
    UPDATE nested_category SET lft = lft + 2 WHERE lft > @myLeft;
    INSERT INTO nested_category(name, lft, rgt) VALUES(childName, @myLeft + 1, @myLeft + 2);
  END;

DROP PROCEDURE IF EXISTS deleteNode;
CREATE PROCEDURE `deleteNode` (categoryName VARCHAR(100))
LANGUAGE SQL
  SQL SECURITY INVOKER
  COMMENT 'Удаление узла с учетом дочерних узлов'
  BEGIN
    SELECT @myLeft := lft, @myRight := rgt, @myWidth := rgt - lft + 1
    FROM nested_category
    WHERE name = categoryName;
    DELETE FROM nested_category WHERE lft BETWEEN @myLeft AND @myRight;
    UPDATE nested_category SET rgt = rgt - @myWidth WHERE rgt > @myRight;
    UPDATE nested_category SET lft = lft - @myWidth WHERE lft > @myRight;
  END;


#Показывает карту категорий и колличество товаров в этой категории - готово
SELECT node.category_id as id, node.name AS name, COUNT(parent.name)-1 As level, itemCount.itemsCount
FROM(SELECT parent.category_id as id, parent.name as name, COUNT(product.name) As itemsCount
     FROM nested_category AS node, nested_category AS parent, product
     WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.category_id = product.category_id
     GROUP BY parent.name
     ORDER BY 3 DESC) AS itemCount,
  nested_category AS node,
  nested_category AS parent
WHERE node.lft BETWEEN parent.lft AND parent.rgt AND itemCount.name=node.name
GROUP BY node.name
ORDER BY node.lft ASC;

# Получить путь - готово
SELECT parent.name
FROM nested_category AS node,
  nested_category AS parent
WHERE node.lft BETWEEN parent.lft AND parent.rgt
      AND node.name = 'LCD'
ORDER BY parent.lft;

#Выбирает для переданного узла ID родительского узла - готово
SELECT name, (SELECT t2.name
               FROM nested_category t2
               WHERE t2.lft < t1.lft AND t2.rgt > t1.rgt
               ORDER BY t2.rgt-t1.rgt ASC LIMIT 1) AS parent,
              (SELECT t2.category_id
               FROM nested_category t2
               WHERE t2.lft < t1.lft AND t2.rgt > t1.rgt
               ORDER BY t2.rgt-t1.rgt ASC LIMIT 1) AS parentId
FROM nested_category t1 WHERE name ='LCD';

 SELECT t1.category_id as category_id, t1.name as name,t1.lft as lft, t1.rgt FROM
            nested_category t1 INNER JOIN
              (SELECT t2.category_id
                FROM nested_category t2,
                     nested_category t1
                WHERE t2.lft < t1.lft AND t2.rgt > t1.rgt
                AND t1.name='LCD'
                ORDER BY t2.rgt-t1.rgt ASC LIMIT 1) AS t2
ON t1.category_id = t2.category_id;

