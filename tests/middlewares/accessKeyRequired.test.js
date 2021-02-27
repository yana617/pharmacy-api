const accessKeyRequired = require('../../middlewares/accessKeyRequired');
const App = require('../../models/app');
const { appOne, setupDatabase } = require('../fixtures/db');

beforeEach(setupDatabase);

const next = jest.fn();
const res = {
  status: jest.fn().mockImplementation(() => res),
  json: jest.fn().mockImplementation(() => res),
};
const req = {
  headers: {},
};

afterEach(() => {
  jest.clearAllMocks();
});

it('Should return error, if access-key not provided', () => {
  accessKeyRequired(req, res, next);
  expect(res.status).toHaveBeenCalledWith(400);
});

it('Should return error, if access-key wrong', async () => {
  req.headers['access-key'] = 'wrong-key';
  await accessKeyRequired(req, res, next);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    success: false,
    error: 'App with such access key not found',
  });
});

test('Should set app_id, if access-key is right', async () => {
  await new App(appOne).save();
  req.headers['access-key'] = appOne.access_key;
  await accessKeyRequired(req, res, next);
  expect(next).toHaveBeenCalled();
  expect(req.app).not.toBeNull();
});
