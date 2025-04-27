
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const publicationsRoutes = require('./routes/publications');
const projectsRoutes = require('./routes/projects');
const teamRoutes = require('./routes/team');
const eventsRoutes = require('./routes/events');
const { connectToDatabase } = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/publications', publicationsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/events', eventsRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Admin Panel API is running');
});

// Connect to DB and start server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
