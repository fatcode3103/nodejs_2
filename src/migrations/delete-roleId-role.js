module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("Roles", "roleId");
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn("Roles", "roleId", {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },
};
