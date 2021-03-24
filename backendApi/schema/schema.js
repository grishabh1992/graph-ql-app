const { ApolloServer, gql } = require('apollo-server');

const {
  getNoteResolver,
  getNotesResolver,
  createNoteResolver,
  deleteNoteResolver,
  updateNoteResolver,
} = require('../resolver/resolver');
const {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
} = require('../data-access/mongo-db/connector');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Note {
    _id: ID!
    name: String!
    date: String!
  }

  type Message {
    message: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    notes: [Note]
    GetNoteQuery(_id:String!,name:String,date:String): Note
  }

  type Mutation {
    addNote(name:String!): Note
    deleteNote(_id:String!): Message
    updateNote(_id:String!, name:String!,date:String): Message
  }
`;

const resolvers = {
  Query: {
    notes: (_, args, context) => getNotesResolver(context, getNotes),
    GetNoteQuery: (_, args, context) => getNoteResolver(args, getNote),
  },
  Mutation: {
    addNote: (_, args, context) => createNoteResolver(args, createNote),
    updateNote: (_, args, context) => updateNoteResolver(args, updateNote),
    deleteNote: (_, args, context) => deleteNoteResolver(args, deleteNote),
  }
};

module.exports = { typeDefs, resolvers };