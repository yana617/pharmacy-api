const request = require('supertest');

const app = require('../app');
const App = require('../models/app');
const { translates } = require('../db/translates');
const { appOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should return correct medicinesTypes RU translates', async () => {
  await new App(appOne).save();
  const response = await request(app)
    .get('/translates/medicinesTypes?lang=ru')
    .set('access-key', appOne.access_key)
    .expect(200);

  const { collection } = response.body;
  expect(collection).not.toBeNull();
  expect(collection).toEqual(translates.medicinesTypes.ru);
});

test('Should return correct medicinesTypes EN translates', async () => {
  await new App(appOne).save();
  const response = await request(app)
    .get('/translates/medicinesTypes?lang=en')
    .set('access-key', appOne.access_key)
    .expect(200);

  const { collection } = response.body;
  expect(collection).not.toBeNull();
  expect(collection).toEqual(translates.medicinesTypes.en);
});

test('Should return correct medicinesClasses RU translates', async () => {
  await new App(appOne).save();
  const response = await request(app)
    .get('/translates/medicinesClasses?lang=ru')
    .set('access-key', appOne.access_key)
    .expect(200);

  const { collection } = response.body;
  expect(collection).not.toBeNull();
  expect(collection).toEqual(translates.medicinesClasses.ru);
});

test('Should fail without lang', async () => {
  await new App(appOne).save();
  const response = await request(app)
    .get('/translates/medicinesTypes')
    .set('access-key', appOne.access_key)
    .expect(400);

  expect(response.error).not.toBeNull();
  const { error } = response.body;
  expect(error).toBe('Provide lang query');
});

test('Should fail with unsupported lang', async () => {
  await new App(appOne).save();
  const response = await request(app)
    .get('/translates/medicinesTypes?lang=be')
    .set('access-key', appOne.access_key)
    .expect(400);

  expect(response.error).not.toBeNull();
  const { error } = response.body;
  expect(error).toEqual(expect.stringMatching(/This language is not supported/));
});

test('Should fail with unsupported collection', async () => {
  await new App(appOne).save();
  const response = await request(app)
    .get('/translates/unsupportedCollection?lang=ru')
    .set('access-key', appOne.access_key)
    .expect(400);

  expect(response.error).not.toBeNull();
  const { error } = response.body;
  expect(error).toBe('Unsupported collection');
});
