USE sailing;
CREATE TABLE  cars (
  car_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Number_of_Passanger INT,
  Vehicle_make VARCHAR(50),
  Vehicle_model VARCHAR(50),
  Vehicle_year INT,
  License_Plate VARCHAR(50)
);