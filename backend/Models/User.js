const pool = require('../db');

// Find a user by username
const findUserByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM Clients WHERE Username = ?', [username]);
  return rows[0];
};

// Create a new user
const createUser = async (username, password) => {
  const [result] = await pool.query('INSERT INTO Clients (Username, Password) VALUES (?, ?)', [username, password]);
  return { id: result.insertId, username }; // Return new user's ID and username
};

module.exports = { findUserByUsername, createUser };
