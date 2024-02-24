'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('TmpPosts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            postId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Posts',
                    key: 'id',
                },
            },
            videoUrl: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            videoId: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: '',
            },
            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('TmpPosts');
    },
};
