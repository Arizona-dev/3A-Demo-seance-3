const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  it('retourne un message et la liste des routes', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'API opérationnelle');
    expect(res.body.routes).toContain('/api/users');
    expect(res.body.routes).toContain('/health');
  });
});

describe('GET /api/users', () => {
  it('retourne un tableau d\'utilisateurs', async () => {
    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('contient Alice et Bob', async () => {
    const res = await request(app).get('/api/users');
    const noms = res.body.map((u) => u.nom);

    expect(noms).toContain('Alice');
    expect(noms).toContain('Bob');
  });

  it('chaque utilisateur a un id, un nom et un email', async () => {
    const res = await request(app).get('/api/users');

    res.body.forEach((user) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('nom');
      expect(user).toHaveProperty('email');
    });
  });
});

describe('GET /health', () => {
  it('retourne le statut ok', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('Route inexistante', () => {
  it('retourne 404 pour une route inconnue', async () => {
    const res = await request(app).get('/inexistant');

    expect(res.statusCode).toBe(404);
  });
});
