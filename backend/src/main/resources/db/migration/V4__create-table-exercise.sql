CREATE TABLE exercise (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    train_id TEXT REFERENCES train(id),
    name TEXT NOT NULL,
    series INT,
    reps INT
);