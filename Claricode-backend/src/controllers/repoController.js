import path from 'path';
import fs from 'fs';
import CodeMetadata from '../models/CodeMetadata.js';
import { extractMetadata } from '../services/astService.js';

const uploadCodebase = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'File is required' });

    const filePath = path.resolve(req.file.path);
    const metadata = await extractMetadata(filePath);

    const record = new CodeMetadata({
      userId: req.user.id,
      repoName: req.file.originalname,
      files: metadata,
    });

    await record.save();
    fs.unlinkSync(filePath);

    res.json({ message: 'Codebase uploaded and metadata extracted', metadata });
  } catch (err) {
    next(err);
  }
};

export default {
  uploadCodebase,
};
