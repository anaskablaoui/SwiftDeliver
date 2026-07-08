const express = require('express');
const app = express();

const db = require('./models');

db.sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        app.listen(3000, () => {
            console.log('server running on port 3000');
        });
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });