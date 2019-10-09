import request from 'supertest';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import app from '../../src/app';
import User from '../../src/app/models/User';

describe('Session', () => {
  const user = {
    name: 'test',
    email: 'user@test.com',
  };
  const password = '123456';

  beforeAll(async () => {
    const { id } = await User.create({
      ...user,
      password,
    });
    user.id = id;
  });

  it('should be able to authenticate with email and password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password,
      });

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should return a valid JWT token', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password,
      });

    const { token } = response.body;
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

    expect(decoded.id).toBe(user.id);
  });

  it('should fail in validation', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({});

    console.log(response.body);

    expect(response.status).toBe(400);
  });

  it('should return that the user does not exists', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'unauthorized@test.com',
        password,
      });

    expect(response.status).toBe(401);
  });

  it('should return password does not match', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '654321',
      });

    expect(response.status).toBe(400);
  });
});
