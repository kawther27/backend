import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.header('authorization');
  console.log('Token:', token); 
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.CODE_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Invalid Token Error:', err); 
    res.status(400).send('Invalid Token');
  }
};

export default verifyToken;






