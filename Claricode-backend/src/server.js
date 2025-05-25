// server.js (ES Module version)

import dotenv from 'dotenv';
dotenv.config();

import app from './app.js'; // Add `.js` extension explicitly for ES Modules

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Claricode backend listening on port ${PORT}`);
});
