import db from "../models/index";

const getAllUsers = async () => {
    try {
        let res = await db.User.findAll({
            include: {
                model: db.Role,
                as: "roleUserData",
                attributes: ["name"],
            },
        });
        if (res) {
            res = JSON.parse(JSON.stringify(res));
            res = res.map((item) => {
                const { roleUserData, ...rest } = item;
                return { ...rest, role: roleUserData.name };
            });
            return {
                data: res,
                message: "Get all users successful",
            };
        }

        throw { errorCode: 400, message: "Get all users failed" };
    } catch (e) {
        throw e;
    }
};

const getAllRoles = async () => {
    try {
        const res = await db.Role.findAll();
        if (res)
            return {
                data: res,
                message: "Get all roles successful",
            };
        throw { errorCode: 400, message: "Get all roles failed" };
    } catch (e) {
        throw e;
    }
};

export { getAllUsers, getAllRoles };
