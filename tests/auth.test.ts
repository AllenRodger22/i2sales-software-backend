import request from 'supertest';
import app from '../src/app';
import { users } from '../src/routes/auth';

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    users.length = 0;
  });

  it('registers a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'john', password: 'secret' });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('rejects duplicate users', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'john', password: 'secret' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'john', password: 'secret' });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    users.length = 0;
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'john', password: 'secret' });
  });

  it('logs in with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'john', password: 'secret' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login successful');
  });

  it('rejects invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'john', password: 'wrong' });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
