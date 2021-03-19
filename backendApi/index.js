const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

require('dotenv').config();
const { typeDefs, resolvers } = require('./schema/schema');


const mongoose = require('mongoose');
const mongoDB = process.env.mongoDBURL;
mongoose.connect(mongoDB);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('conneted to MONGODB');
});

const app = express();
app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// bind express with graphql
server.applyMiddleware({ app, path: '/graphql' });

app.use('/', (req, res) => res.send("Welcome GraphQL Example"));
app.listen(process.env.PORT, () => console.log('Server is ready on localhost:' + process.env.PORT));
