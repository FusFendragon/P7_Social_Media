const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Database
const db = require('./config/database');

async function test () {
    try {
       await db.authenticate();
        console.log('Connecté à la base de données MySQL!');
        await db.sync({force: true})
      } catch (error) {
        console.error('Impossible de se connecter, erreur suivante :', error);
      }
}
test();

  const app = express();

  app.get('/', (req, res) => res.send('INDEX'));

  // Post routes

  app.use('/users', require('./routes/user'));
  app.use('/posts', require('./routes/post'));
  app.use('/comments', require('./routes/comment'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));