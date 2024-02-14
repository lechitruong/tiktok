'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserInChatroom extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserInChatroom.belongsTo(models.User, {
                foreignKey: 'menber',
                targetKey: 'id',
            });
            UserInChatroom.belongsTo(models.Chatroom, {
                foreignKey: 'chatroomId',
                targetKey: 'id',
            });
        }
    }
    UserInChatroom.init(
        {
            member: DataTypes.INTEGER,
            chatroomId: DataTypes.INTEGER,
            isSeen: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'UserInChatroom',
        }
    );
    return UserInChatroom;
};
