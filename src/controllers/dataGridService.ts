import { connectionPool } from '~/config/connection';
import { env } from '~/config/env';

export const findAllContentByUserID = async (userID: string): Promise<any> => {
    try {
        const results = await connectionPool.query('SELECT content FROM data_grid WHERE user_id = $1 ORDER BY 1 ASC', [
            userID,
        ]);
        return results.rows;
    } catch (e) {
        console.error(e.message);
        throw new Error(e.message);
    }
};

export const findAllContentByUserIDAndEntityType = async (userID: string, entityType: string): Promise<any> => {
    const type = getEntityType(entityType);
    try {
        const results = await connectionPool.query(
            'SELECT * FROM data_grid WHERE user_id = $1 and entity_type = $2 ORDER BY 1 ASC',
            [userID, type]
        );
        return results.rows;
    } catch (e) {
        console.error(e.message);
        throw new Error(e.message);
    }
};

export const findContentByUserIDAndContentID = async (userID: string, contentID: number): Promise<any> => {
    try {
        const results = await connectionPool.query('SELECT * FROM data_grid WHERE user_id = $1 and id = $2', [
            userID,
            contentID,
        ]);
        return results.rows;
    } catch (e) {
        console.error(e.message);
        throw new Error(e.message);
    }
};

export const findContentByUserIDAndContentKeyValue = async (
    userID: string,
    key: string,
    value: string
): Promise<any> => {
    try {
        const results = await connectionPool.query(
            'SELECT * FROM data_grid WHERE user_id = $1 and content ->> $2 = $3',
            [userID, key, value]
        );
        return results.rows;
    } catch (e) {
        console.error(e.message);
        throw new Error(e.message);
    }
};

export const createNewContentEntry = async (userID: string, entityType: string, content: JSON): Promise<any> => {
    const type = getEntityType(entityType);
    try {
        const results = await connectionPool.query(
            'INSERT INTO data_grid (user_id, entity_type, content ) VALUES ($1, $2, $3) RETURNING id',
            [userID, type, content]
        );
        const idContent = results.rows[0].id;
        return await findContentByUserIDAndContentID(userID, idContent);
    } catch (e) {
        console.error(e.message);
        throw new Error(e.message);
    }
};

export const updateContentEntry = async (userID: string, contentID: string, content: JSON): Promise<any> => {
    try {
        const results = await connectionPool.query(
            'UPDATE data_grid SET content = $1, updated_at = NOW()  WHERE id = $2 and user_id = $3 RETURNING id',
            [content, contentID, userID]
        );
        const idContent = results.rows[0].id;
        return await findContentByUserIDAndContentID(userID, idContent);
    } catch (e) {
        console.error(e.message);
        throw new Error(e.message);
    }
};

export const deleteContentEntry = async (userID: string, contentID: string): Promise<any> => {
    try {
        await connectionPool.query('DELETE FROM data_grid WHERE id = $1 and user_id = $2', [contentID, userID]);
    } catch (e) {
        console.error(e.message);
        throw new Error(e.message);
    }
};

const getEntityType = (entityType: string) => {
    const entityTypes = env.entities.type;
    if (!entityTypes[entityType]) {
        throw new Error(`Unsupported entity types: ${entityType}`);
    }

    return entityTypes[entityType];
};
