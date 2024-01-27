CREATE TABLE record (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    exercise_id TEXT REFERENCES exercise(id),
    value FLOAT NOT NULL,
    date DATE NOT NULL
);