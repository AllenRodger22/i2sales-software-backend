import { Router } from 'express';

interface User {
  username: string;
  password: string;
}

const users: User[] = [];

const router = Router();

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  const existing = users.find(u => u.username === username);
  if (existing) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, password });
  return res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  return res.status(200).json({ message: 'Login successful' });
});

export { users };
export default router;
