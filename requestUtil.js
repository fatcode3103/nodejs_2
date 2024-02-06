import request from "supertest";
import app from "./src/app.js";

const requestGetApplication = async (endPoint) => {
    const res = await request(app)
        .get(`/api/${endPoint}`)
        .set("Accept", "application/json")
        .expect(200);
    return res;
};

const requestPostApplication = async (endPoint, dataToSend) => {
    const res = await request(app)
        .post(`/api/${endPoint}`)
        .send(dataToSend)
        .set("Accept", "application/json")
        .expect(200);
    return res;
};

const requestDeleteApplication = async (endPoint, dataToSend) => {
    const res = await request(app)
        .delete(`/api/${endPoint}`)
        .set("Accept", "application/json")
        .expect(200);
    return res;
};

export {
    requestGetApplication,
    requestPostApplication,
    requestDeleteApplication,
};
