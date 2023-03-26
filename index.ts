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
    options: CookieOptions | any;
}

function setCookie(data: CookieData, res: e.Response) {
    if (!data.name) return;
    if (!data.value) {
        res.clearCookie(data.name);
    } else {
        res.cookie(data.name, data.value, data.options);
    }
    res.send('success');
}

declare global {
    export namespace Express {
        interface Request {
            files: any;
            fileInfo?: {
                [key: string]: {
                    name: string;
                    mimetype: string;
                    size: number;
                }
            }
        }
    }
}

app.get('/set-cookie', (req: e.Request, res: e.Response) => {
    const {name, value, ...options}: any = req.query;
    setCookie({
        name,
        value,
        options
    }, res);
});
app.use('*', (req: e.Request, res: e.Response) => {
    req.fileInfo = {};
    if ('files' in req) {
        Object.keys(req['files']).forEach((fileKey) => {
            const file = req['files'][fileKey];
            if (req.fileInfo) {
                req.fileInfo[fileKey] = {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size,
                }
            }
        });
    }
    const response = {
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        query: req.query,
        headers: req.headers,
        cookies: req.cookies,
        files: req['fileInfo'],
    }
    if (req.headers['response-type'] === 'application/json'
      || req.headers['responseType'] === 'application/json') {
        res.send(response);
    } else {
        res.render('output.ejs', response);
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('mock-n-serve is listening to port ' + (process.env.PORT || 3000));
});
