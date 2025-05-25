import admin from 'firebase-admin';

// Initialize only if not already initialized
if (!admin.apps.length) {
  const serviceAccount = await import('../../serviceAccountKey.json', {
    assert: { type: 'json' }
  });

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default)
  });
}

// Middleware to authenticate Firebase user
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = { id: decodedToken.uid, email: decodedToken.email };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token', error: err.message });
  }
};

export default authenticate;
