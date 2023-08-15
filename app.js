const express = require('express');
const chalk = require('chalk'); //color code log messages
const debug = require('debug')('app'); //If you deploy something to prod, and you have debug, its not going to spit stuff out on the console
const morgan = require('morgan');
const path = require('path');


const PORT = process.env.PORT || 3000; //Whats coming out of the env. Everything that nodemon dropped in, this will be pull out
const app = express();


const sessionsRouter = require('./src/routers/sessionRouter');
const adminRouter = require('./src/routers/adminRouter');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/'))); //If index.html is found first, response is returned, does not execute other requests

app.set('views','./src/views');//Telling express where to find the views for templates associated with EJS
app.set('view engine','ejs'); //Telling express what the view engine is

app.use('/sessions', sessionsRouter)
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.render('index',{title: 'Globomantics', data: ['a','b','c']})
}); //Get request to / in URL, when express gets the get request with a / it will execute this function 

//Con - Get unwindly Solution - Encapsualte the code with router middleware
//Router holds all the code dealing with a sessions route

app.listen(PORT, () => { //Most common is portname, callback func
    debug(`Listening on port ${chalk.green(PORT)}`);
});


//Notes
//DEBUG=* for everything
//DEBUG=app listen to messages for app
