require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const Ngo = require("./Schema/NGOSchema")
const cors = require("cors")
const port = process.env.PORT || 3000

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const uri = process.env.MONGODB_URL

app.get("/ngos", (req, res) => {
    if (5>4) {
        Ngo.find()
            .then(users => res.json(users))
            .catch(err => res.status(500).json({ error: err.message }));
    } else {
        res.status(403).json({ error: "You are Not A Verified Person to Access Database" })
    }
})

app.post("/ngos/addnew", (req, res) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token === process.env.ADMIN_ACCESSTOKEN) {
            const newNgo = new Ngo({
                name: req.body.name,
                email: req.body.email,
                img1: req.body.img1,
                img2: req.body.img2,
                city: req.body.city,
                phone: req.body.phone,
                website: req.body.website
            })

            newNgo.save()
                .then(() => res.status(201).json(newNgo))
                .catch(err => res.status(500).json({ error: err.message }));
        }
        else {
            res.status(403).json({ error: "You are Not A Verified Person to Edit Database" })
        }
    } else {
        res.status(403).json({ error: "You are Not A Verified Person to Edit Database" })
    }

})

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(port, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => console.error(err));
