CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	last_name VARCHAR (50),
	first_name VARCHAR (50),
	email VARCHAR (150),
	city VARCHAR (50),
	is_admin BOOLEAN,
	password VARCHAR(60),
	is_deleted BOOLEAN DEFAULT false,
	constraint_email UNIQUE (email)
);

CREATE TABLE actions (
	action_id SERIAL PRIMARY KEY,
	title VARCHAR(50),
	type VARCHAR (30),
	description VARCHAR (500),
	address VARCHAR (70),
	city VARCHAR(70)
	begin_date DATE,
	end_date DATE,
	begin_time VARCHAR (20),
	end_time VARCHAR (20),
	organiser_id INTEGER,
	status INTEGER DEFAULT 0,
	CONSTRAINT fk_user FOREIGN KEY (organiser_id) REFERENCES users (user_id)
);

CREATE TABLE actions_data (
	action_data_id SERIAL PRIMARY KEY,
	bags_collected INTEGER,
	weight_collected INTEGER,
	action_id INTEGER,
	CONSTRAINT fk_action FOREIGN KEY (action_id) REFERENCES actions (action_id)
);

CREATE TABLE participants (
	participant_id SERIAL PRIMARY KEY,
	user_id INTEGER,
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id),
	action_id INTEGER,
	CONSTRAINT fk_action FOREIGN KEY (action_id) REFERENCES actions (action_id),
	action_data_id INTEGER,
	CONSTRAINT fk_action_data FOREIGN KEY (action_data_id) REFERENCES actions_data (action_data_id)
);