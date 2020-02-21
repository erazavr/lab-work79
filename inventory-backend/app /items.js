const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid')

const fileDb = require('../fileDb');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const items = await fileDb.getItems('items');
    for (let item of items) {
        delete item.image;
        delete item.description;
    }
    res.send(items)
});
router.get('/:id', async (req, res) => {
    const items = await fileDb.getItemById('items', req.params.id);
    res.send(items)
});

router.get('/category/:categoryId', async (req, res) => {
    const category = await fileDb.getItemById('categories', req.params.categoryId);
    res.send(category)
});
router.get('/location/:locationId', async (req, res) => {
    const category = await fileDb.getItemById('location', req.params.locationId);
    res.send(category)
});

router.post('/',upload.single('image'), async (req, res) => {
    const items = req.body;
    if (req.file) {
        items.image = req.file.filename
    }
    if (!req.body.title || !req.body.categoryId || !req.body.locationId) {
        res.status(400).send({error: "Please, fill all field"})
    } else {
        await fileDb.addItem('items',req.body);
        res.send(req.body)
    }
});
router.delete('/:id', async (req, res) => {
    await fileDb.deleteItemById('items', req.params.id);
    res.send("Deleted")
});




module.exports = router;