import db from '../config/firebaseConfig.js';
import bcrypt from 'bcryptjs';

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  await db.collection('users').doc(userData.email).set({
    ...userData,
    password: hashedPassword,
  });
};

export const getUserByEmail = async (email) => {
  const userRef = db.collection('users').doc(email);
  const doc = await userRef.get();
  if (!doc.exists) return null;
  return doc.data();
};
