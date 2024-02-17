'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CategoryOfPost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CategoryOfPost.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                targetKey: 'id',
            });
            CategoryOfPost.belongsTo(models.Post, {
                foreignKey: 'postId',
                targetKey: 'id',
            });
        }
    }
    CategoryOfPost.init(
        {
            categoryId: DataTypes.INTEGER,
            postId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'CategoryOfPost',
            tableName: 'categoriesofpost',
        }
    );
    return CategoryOfPost;
};
