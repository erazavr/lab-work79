const express = require('express');
const cors = require('cors')
const categories = require('./app /categories');
const location = require('./app /location');
const items = require('./app /items');
const fileDb = require('./fileDb');
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/categories', categories);
app.use('/locations', location);
app.use('/items', items);
const run = async () => {
    await fileDb.init();
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};
run().catch(e => {
    console.error(e);
});