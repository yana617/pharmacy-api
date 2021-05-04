const request = require('supertest');

const app = require('../app');
const Admin = require('../models/admin');
const App = require('../models/app');
const {
  adminOne,
  adminTwo,
  appOne,
  appTwo,
  setupDatabase,
} = require('./fixtures/db');
const getConnectCookie = require('./helpers/getConnectCookie');

beforeEach(setupDatabase);

describe('GET /apps request', () => {
  test('Should return 401, if unauthorized', async () => {
    const response = await request(app)
      .get('/apps')
      .expect(401);

    expect(response.error).not.toBeNull();
  });

  test('Should return correct apps, if authorized', async () => {
    await new Admin(adminOne).save();
    await new Admin(adminTwo).save();
    await new App(appOne).save();
    await new App(appTwo).save();

    const connectCookie = await getConnectCookie(adminOne);

    const response = await request(app)
      .get('/apps')
      .set('cookie', connectCookie)
      .expect(200);

    const { apps } = response.body;
    expect(apps.length).toBe(1);
    expect(apps[0].name).toBe(appOne.name);
  });
});

describe('GET /app/:id request', () => {
  test('Should return 401, if unauthorized', async () => {
    const response = await request(app)
      .get('/apps/1')
      .expect(401);

    expect(response.error).not.toBeNull();
  });

  test('Should return correct app, if authorized', async () => {
    await new Admin(adminOne).save();
    await new App(appOne).save();

    const connectCookie = await getConnectCookie(adminOne);

    const response = await request(app)
      .get(`/apps/${appOne._id}`)
      .set('cookie', connectCookie)
      .expect(200);

    const { app: appResponse } = response.body;
    expect(appResponse.name).toBe(appOne.name);
  });

  test('Should return error, if app not found', async () => {
    await new Admin(adminOne).save();

    const connectCookie = await getConnectCookie(adminOne);

    const response = await request(app)
      .get(`/apps/${appOne._id}`)
      .set('cookie', connectCookie)
      .expect(400);

    expect(response.error).not.toBeNull();
    expect(response.body.error).toBe('App not found.');
  });

  test('Should return error, if app is not assigned to current admin', async () => {
    await new Admin(adminOne).save();
    await new App(appTwo).save();

    const connectCookie = await getConnectCookie(adminOne);

    const response = await request(app)
      .get(`/apps/${appTwo._id}`)
      .set('cookie', connectCookie)
      .expect(400);

    expect(response.error).not.toBeNull();
    expect(response.body.error).toBe('This app is not assigned to you.');
  });
});
