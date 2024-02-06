import { expect } from "chai";
import db from "../src/models/index.js";
import * as userService from "../src/services/user.js";
import * as roleService from "../src/services/role.js";

describe("userService", () => {
    let transaction;
    beforeEach(async () => {
        transaction = await db.sequelize.transaction();
    });
    afterEach(async () => {
        await transaction.rollback();
    });

    // get users result
    it("should have a array of users", async () => {
        const res = await userService.getAllUsers();
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Get all users successful");
    });
    // add new user
    it("should add a new user successfully", async () => {
        const dataToSend = {
            name: "user",
            age: 20,
            role: 13,
        };
        const res = await userService.postNewUser(dataToSend, transaction);
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Add user successful");
    });
    // delete user
    it("should add a new user successfully", async () => {
        const dataToSend = 35;
        const res = await userService.deleteUser(dataToSend, transaction);
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Delete user successful");
    });
});

describe("roleService", () => {
    // get roles result
    it("should have a array of roles", async () => {
        const res = await roleService.getAllRoles();
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Get all roles successful");
    });
    // get permissions result
    it("should have a array of permissions", async () => {
        const res = await roleService.getPermission();
        expect(Array.isArray(res.data)).to.be.true;
        expect(res.message).to.equal("Get all permissions successful");
    });
});
