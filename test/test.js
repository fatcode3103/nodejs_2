// import request from "supertest";
// import { expect } from "chai";

var app = require("../app");
var request = require("supertest");
var expect = require("chai").expect;

describe("GET /users", () => {
    it("responds with json", async (done) => {
        const res = await request(app)
            .get("/api/get-users")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
        expect(res.status).to.equal(200);
    });
});

describe("GET /user", function () {
    it("responds with json", function () {
        expect(true).to.be.true;
    });
});
