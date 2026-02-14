import sequelize from '../config/database';
import User from './user.model';
import Password from './passwords.model';

// Associations
User.hasMany(Password, { foreignKey: 'userId', as: 'passwords' });
Password.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const models = {
    User,
    Password,
};

export { sequelize, User, Password };
export default models;
