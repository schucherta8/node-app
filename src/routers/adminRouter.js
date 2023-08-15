const express = require('express');
const sessions = require('../data/sessions.json');
const debug = require('debug')('app:adminRouter'); 
const { MongoClient } = require('mongodb');


const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
    const url = 'mongodb+srv://aschuchert:<tMSPQkaASNCm0BK6>@globomantics.igwprmu.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'globomantics';
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to mongo DB');

            const db = client.db(dbName);
            
            debug('Sending Data')
            const  response = await db.collection('sessions').insertMany(sessions);
            debug('Data sent')
            res.json(response);
        } catch(error) {
            debug(error.stack);
        }
    }());
    //res.send('Admin Router done')
});

module.exports = adminRouter;