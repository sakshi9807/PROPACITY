const pool = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async createUser(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
      const values = [username, email, hashedPassword];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      throw new Error('Failed to create user');
    }
  }

  static async findUserByUsername(username) {
    try {
      const query = 'SELECT * FROM users WHERE username = $1';
      const values = [username];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      throw new Error('Failed to find user by username');
    }
  }
}

module.exports = User;
