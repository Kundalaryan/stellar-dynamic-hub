
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectToDatabase = async () => {
  try {
    // Test connection
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

// For initial database and tables setup
const setupDatabase = async () => {
  try {
    // Create database if it doesn't exist
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.query(`USE ${process.env.DB_NAME}`);
    
    // Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS publications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        authors TEXT NOT NULL,
        journal VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        doi VARCHAR(255) NOT NULL
      )
    `);
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        image VARCHAR(255),
        link VARCHAR(255)
      )
    `);
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        image VARCHAR(255),
        linkedin VARCHAR(255),
        twitter VARCHAR(255),
        github VARCHAR(255)
      )
    `);
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(100) NOT NULL,
        time VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        type VARCHAR(50) NOT NULL,
        registration BOOLEAN DEFAULT false
      )
    `);
    
    console.log('Database and tables created successfully');
    await connection.end();
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
};

module.exports = {
  pool,
  connectToDatabase,
  setupDatabase
};
