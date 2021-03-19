const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const app = express();
require('dotenv').config();
schema = require('./schema/schema');

const mongoose = require('mongoose');
var mongoDB = process.env.mongoDBURL;
mongoose.connect(mongoDB);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('conneted to MONGODB');
});
app.use(cors());

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: false
}));
app.use('/', (req, res) => res.send("Welcome to GraphQL"));
app.listen(process.env.PORT, () => console.log('Server is ready on localhost:' + process.env.PORT));
