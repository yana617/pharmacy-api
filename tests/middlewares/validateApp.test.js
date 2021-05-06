const validateApp = require('../../middlewares/validateApp');

test('Should pass if app name provided', () => {
  const request = {
    body: {
      name: 'Test name',
    },
  };
  const response = {};
  const next = jest.fn();
  validateApp(request, response, next);
  expect(next).toHaveBeenCalledTimes(1);
});

test('Shouldn\'t pass if there is no app name', () => {
  const request = {};
  const response = {
    status: jest.fn().mockImplementation(() => response),
    json: jest.fn(),
  };
  const next = jest.fn();
  validateApp(request, response, next);
  expect(response.status).toHaveBeenCalledTimes(1);
  expect(response.status).toHaveBeenCalledWith(400);

  expect(response.json).toHaveBeenCalledTimes(1);
  expect(response.json).toHaveBeenCalledWith({
    success: false,
    error: 'Provide app name',
  });
});

test('Shouldn\'t pass if app name is not a string', () => {
  const request = {
    body: {
      name: 5,
    },
  };
  const response = {
    status: jest.fn().mockImplementation(() => response),
    json: jest.fn(),
  };
  const next = jest.fn();
  validateApp(request, response, next);
  expect(response.status).toHaveBeenCalledTimes(1);
  expect(response.status).toHaveBeenCalledWith(400);

  expect(response.json).toHaveBeenCalledTimes(1);
  expect(response.json).toHaveBeenCalledWith({
    success: false,
    error: 'Name must be string',
  });
});
