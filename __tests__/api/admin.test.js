const request = require('supertest');
const app = require('../../server/app');

describe('POST /api/admin/register', () => {
  test('should return status code 200', async () => {
    const response = await request(app).post('/api/admin/register').send({
      username: 'febriadji',
      email: 'iamfebriadji@gmail.com',
      password: 'febri',
    });

    expect(response.statusCode).toBe(200);
  });
});

describe('POST /api/admin/login', () => {
  test('should return status code 200', async () => {
    const response = await request(app).post('/api/admin/login').send({
      nameOrEmail: 'febriadji',
      password: 'febri',
    });

    expect(response.statusCode).toBe(200);
  });
});

describe('DELETE /api/admin/delete', () => {
  test('should return status code 200', async () => {
    const id = '613b73eadaa03fe305fd56fd';
    const response = await request(app).delete('/api/admin/delete').query(id);

    expect(response.statusCode).toBe(200);
  });
});
