import argon2 from 'argon2';
import { UserModel } from '../models/User.model.js';
import { signToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await argon2.hash(password);
  await UserModel.create({
    email,
    password: hashedPassword,
    role: 'user'
  });

  res.status(201).json({ message: 'User created' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findByEmail(email);
  if (!user || !(await argon2.verify(user.password, password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ id: user.id, role: user.role });

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
  });

  res.json({ message: 'Authenticated' });
};
