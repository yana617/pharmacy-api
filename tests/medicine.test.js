const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const Medicine = require('../models/medicine');
const App = require('../models/app');
const {
  medicineOne,
  medicineTwo,
  appOne,
  appTwo,
  setupDatabase,
} = require('./fixtures/db');

beforeEach(setupDatabase);

describe('GET /medicines request', () => {
  test('Should fail if you don\'t provide access-key', async () => {
    const response = await request(app)
      .get('/medicines')
      .expect(400);

    expect(response.error).not.toBeNull();
  });

  test('Should return correct medicines, if authorized', async () => {
    await new App(appOne).save();
    await new App(appTwo).save();
    await new Medicine(medicineOne).save();
    await new Medicine(medicineTwo).save();

    const response = await request(app)
      .get('/medicines')
      .set('access-key', appOne.access_key)
      .expect(200);

    const { medicines } = response.body;
    expect(medicines.length).toBe(1);
    expect(medicines[0].name).toBe(medicineOne.name);
  });

  describe('pagination', () => {
    test('Should return all medicines', async () => {
      await new App(appOne).save();
      await new Medicine(medicineOne).save();
      const medicineThree = { ...medicineTwo, app_id: medicineOne.app_id };
      await new Medicine(medicineThree).save();

      const response = await request(app)
        .get('/medicines')
        .set('access-key', appOne.access_key)
        .expect(200);

      const { medicines } = response.body;
      expect(medicines.length).toBe(2);
    });
    test('Should return first one medicine', async () => {
      const medicineThree = { ...medicineTwo, app_id: medicineOne.app_id };
      await new App(appOne).save();
      await new Medicine(medicineOne).save();
      await new Medicine(medicineThree).save();

      const limit = 1;
      const response = await request(app)
        .get(`/medicines?limit=${limit}`)
        .set('access-key', appOne.access_key)
        .expect(200);

      const { medicines } = response.body;
      expect(medicines.length).toBe(1);
      expect(medicines[0].name).toBe(medicineOne.name);
    });
    test('Should return second one medicine', async () => {
      const medicineThree = { ...medicineTwo, app_id: medicineOne.app_id };
      await new App(appOne).save();
      await new Medicine(medicineOne).save();
      await new Medicine(medicineThree).save();

      const limit = 1;
      const skip = 1;
      const response = await request(app)
        .get(`/medicines?limit=${limit}&skip=${skip}`)
        .set('access-key', appOne.access_key)
        .expect(200);

      const { medicines } = response.body;
      expect(medicines.length).toBe(1);
      expect(medicines[0].name).toBe(medicineThree.name);
    });
  });
});

describe('GET /medicines/:id request', () => {
  test('Should fail if you don\'t provide access-key', async () => {
    const response = await request(app)
      .get(`/medicines/${medicineOne._id}`)
      .expect(400);

    expect(response.error).not.toBeNull();
  });

  test('Should fail if there is no medicine by such id', async () => {
    const newId = new mongoose.Types.ObjectId();
    await new App(appOne).save();
    const response = await request(app)
      .get(`/medicines/${newId}`)
      .set('access-key', appOne.access_key)
      .expect(400);

    expect(response.error).not.toBeNull();
  });

  test('Should fail if medicine exists, but related to another app', async () => {
    await new App(appOne).save();
    await new App(appTwo).save();
    await new Medicine(medicineOne).save();
    const response = await request(app)
      .get(`/medicines/${medicineOne._id}`)
      .set('access-key', appTwo.access_key)
      .expect(400);

    expect(response.error).not.toBeNull();
  });

  test('Should return correct medicine, if authorized and app&medicine exists', async () => {
    await new App(appOne).save();
    await new Medicine(medicineOne).save();

    const response = await request(app)
      .get(`/medicines/${medicineOne._id}`)
      .set('access-key', appOne.access_key)
      .expect(200);

    const { medicine } = response.body;
    expect(medicine.name).toBe(medicineOne.name);
  });
});

describe('POST /medicines request', () => {
  test('Should fail if you don\'t provide access-key', async () => {
    const response = await request(app)
      .post('/medicines')
      .expect(400);

    expect(response.error).not.toBeNull();
  });

  test('Should fail if body is not provided', async () => {
    await new App(appOne).save();
    const response = await request(app)
      .post('/medicines')
      .set('access-key', appOne.access_key)
      .expect(400);

    expect(response.error).not.toBeNull();
  });

  test('Should fail if name field is not provided', async () => {
    await new App(appOne).save();
    const testMedicine = { ...medicineOne, name: undefined };
    const response = await request(app)
      .post('/medicines')
      .set('access-key', appOne.access_key)
      .send(testMedicine)
      .expect(400);

    expect(response.error).not.toBeNull();
  });

  test('Should return medicine, if all fields were provided', async () => {
    await new App(appOne).save();
    const response = await request(app)
      .post('/medicines')
      .set('access-key', appOne.access_key)
      .send(medicineOne)
      .expect(200);

    const { medicine } = response.body;
    expect(medicine.name).toBe(medicineOne.name);
  });
});
