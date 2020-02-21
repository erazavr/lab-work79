const express = require('express');
const fileDb = require('../fileDb');
const router = express.Router();

router.get('/', async (req, res) => {
    const items = await fileDb.getItems('location');
    for (let item of items) {
        delete item.description
    }
    res.send(items)
});
router.get('/:id', async (req, res) => {
    const items = await fileDb.getItemById('location', req.params.id);
    res.send(items)
});
router.post('/', async (req, res) => {
    if (!req.body.title) {
        res.status(400).send({error: "Please, enter title"})
    } else {
        await fileDb.addItem('location',req.body);
        res.send(req.body)
    }
});
router.delete('/:id', async (req, res) => {
    const remove = await fileDb.deleteItemById('location', req.params.id, 'locationId');
    if (remove) {
        res.send("Deleted")
    } else {
        res.status(400).send({error: "This location cannot be deleted."})
    }
});




module.exports = router;