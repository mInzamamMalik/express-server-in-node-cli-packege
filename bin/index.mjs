#!/usr/bin/env node


import express, { response } from 'express';
import cors from "cors";
import path  from 'path';

const __dirname = path.resolve();

const app = express()
app.use(express.json())
app.use(cors())

var posts = [
    { text: "some post 0" },
    { text: "some post 1" },
    { text: "some post2" }
];


app.use('/', express.static(path.join(__dirname, './chatapp/build')))

app.get('/api/post/:id', (req, res) => {

    const id = Number(req.params.id);

    res.send(posts[id]);
})
app.get('/api/posts', (req, res) => {
    res.send(posts);
})

app.post('/api/post', (req, res) => {

    posts.push(req.body);

    res.send(`your post is saved 🥳 now we have ${posts.length} posts`)
})
app.put('/api/post', (req, res) => {
    res.send('I am Express.js server')
})
app.delete('/api/post', (req, res) => {
    res.send('I am Express.js server')
})

app.get("/**", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./chatapp/build/index.html"))
    // res.redirect("/")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})


// https://devcenter.heroku.com/articles/getting-started-with-nodejs