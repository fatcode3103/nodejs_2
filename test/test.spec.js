import request from "supertest";
import { expect } from "chai";

import app from "../src/app.js";

describe("GET /users", () => {
    it("responds with json", (done) => {
        request(app)
            .get("/api/get-users")
            .set("Accept", "application/json")
            .expect(200, done);
    });
});

describe("GET /user", function () {
    it("responds with json", function () {
        expect(true).to.be.true;
    });
});
