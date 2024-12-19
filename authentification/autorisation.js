import jwt from 'jsonwebtoken';
import { Role } from '../models/Role.js';

export const autorisation = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // Middleware pour vérifier l'authentification
    (req, res, next) => {
      const token = req.headers['authorization'];
      if (!token) return res.status(401).send('Access Denied');

      try {
        const verified = jwt.verify(token, process.env.CODE_SECRET);
        req.user = verified;
        next();
      } catch (err) {
        res.status(400).send('Invalid Token');
      }
    },

    // Middleware pour vérifier les rôles
    (req, res, next) => {
      const userRole = req.user.role;
      Role.findOne({ where: { name: userRole } })
        .then(role => {
          if (!roles.includes(role.name)) {
            return res.status(403).send('You do not have permission to perform this action');
          }
          next();
        })
        .catch(err => {
          res.status(500).send('Something went wrong');
        });
    }
  ];
};
