import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // Retrieve the token from the "Authorization" header
  const token = req.headers['authorization'];
  
  // If no token is provided, send a 403 (Forbidden) response.
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // If the token starts with "Bearer ", remove that prefix to get the actual token.
  const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;

  try {
    // Verify the token using the secret key from environment variables.
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    
    // If verification succeeds, attach the decoded userId to the request object.
    req.userId = decoded.userId;
    
    // Proceed to the next middleware or route handler.
    next();
  } catch (error) {
    // If verification fails (token is invalid or expired), send a 401 (Unauthorized) response.
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
