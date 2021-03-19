const { ApolloServer, gql } = require('apollo-server');

const {
  getNoteResolver,
  getNotesResolver,
  createNoteResolver,
} = require('../resolver/resolver');
const {
  getNotes,
  getNote,
  createNote
} = require('../data-access/mongo-db/connector');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Note {
    _id: ID!
    name: String!
    date: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    GetNotesQuery: [Note]
    GetNoteQuery(_id:String!,name:String,date:String): Note
  }

  type Mutation {
    addNoteMutation(name:String!): Note
  }
`;

const resolvers = {
  Query: {
    GetNotesQuery: (_, args, context) => getNotesResolver(context, getNotes),
    GetNoteQuery: (_, args, context) => getNoteResolver(args, getNote),
  },
  Mutation: {
    addNoteMutation: (_, args, context) => createNoteResolver(args, createNote),
  }
};

module.exports = { typeDefs, resolvers };