CREATE TABLE users
(
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password CHAR(50) NOT NULL,
  phone_number INT(11) NOT NULL,
  skipper_crew CHAR(50),
  car_id MEDIUMINT(9) NOT NULL
);


