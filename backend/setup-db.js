
const { setupDatabase } = require('./config/database');
const dotenv = require('dotenv');

dotenv.config();

// Function to initialize the database with sample data
const initDatabase = async () => {
  try {
    console.log('Starting database setup...');
    console.log('Using environment variables:');
    console.log(`- DB_HOST: ${process.env.DB_HOST}`);
    console.log(`- DB_USER: ${process.env.DB_USER}`);
    console.log(`- DB_NAME: ${process.env.DB_NAME}`);
    
    await setupDatabase();
    console.log('Database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
};

initDatabase();
