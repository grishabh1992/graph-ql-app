const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const app = express();
// store config variables in dotenv
require('dotenv').config();
schema = require('./schema/schema'); // uncomment this for MONGODB

// ****** Set up default mongoose connection START ****** //
const mongoose = require('mongoose');
// var mongoDB = process.env.mongoDBMLABURL; // cloud hosted MongoDB
var mongoDB = process.env.mongoDBLocalURL; // locally hosted MongoDB
mongoose.connect(mongoDB);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('conneted to MONGODB- ElishERP database');
});
// ****** Set up default mongoose connection END ****** //

// ****** allow cross-origin requests code START ****** //
app.use(cors());
// ****** allow cross-origin requests code END ****** //

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: false
}));
app.use('/', (req, res) => res.send("Welcome ElishERP User"));
app.listen(process.env.PORT, () => console.log('Elish Enterprise Server is ready on localhost:' + process.env.PORT));
