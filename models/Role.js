import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connexion.js';

class Role extends Model {}

Role.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Role',
});

export default Role;
