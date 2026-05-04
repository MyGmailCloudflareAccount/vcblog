CREATE TABLE
    IF NOT EXISTS storage (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL DEFAULT 'post',
        path TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        content TEXT NOT NULL DEFAULT '',
    )