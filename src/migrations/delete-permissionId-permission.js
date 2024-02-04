module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("Permissions", "permissionId");
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn("Permissions", "permissionId", {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },
};
