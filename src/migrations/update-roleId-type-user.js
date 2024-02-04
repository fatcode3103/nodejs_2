module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn("Users", "roleId", {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn("Users", "roleId", {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },
};
