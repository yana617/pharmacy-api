const validateMedicine = require('../../middlewares/validateMedicine');
const { medicineOne } = require('../fixtures/db');
const { MEDICINES_TYPES, MEDICINES_CLASSES } = require('../../db/constants');

test('Should pass if all fields are provided', () => {
  const request = {
    body: medicineOne,
  };
  const response = {};
  const next = jest.fn();
  validateMedicine(request, response, next);
  expect(next).toHaveBeenCalledTimes(1);
});

test('Shouldn\'t pass if there is no request body', () => {
  const request = {};
  const response = {
    status: jest.fn().mockImplementation(() => response),
    json: jest.fn(),
  };
  const next = jest.fn();
  validateMedicine(request, response, next);
  expect(response.status).toHaveBeenCalledTimes(1);
  expect(response.status).toHaveBeenCalledWith(400);

  expect(response.json).toHaveBeenCalledTimes(1);
});

test('Shouldn\'t pass if there is no medicine\'s name', () => {
  const request = {
    body: {
      ...medicineOne,
      name: undefined,
    },
  };
  const response = {
    status: jest.fn().mockImplementation(() => response),
    json: jest.fn(),
  };
  const next = jest.fn();
  validateMedicine(request, response, next);
  expect(response.status).toHaveBeenCalledTimes(1);
  expect(response.status).toHaveBeenCalledWith(400);

  expect(response.json).toHaveBeenCalledTimes(1);
  expect(response.json).toHaveBeenCalledWith({
    success: false,
    error: 'Provide medicine\'s name fields',
  });
});

test('Shouldn\'t pass if medicine\'s class is unsupported', () => {
  const request = {
    body: {
      ...medicineOne,
      class: 'my-class',
    },
  };
  const response = {
    status: jest.fn().mockImplementation(() => response),
    json: jest.fn(),
  };
  const next = jest.fn();
  validateMedicine(request, response, next);
  expect(response.status).toHaveBeenCalledTimes(1);
  expect(response.status).toHaveBeenCalledWith(400);

  expect(response.json).toHaveBeenCalledTimes(1);
  expect(response.json).toHaveBeenCalledWith({
    success: false,
    error: `Unsupported class of medicine. Allowed: ${MEDICINES_CLASSES.join(', ')}`,
  });
});

test('Shouldn\'t pass if medicine\'s type is unsupported', () => {
  const request = {
    body: {
      ...medicineOne,
      type: 'my-type',
    },
  };
  const response = {
    status: jest.fn().mockImplementation(() => response),
    json: jest.fn(),
  };
  const next = jest.fn();
  validateMedicine(request, response, next);
  expect(response.status).toHaveBeenCalledTimes(1);
  expect(response.status).toHaveBeenCalledWith(400);

  expect(response.json).toHaveBeenCalledTimes(1);
  expect(response.json).toHaveBeenCalledWith({
    success: false,
    error: `Unsupported type of medicine. Allowed: ${MEDICINES_TYPES.join(', ')}`,
  });
});
