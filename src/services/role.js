import db from "../models/index";

const getAllRoles = async () => {
    try {
        const res = await db.Role.findAll();
        if (res)
            return {
                data: res,
                message: "Get all roles successful",
            };
        throw { errorCode: 404, message: "Get all roles failed" };
    } catch (e) {
        throw e;
    }
};

const postNewRole = async (data) => {
    try {
        if (!!data) {
            const res = await db.Role.create();
            const allRoles = await getAllRoles();
            if (res)
                return {
                    data: allRoles.data,
                    message: "Add new role successful",
                };
            throw { errorCode: 404, message: "Add new role failed" };
        }
        throw { errorCode: 400, message: "Add new role failed" };
    } catch (e) {
        throw e;
    }
};

export { getAllRoles, postNewRole };
