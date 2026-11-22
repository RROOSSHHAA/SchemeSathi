import { ZodError } from 'zod';

export const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  // Log unexpected errors securely without leaking sensitive info
  if (process.env.NODE_ENV !== 'test') {
    console.error(`[ERROR] ${req.method} ${req.url}:`, err.message);
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request input data',
        details: err.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      }
    });
  }

  // Handle known HTTP errors
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : (statusCode === 500 ? 'Internal Server Error' : err.message);

  return res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'SERVER_ERROR',
      message
    }
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Cannot ${req.method} ${req.originalUrl}`
    }
  });
};
