const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const CookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'rfijirj3ei4iru9';

app.use(express.json());
app.use(CookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res) => {
    res.json('test ok');
});

app.post('/register', async (req,res) => {
    const {name,email,password} = req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.json({name, email, password });
    }catch(e){
        res.status(422).json(e);
    }
});

app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const UserDoc = await User.findOne({email});
    if (UserDoc) {
        const passOk = bcrypt.compareSync(password, UserDoc.password);
        if(passOk) {
            res.cookie('id', UserDoc.id).json(UserDoc);
        } else {
            res.status(400).json("pass not ok");
        }
    } else {
        res.status(400).json("not found"); 
    }
});

app.get('/profile', async (req,res) => {
    const cookie = req.cookies;
    //res.json(cookie.id != null ? "è diverso":"work");
    if (cookie.id != null && cookie.id != '') {
        try{
            const {name,email,_id} = await User.findById(cookie.id);
            res.json({name,email,_id});
        } catch(e) {
            res.status(200).json(null);
        }
    }
});

app.post('/logout', (req,res) => {
    res.cookie('id', '').json();
});

app.post('/upload-by-link', async (req,res) => {
    const {link} = req.body;
    const newName = "photo" + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
})

app.listen(4000);