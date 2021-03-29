CREATE TABLE data_grid (
    id BIGSERIAL PRIMARY KEY,
    entity_type varchar(75) NOT NULL,
    content json NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);