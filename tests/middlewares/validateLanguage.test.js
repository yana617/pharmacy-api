const validateLanguage = require('../../middlewares/validateLanguage');

const res = {
  status: jest.fn().mockImplementation(() => res),
  json: jest.fn().mockImplementation(() => res),
};
const next = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

it('Should fail without lang query', () => {
  const req = {};
  validateLanguage(req, res, next);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    success: false,
    error: 'Provide lang query',
  });
});

it('Should fail with unsupported language', async () => {
  const req = {
    query: {
      lang: 'be',
    },
  };
  validateLanguage(req, res, next);
  expect(res.status).toHaveBeenCalledWith(400);
});
