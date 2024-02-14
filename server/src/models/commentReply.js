'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CommentReply extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CommentReply.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
            });
        }
    }
    CommentReply.init(
        {
            responder: DataTypes.INTEGER,
            commentPostId: DataTypes.INTEGER,
            likes: DataTypes.INTEGER,
            content: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'CommentReply',
        }
    );
    return CommentReply;
};
