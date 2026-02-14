import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { commonColumns } from './common.columns';
import User from './user.model';

export interface PasswordAttributes {
    id: string;
    userId: string;
    website: string;
    username: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PasswordCreationAttributes extends Optional<PasswordAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

class Password extends Model<PasswordAttributes, PasswordCreationAttributes> implements PasswordAttributes {
    public id!: string;
    public userId!: string;
    public website!: string;
    public username!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Password.init({
    ...commonColumns,
    userId: {
        type: DataTypes.UUID,
        allowNull: false,

    },
    website: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'passwords',
});

Password.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Password;