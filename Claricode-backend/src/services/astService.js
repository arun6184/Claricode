// astService.js
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const extractMetadata = (filePath) => {
  return new Promise((resolve, reject) => {
    const pythonPath = path.resolve(__dirname, '../../python-processor/metadata_extractor.py');

    const proc = spawn('python3', [pythonPath, filePath]);

    let data = '';
    let error = '';

    proc.stdout.on('data', chunk => {
      data += chunk.toString();
    });

    proc.stderr.on('data', chunk => {
      error += chunk.toString();
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(error));
      }
      try {
        const metadata = JSON.parse(data);
        resolve(metadata);
      } catch (err) {
        reject(err);
      }
    });
  });
};
