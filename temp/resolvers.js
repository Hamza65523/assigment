const users = []; // Assume you have a users array for now

const resolvers = {
  Query: {
    users: (parent, { page = 1, limit = 10, sortBy = 'username' }) => {
      // Implement pagination and sorting here
      // Example: return users.slice((page - 1) * limit, page * limit);
      return users;
    },
    user: (parent, { id }) => users.find(user => user.id === id),
  },
  Mutation: {
    createUser: (parent, args) => {
      // Implement user creation logic here
      const newUser = { id: users.length + 1, ...args };
      users.push(newUser);
      return newUser;
    },
    updateUser: (parent, { id, ...args }) => {
      // Implement user update logic here
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) throw new Error('User not found');
      users[userIndex] = { ...users[userIndex], ...args };
      return users[userIndex];
    },
    deleteUser: (parent, { id }) => {
      // Implement user deletion logic here
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) throw new Error('User not found');
      const deletedUser = users.splice(userIndex, 1)[0];
      return deletedUser;
    },
  },
};

module.exports = resolvers;
