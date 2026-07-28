/**
 * Unit tests for authController (registerUser + loginUser)
 *
 * All external dependencies (User model, generateToken) are mocked so
 * no database connection or JWT secret is required to run these tests.
 */

// ── Mock dependencies before importing the controller ───────────────────────
jest.mock('../models/User');
jest.mock('../utils/generateToken');

const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');
const { registerUser, loginUser } = require('../controllers/authController');

// ── Helper: build minimal Express req/res mock objects ───────────────────────
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  return res;
};

// ── registerUser ─────────────────────────────────────────────────────────────
describe('registerUser', () => {
  beforeEach(() => jest.clearAllMocks());

  test('returns 400 if user already exists', async () => {
    User.findOne.mockResolvedValue({ _id: 'existing-id', email: 'test@test.com' });

    const req = { body: { name: 'Alice', email: 'test@test.com', password: 'pass123' } };
    const res = mockRes();

    await registerUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@test.com' });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
  });

  test('returns 201 with user data and token on success', async () => {
    User.findOne.mockResolvedValue(null); // no existing user
    User.create.mockResolvedValue({
      _id: 'new-user-id',
      name: 'Alice',
      email: 'alice@example.com',
    });
    generateToken.mockReturnValue('mocked.jwt.token');

    const req = { body: { name: 'Alice', email: 'alice@example.com', password: 'pass123' } };
    const res = mockRes();

    await registerUser(req, res);

    expect(User.create).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'pass123',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: 'new-user-id',
      name: 'Alice',
      email: 'alice@example.com',
      token: 'mocked.jwt.token',
    });
  });

  test('returns 400 if User.create returns falsy', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(null);

    const req = { body: { name: 'Alice', email: 'alice@example.com', password: 'pass123' } };
    const res = mockRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user data' });
  });

  test('returns 500 on unexpected error', async () => {
    User.findOne.mockRejectedValue(new Error('DB connection error'));

    const req = { body: { name: 'Alice', email: 'alice@example.com', password: 'pass123' } };
    const res = mockRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'DB connection error' });
  });
});

// ── loginUser ────────────────────────────────────────────────────────────────
describe('loginUser', () => {
  beforeEach(() => jest.clearAllMocks());

  test('returns 401 if user not found', async () => {
    User.findOne.mockResolvedValue(null);

    const req = { body: { email: 'nobody@example.com', password: 'pass123' } };
    const res = mockRes();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });

  test('returns 401 if password does not match', async () => {
    const fakeUser = {
      _id: 'user-id',
      name: 'Bob',
      email: 'bob@example.com',
      matchPassword: jest.fn().mockResolvedValue(false),
    };
    User.findOne.mockResolvedValue(fakeUser);

    const req = { body: { email: 'bob@example.com', password: 'wrongpassword' } };
    const res = mockRes();

    await loginUser(req, res);

    expect(fakeUser.matchPassword).toHaveBeenCalledWith('wrongpassword');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });

  test('returns 200 with user data and token on successful login', async () => {
    const fakeUser = {
      _id: 'user-id',
      name: 'Bob',
      email: 'bob@example.com',
      matchPassword: jest.fn().mockResolvedValue(true),
    };
    User.findOne.mockResolvedValue(fakeUser);
    generateToken.mockReturnValue('valid.jwt.token');

    const req = { body: { email: 'bob@example.com', password: 'correctpassword' } };
    const res = mockRes();

    await loginUser(req, res);

    expect(generateToken).toHaveBeenCalledWith('user-id');
    expect(res.json).toHaveBeenCalledWith({
      _id: 'user-id',
      name: 'Bob',
      email: 'bob@example.com',
      token: 'valid.jwt.token',
    });
  });

  test('returns 500 on unexpected error', async () => {
    User.findOne.mockRejectedValue(new Error('Timeout'));

    const req = { body: { email: 'bob@example.com', password: 'pass' } };
    const res = mockRes();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Timeout' });
  });
});
