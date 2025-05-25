import ragService from '../services/ragService.mjs';
import QueryLog from '../models/QueryLog.js';

export const handleQuery = async (req, res, next) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ message: 'Query is required' });

    const response = await ragService.processQuery(req.user, query);

    // Log query and response for adaptive learning
    const log = new QueryLog({
      userId: req.user.id,
      query,
      response,
      role: req.user.role,
    });
    await log.save();

    res.json({ response });
  } catch (err) {
    next(err);
  }
};

export default {
  handleQuery,
};
