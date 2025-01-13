import Role from './Role.js';
import User from './user.js';
import Testimonial from './Testimonial.js';


// Define Role and User relationship
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

// Define User and Testimonial relationship
User.hasMany(Testimonial, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Testimonial.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
export { Role, User , Testimonial };
