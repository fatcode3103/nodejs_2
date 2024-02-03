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

export { getAllRoles };
