create table books(
    id SERIAL PRIMARY  KEY,
    title varchar(255),
    author varchar(255),
    total_pages integer,
    type varchar(255),
    summary text
);