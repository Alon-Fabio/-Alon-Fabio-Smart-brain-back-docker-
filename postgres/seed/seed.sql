BEGIN TRANSACTION;

INSERT INTO users (name, email, joined) values ('admin', 'admin@amail.com', NOW());
INSERT INTO login (hash, email) values ('$2a$10$bF6o2QvvPJE0CcMQjerQtew63nX2yWFvCSvK4I0evlmCf1CqO6iES', 'admin@amail.com');

COMMIT;