'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            likes: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            views: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            comments: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            shares: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            thumnailUrl: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: '',
            },
            videoUrl: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            shares: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
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
        await queryInterface.dropTable('Posts');
    },
};
