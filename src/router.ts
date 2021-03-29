import express from 'express';

import {
    createNewContentEntry,
    deleteContentEntry,
    findAllContentByUserID,
    findAllContentByUserIDAndEntityType,
    findContentByUserIDAndContentID,
    updateContentEntry,
} from 'controllers/dataGridService';

const router = express.Router();

router.get('/', async (req: any, res) => {
    try {
        const response: any = await findAllContentByUserID(req.user);
        res.send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
router.get('/type/:entityType', async (req: any, res) => {
    try {
        const response: any = await findAllContentByUserIDAndEntityType(req.user, req.params['entityType']);
        res.send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/type/:entityType', async (req: any, res) => {
    try {
        const response = await createNewContentEntry(req.user, req.params['entityType'], req.body);
        res.send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/content/:id', async (req: any, res) => {
    try {
        const response: any = await findContentByUserIDAndContentID(req.user, req.params['id']);
        res.send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/content/:id', async (req: any, res) => {
    try {
        const response: any = await updateContentEntry(req.user, req.params['id'], req.body);
        res.send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
router.delete('/content/:id', async (req: any, res) => {
    try {
        await deleteContentEntry(req.user, req.params['id']);
        res.send();
    } catch (e) {
        res.status(500).send(e.message);
    }
});

export default router;
