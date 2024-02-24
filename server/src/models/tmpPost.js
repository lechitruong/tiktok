'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TmpPost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            TmpPost.belongsTo(models.Post, {
                foreignKey: 'postId',
                targetKey: 'id',
                as: 'postData',
            });
        }
    }
    // Tmp post will save link post of gg driver when it cant view yet.
    // Then using cron to replace video url of post with video url of tmp Post
    TmpPost.init(
        {
            videoUrl: DataTypes.STRING,
            videoId: DataTypes.STRING,
            postId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'TmpPost',
        }
    );
    return TmpPost;
};
