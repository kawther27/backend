import jwt from 'jsonwebtoken';

const verifierToken = (req, res, next) => {
  
  //If the token is missing, it denies access with
  //  a 401 Unauthorized response.
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1]; // Ensure the token is extracted correctly.
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    //If the token is present, it verifies the token 
    // using  secret (process.env.CODE_SECRET).
    const verified = jwt.verify(token, process.env.CODE_SECRET);
    req.user = verified; // Attach the verified user info to the request
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
    

  }
  console.log('Received Token:', token);
};

export default verifierToken;
