INSERT INTO users (username, email, password, firstName, lastName, createdAt)
VALUES ($username, $email, $password, $firstName, $lastName, CURRENT_TIMESTAMP);
