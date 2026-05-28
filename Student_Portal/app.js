import express from 'express';

import studentRoutes from './routes/studentRoutes.js';

const app = express();

app.use(express.json());

app.use('/api', studentRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});