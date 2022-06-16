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
        options,
    }, res);
});
app.use('*', (req: e.Request, res: e.Response) => {
    if ('files' in req) {
        req.fileInfo = {};
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
    if (req.headers['response-type'] === 'application/json') {
        res.send({
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies,
            files: req['fileInfo'],
        });
    } else {
        res.render('output.ejs', req);
    }
});

app.listen(process.env.PORT, () => {
    console.log('mock-n-serve is listening to port ' + process.env.PORT);
});
