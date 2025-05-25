import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/appConfig.js';
import { admin, db } from '../config/firebaseConfig.js';

// SIGNUP
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const userRef = db.collection('users').where('email', '==', email);
    const snapshot = await userRef.get();

    if (!snapshot.empty) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserRef = db.collection('users').doc();
    await newUserRef.set({
      id: newUserRef.id,
      name,
      email,
      password: hashedPassword,
      role: role || 'developer'
    });

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const userSnapshot = await db.collection('users').where('email', '==', email).limit(1).get();
    if (userSnapshot.empty) return res.status(401).json({ message: 'Invalid credentials' });

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: '1d' });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

// GET PROFILE
export const getProfile = async (req, res, next) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.id).get();
    if (!userDoc.exists) return res.status(404).json({ message: 'User not found' });

    const user = userDoc.data();
    delete user.password;

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// UPDATE ROLE
export const updateRole = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ message: 'Role is required' });
    }

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userRef.update({ role });
    res.json({ message: 'User role updated successfully' });
  } catch (err) {
    next(err);
  }
};
