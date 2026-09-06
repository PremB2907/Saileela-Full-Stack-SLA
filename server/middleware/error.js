export function notFound(req, res) { res.status(404).json({ success: false, message: 'API route not found.' }); }
export function errorHandler(error, req, res, next) { console.error(error); if (res.headersSent) return next(error); res.status(error.statusCode || 500).json({ success: false, message: process.env.NODE_ENV === 'production' ? 'Something went wrong.' : error.message }); }
