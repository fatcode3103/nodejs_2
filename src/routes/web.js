import express from "express";

import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/get-users", userController.getAllUsers);
router.get("/get-roles", userController.getAllRoles);

module.exports = router;
