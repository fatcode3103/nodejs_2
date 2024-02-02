import { Sequelize } from "sequelize";

const sequelize = new Sequelize("demo_nodejs", "root", "root123", {
    host: "localhost",
    dialect: "mysql",
    port: 3308,
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export default connectDB;
