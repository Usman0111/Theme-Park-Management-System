CREATE TABLE Manager
(
    manager_id serial NOT NULL,
    first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
    password varchar(100) NOT NULL,
    PRIMARY KEY (manager_id)
);

CREATE TABLE Maintainer
(
    maintainer_id serial NOT NULL,
    first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
    password varchar(100) NOT NULL,
    PRIMARY KEY (maintainer_id)
);

CREATE TABLE Customer
(
    customer_id serial NOT NULL,
    first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	password varchar(100) NOT NULL,
	age int NOT NULL,
	height int NOT NULL,
    PRIMARY KEY (customer_id)
);

CREATE TABLE Ride
(
    ride_id serial NOT NULL,
	name varchar(50) NOT NULL,
	description varchar(250) NOT NULL,
	age_restriction int,
	height_restriction int,
	location varchar(50) NOT NULL,
	broken boolean NOT NULL,
	rainedout boolean NOT NULL,
	picture bytea,
    PRIMARY KEY (ride_id)
);

CREATE TABLE Attraction
(
    attraction_id serial NOT NULL,
	name varchar(50) NOT NULL,
    description varchar(250) NOT NULL,
	location varchar(50) NOT NULL,
	rainedout boolean NOT NULL,
	picture bytea,
    PRIMARY KEY (attraction_id)
);

CREATE TABLE Attendant
(
    attendant_id serial NOT NULL,
    first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	password varchar(100) NOT NULL,
	ride_id int,
	attraction_id int,
	assigned int,
    PRIMARY KEY (attendant_id),
	FOREIGN KEY (ride_id) REFERENCES Ride(ride_id),
	FOREIGN KEY (attraction_id) REFERENCES Attraction(attraction_id)
);

CREATE TABLE EntryPass
(
    entrypass_id serial NOT NULL,
    customer_id int NOT NULL,
    date_purchased date NOT NULL,
    time_purchased timestamp NOT NULL,
	expired boolean NOT NULL,
    PRIMARY KEY (entrypass_id),
	FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);

CREATE TABLE RideBreakdowns
(
    breakdown_id serial NOT NULL,
	ride_id int NOT NULL,
    maintainer_id int NOT NULL,
    breakdown_date date NOT NULL,
    breakdown_description varchar(250),
    PRIMARY KEY (breakdown_id),
	FOREIGN KEY (ride_id) REFERENCES Ride(ride_id),
	FOREIGN KEY (maintainer_id) REFERENCES Maintainer(maintainer_id)
);

CREATE TABLE RideUsage
(
    usage_id serial NOT NULL,
    customer_id int NOT NULL,
	ride_id int NOT NULL,
	date_used date NOT NULL,
	usage_count int NULL NULL,
    PRIMARY KEY (usage_id),
	FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
	FOREIGN KEY (ride_id) REFERENCES Ride(ride_id)
);

CREATE TABLE AttractionVisit
(
    visit_id serial NOT NULL,
	attraction_id int NOT NULL,
	customer_id int NOT NULL,
    PRIMARY KEY (visit_id),
	FOREIGN KEY (attraction_id) REFERENCES Attraction(attraction_id),
	FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);

CREATE TABLE RideRainout
(
    rainout_id serial NOT NULL,
	ride_id int NOT NULL,
	date_rainedout date NOT NULL,
    PRIMARY KEY (rainout_id),
	FOREIGN KEY (ride_id) REFERENCES Ride(ride_id)
);

CREATE TABLE AttractionRainout
(
    rainout_id serial NOT NULL,
	attraction_id int NOT NULL,
    PRIMARY KEY (rainout_id),
	FOREIGN KEY (attraction_id) REFERENCES Attraction(attraction_id)
);

