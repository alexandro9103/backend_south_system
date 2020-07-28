const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routerProducts = require('./routes/router.products');
const routerUsers = require('./routes/router.users');
const cors = require('cors');
dotenv.config();

require('./database/config');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routerProducts());
app.use(routerUsers());





const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 5000;
module.exports = app;
app.listen(PORT, HOST, () => {
    console.log(`The API is running at port ${PORT}`);
})