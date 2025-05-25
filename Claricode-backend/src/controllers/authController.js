import * as authService from '../services/authService.js';

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.createUser(email, password);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await authService.loginUser(email);
    res.status(200).json({ message: "Login successful", uid: user.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
