import {CookieOptions} from "express";
import * as e from 'express';

require('dotenv').config();
const express = require('express');
const app = express();


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

type CookieData = {
    name: string;
    value: string;
    options: CookieOptions;
}

function setCookie(data: CookieData, res: e.Response) {
    res.cookie(data.name, data.value, data.options);
    res.send('success');
}

app.get('/set-cookie', (req: e.Request, res: e.Response) => {
    const {name, value, ...options}: any = req.query;
    setCookie({
        name,
        value,
        options,
    }, res);
});
app.use('*', (req: e.Request, res: e.Response) => {
    if (req.headers['response-type'] === 'application/json') {
        res.send({
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies,
        });
    } else {
        res.render('output.ejs', req);
    }
});

app.listen(process.env.PORT, () => {
    console.log('mock-n-serve is listening to port ' + process.env.PORT);
});
