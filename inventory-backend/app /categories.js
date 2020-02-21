const express = require('express');
const fileDb = require('../fileDb');
const router = express.Router();

router.get('/', async (req, res) => {
    const items = await fileDb.getItems('categories');
    for (let item of items) {
        delete item.description
    }
    res.send(items)
});
router.get('/:id', async (req, res) => {
    const items = await fileDb.getItemById('categories', req.params.id);
    res.send(items)
});
router.post('/', async (req, res) => {
    if (!req.body.title) {
        res.status(400).send({error: "Please, enter title"})
    } else {
        await fileDb.addItem('categories',req.body);
        res.send(req.body)
    }
});
router.delete('/:id', async (req, res) => {
    const remove = await fileDb.deleteItemById('categories', req.params.id, 'categoryId');
    if (remove) {
        res.send("Deleted")
    } else {
        res.status(400).send({error: "This category cannot be deleted."})
    }

});




module.exports = router;