const authRequired = require('../../middlewares/authRequired');

test('Should pass if authorized', () => {
  const requestAuthorized = {
    isAuthenticated: jest.fn().mockImplementation(() => true),
  };
  const response = {};
  const next = jest.fn();
  authRequired(requestAuthorized, response, next);
  expect(next).toHaveBeenCalledTimes(1);
});

test('Shouldn\'t pass if unauthorized', () => {
  const requestAuthorized = {
    isAuthenticated: jest.fn().mockImplementation(() => false),
  };
  const response = {
    status: jest.fn().mockImplementation(() => response),
    json: jest.fn(),
  };
  const next = jest.fn();
  authRequired(requestAuthorized, response, next);
  expect(response.status).toHaveBeenCalledTimes(1);
  expect(response.status).toHaveBeenCalledWith(401);

  expect(response.json).toHaveBeenCalledTimes(1);
  expect(response.json).toHaveBeenCalledWith({
    success: false,
    error: 'Unauthorized',
  });
});
