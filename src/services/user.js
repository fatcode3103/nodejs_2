import db from "../models/index";

const getAllUsers = async () => {
    try {
        const res = await db.User.findAll();
        if (res)
            return {
                data: res,
                message: "Get all users successful",
            };
        throw { errorCode: 400, message: "Get all users failed" };
    } catch (e) {
        throw e;
    }
};

export { getAllUsers };
