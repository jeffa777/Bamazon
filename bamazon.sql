DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhoneXs", "Electronics", 1100, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("XboxOneX", "Electronics", 499, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AppleWatch", "Electronics", 429, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("FitBitVersa", "Electronics", 249, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ChevycoloradoZR2", "Automobile", 45000, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("VWGolfR", "Automobile", 42000, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PatriotsT-shirt", "Clothing", 19.95, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GolfPoloshirt", "Clothing", 35, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shorts", "Clothing", 25, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AsusVideoCard", "Computers", 315, 50);