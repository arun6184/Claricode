import axios from 'axios';
import config from '../config/appConfig.js';

const GITHUB_API_BASE = 'https://api.github.com';

export const getRepoContents = async (owner, repo, path = '') => {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`;
  const headers = {};

  if (config.githubToken) {
    headers.Authorization = `token ${config.githubToken}`;
  }

  const response = await axios.get(url, { headers });
  return response.data;
};

export const getFileContent = async (owner, repo, filePath) => {
  const contentData = await getRepoContents(owner, repo, filePath);
  if (contentData.encoding === 'base64') {
    const buff = Buffer.from(contentData.content, 'base64');
    return buff.toString('utf-8');
  }
  return contentData.content;
};
