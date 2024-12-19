import Role from './Role.js';
import User from './user.js';

Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

export { Role, User };
