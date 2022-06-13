require('dotenv').config();
const express = require('express');
const app = express();

import * as e from 'express';

app.use(require('cors')({
    origin: true,
}));
app.use(express.json({
    limit: '500mb',
}));
app.use(require('express-fileupload')({
    limit: '500mb',
}));
app.use(require('cookie-parser')());
app.set('view engine', 'ejs');

app.use('*', (req: e.Request, res: e.Response) => {
    res.render('output.ejs', req);
});

app.listen(process.env.PORT, () => {
    console.log('mock-n-serve is listening to port ' + process.env.PORT);
});
