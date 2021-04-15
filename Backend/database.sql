CREATE TABLE UserAccount
(
    account_id serial NOT NULL,
    first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
    password varchar(100) NOT NULL,
	user_type varchar(50) NOT NULL,
    PRIMARY KEY (account_id)
);

CREATE TABLE CustomerInfo
(
    info_id serial NOT NULL,
	customer_id int NOT NULL,
	dob date NOT NULL,
	height int NOT NULL,
    PRIMARY KEY (info_id),
	FOREIGN Key (customer_id) REFERENCES UserAccount(account_id)
);

CREATE TABLE Ride
(
    ride_id serial NOT NULL,
	name varchar(50) NOT NULL,
	description varchar(1000) NOT NULL,
	location varchar(50) NOT NULL,
	broken boolean NOT NULL,
	rainedout boolean NOT NULL,
	age_restriction int,
	height_restriction int,
	picture varchar(300),
	archived boolean NOT NULL DEFAULT false,
	attendant_id int,
    PRIMARY KEY (ride_id)
);

CREATE TABLE Attraction
(
    attraction_id serial NOT NULL,
	name varchar(50) NOT NULL,
    description varchar(100) NOT NULL,
	location varchar(50) NOT NULL,
	rainedout boolean NOT NULL,
	age_restriction int,
	picture varchar(300),
	archived boolean NOT NULL DEFAULT FALSE,
	attendant_id int,
    PRIMARY KEY (attraction_id)
);

CREATE TABLE AttendantAssignment
(
    assignment_id serial NOT NULL,
	attendant_id int NOT NULL,
	assignment_type varchar(50) NOT NULL,
    PRIMARY KEY (assignment_id),
	FOREIGN KEY (attendant_id) REFERENCES UserAccount(account_id)
);	

CREATE TABLE EntryPass
(
    entrypass_id serial NOT NULL,
    customer_id int NOT NULL,
    time_purchased timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (entrypass_id),
	FOREIGN KEY (customer_id) REFERENCES UserAccount(account_id)
);

CREATE TABLE RideBreakdowns
(
    breakdown_id serial NOT NULL,
	ride_id int NOT NULL,
    maintainer_id int,
    breakdown_date date NOT NULL DEFAULT CURRENT_DATE,
    breakdown_description varchar(1000),
	attendant_id int,
    PRIMARY KEY (breakdown_id),
	FOREIGN KEY (ride_id) REFERENCES Ride(ride_id),
	FOREIGN KEY (maintainer_id) REFERENCES UserAccount(account_id)
);

CREATE TABLE RideUsage
(
    usage_id serial NOT NULL,
    customer_id int NOT NULL,
	ride_id int NOT NULL,
	date_used date NOT NULL DEFAULT CURRENT_DATE,
	usage_count int NULL NULL DEFAULT 1,
    PRIMARY KEY (usage_id),
	FOREIGN KEY (customer_id) REFERENCES UserAccount(account_id),
	FOREIGN KEY (ride_id) REFERENCES Ride(ride_id)
);

CREATE TABLE AttractionVisit
(
    visit_id serial NOT NULL,
	attraction_id int NOT NULL,
	customer_id int NOT NULL,
	date_visited date NOT NULL DEFAULT CURRENT_DATE,
	visit_count int NULL NULL DEFAULT 1,
    PRIMARY KEY (visit_id),
	FOREIGN KEY (attraction_id) REFERENCES Attraction(attraction_id),
	FOREIGN KEY (customer_id) REFERENCES UserAccount(account_id)
);

CREATE TABLE RideRainout
(
    rainout_id serial NOT NULL,
	ride_id int NOT NULL,
	date_rainedout date NOT NULL DEFAULT CURRENT_DATE,
	attendant_id int,
    PRIMARY KEY (rainout_id),
	FOREIGN KEY (ride_id) REFERENCES Ride(ride_id)
);

CREATE TABLE AttractionRainout
(
    rainout_id serial NOT NULL,
	attraction_id int NOT NULL,
	date_rainedout date NOT NULL DEFAULT CURRENT_DATE,
	attendant_id int,
    PRIMARY KEY (rainout_id),
	FOREIGN KEY (attraction_id) REFERENCES Attraction(attraction_id)
);

