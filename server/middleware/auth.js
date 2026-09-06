import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, message: 'Authentication required.' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); return next(); } catch { return res.status(401).json({ success: false, message: 'Invalid or expired session.' }); }
}
