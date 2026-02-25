const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Données en dur — remplacées par PostgreSQL en exercice 3
const users = [
  { id: 1, nom: 'Alice', email: 'alice@example.com' },
  { id: 2, nom: 'Bob', email: 'bob@example.com' },
];

app.get('/', (req, res) => {
  res.json({ message: 'API opérationnelle', routes: ['/api/users', '/health'] });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`App démarrée sur le port ${PORT}`);
  });
}

module.exports = app;
