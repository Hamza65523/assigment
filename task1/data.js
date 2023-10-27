// data.js

let users = [
    { id: '1', username: 'john_doe', email: 'john@example.com', password: 'password123' },
    { id: '2', username: 'jane_doe', email: 'jane@example.com', password: 'password456' },
    // Add more users if needed
  ];
  
  function getAllUsers() {
    return users;
  }
  
  function getUserById(id) {
    return users.find(user => user.id === id);
  }
  
  function createUser(username, email, password) {
    const newUser = { id: (users.length + 1).toString(), username, email, password };
    users.push(newUser);
    return newUser;
  }
  
  function updateUser(id, updatedUser) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      return users[index];
    }
    return null;
  }
  
  function deleteUser(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      const deletedUser = users[index];
      users.splice(index, 1);
      return deletedUser;
    }
    return null;
  }
  
  module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
  