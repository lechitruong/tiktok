'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Post.belongsTo(models.User, {
                foreignKey: 'poster',
                targetKey: 'id',
                as: 'posterInfo',
            });
        }
    }
    Post.init(
        {
            title: DataTypes.STRING,
            videoUrl: DataTypes.STRING,
            likes: DataTypes.INTEGER,
            thumnailUrl: DataTypes.STRING,
            comments: DataTypes.INTEGER,
            views: DataTypes.INTEGER,
            shares: DataTypes.INTEGER,
            poster: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );
    return Post;
};
