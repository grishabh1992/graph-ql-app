const { makeExecutableSchema } = require('graphql-tools');
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

const typeDefs = `
  type Note {
    _id: ID!
    name: String!
    date: String!
  }
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

module.exports = new makeExecutableSchema({ typeDefs, resolvers });