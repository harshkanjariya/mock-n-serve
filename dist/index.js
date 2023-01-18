"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
function setCookie(data, res) {
    res.cookie(data.name, data.value, data.options);
    res.send('success');
}
app.get('/set-cookie', (req, res) => {
    const _a = req.query, { name, value } = _a, options = __rest(_a, ["name", "value"]);
    setCookie({
        name,
        value,
        options
    }, res);
});
app.use('*', (req, res) => {
    req.fileInfo = {};
    if ('files' in req) {
        Object.keys(req['files']).forEach((fileKey) => {
            const file = req['files'][fileKey];
            if (req.fileInfo) {
                req.fileInfo[fileKey] = {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size,
                };
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
    }
    else {
        res.render('output.ejs', req);
    }
});
app.listen(process.env.PORT || 3000, () => {
    console.log('mock-n-serve is listening to port ' + (process.env.PORT || 3000));
});
