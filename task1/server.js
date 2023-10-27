// server.js

const { ApolloServer, gql } = require('apollo-server');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('./data');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users(page: Int, pageSize: Int, sortBy: String): [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    updateUser(id: ID!, username: String, email: String, password: String): User
    deleteUser(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    users: (_, { page = 1, pageSize = 10, sortBy = 'id' }) => {
      // Apply pagination and sorting here
      const startIdx = (page - 1) * pageSize;
      const endIdx = startIdx + pageSize;
      const sortedUsers = [...getAllUsers()].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
      return sortedUsers.slice(startIdx, endIdx);
    },
    user: (_, { id }) => getUserById(id),
  },
  Mutation: {
    createUser: (_, { username, email, password }) => createUser(username, email, password),
    updateUser: (_, { id, ...rest }) => updateUser(id, rest),
    deleteUser: (_, { id }) => deleteUser(id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
