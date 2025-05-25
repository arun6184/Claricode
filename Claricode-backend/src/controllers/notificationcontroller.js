// src/controllers/notificationController.js

export const sendNotification = async (req, res, next) => {
  try {
    // For demo, just echo notification
    const { toUserId, message } = req.body;
    if (!toUserId || !message) return res.status(400).json({ message: 'toUserId and message are required' });

    // Implement notification sending logic (A2A)

    res.json({ success: true, message: 'Notification sent (simulated)' });
  } catch (err) {
    next(err);
  }
};

// Export all controller functions as default object as well
export default {
  sendNotification,
};
