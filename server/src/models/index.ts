import sequelize from '../config/database';
import User from './user.model';
import Password from './passwords.model';

const models = {
    User,
    Password,
};

export { sequelize, User, Password };
export default models;
