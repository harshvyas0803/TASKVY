import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Check if a user with this email already exists.
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Hash the password with a cost factor of 12.
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Create the new user in the database using the hashed password.
    const newUser = await User.create({ username, email, password: hashedPassword });

    // 4. Generate a JWT token that includes the new user's ID.
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

    // 5. Set the token as an HTTP-only cookie.
    res.cookie('token', token, {
      httpOnly: true,                           // Not accessible via JavaScript, protecting from XSS.
      secure: process.env.NODE_ENV === 'production', // Only sent over HTTPS in production.
      sameSite: 'strict',                         // Helps protect against CSRF attacks.
      maxAge: 3600000,                            // Cookie expires in 1 hour (in milliseconds).
    });

    // 6. Send a successful response (201 Created) with a message and username.
    return res.status(201).json({ message: 'User created successfully', username: newUser.username });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Find the user by email in the database.
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // 2. Compare the provided password with the stored hashed password.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Generate a JWT token valid for 2 days.
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2d' });

    // 4. Set the token as an HTTP-only cookie.
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds.
    });

    // 5. Respond with a successful message and the username.
    return res.status(200).json({ message: 'Login successful', user: user.username });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
