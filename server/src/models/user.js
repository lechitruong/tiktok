'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Role, {
                foreignKey: 'roleCode',
                targetKey: 'code',
                as: 'roleData',
            });
        }
    }
    User.init(
        {
            fullName: DataTypes.STRING,
            userName: DataTypes.STRING,
            email: DataTypes.STRING,
            roleCode: DataTypes.STRING,
            password: DataTypes.STRING,
            association: DataTypes.STRING,
            avatar: DataTypes.STRING,
            isVertified: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
