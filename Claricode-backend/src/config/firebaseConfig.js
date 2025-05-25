// src/config/firebaseConfig.js
import admin from 'firebase-admin';
import fs from 'fs';

// Resolve the path to your serviceAccountKey.json file
const serviceAccountPath = new URL('../../serviceAccountKey.json', import.meta.url);

// Read the service account JSON file synchronously
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firestore instance
const db = admin.firestore();

export { admin, db };
