const request = require('supertest');
const { response } = require('../../app');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    mongoDisconnect();
  });

  describe('Test GET /launches', () => {
    test('It should respond with 200 sucess', async () => {
      await request(app).get('/launches').expect('Content-Type', /json/).expect(200);
    });
  });
  describe('Test POST /launches', () => {
    const completeLaunchData = {
      mission: 'Keppler Exploration X',
      rocket: 'Explorer IS1',
      launchDate: 'Decembe 27, 2030',
      target: 'Kepler-442 b',
    };
    const completeLaunchWithdoutDate = {
      mission: 'Keppler Exploration X',
      rocket: 'Explorer IS1',
      target: 'Kepler-442 b',
    };
    const completeLaunchWithInvalidDate = {
      mission: 'Keppler Exploration X',
      rocket: 'Explorer IS1',
      launchDate: 'zeus',
      target: 'Kepler-442 b',
    };
    test('It should respond with 201 sucess', async () => {
      const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(completeLaunchWithdoutDate);
    });

    test('It should catch missing required properties', async () => {
      const response = await request(app)
        .post('/launches')
        .send(completeLaunchWithdoutDate)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({ error: 'Missing required launch property' });
    });
    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post('/launches')
        .send(completeLaunchWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({ error: 'Invalid launch date' });
    });
  });
});
