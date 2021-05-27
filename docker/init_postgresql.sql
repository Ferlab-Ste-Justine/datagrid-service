CREATE TABLE data_grid (
    id BIGSERIAL PRIMARY KEY,
    entity_type varchar(75) NOT NULL,
    content json NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS data_grid_user_id_entity_type_index ON data_grid (user_id, entity_type);