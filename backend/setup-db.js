
const { setupDatabase } = require('./config/database');
const dotenv = require('dotenv');

dotenv.config();

// Function to initialize the database with sample data
const initDatabase = async () => {
  try {
    await setupDatabase();
    console.log('Database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
};

initDatabase();
