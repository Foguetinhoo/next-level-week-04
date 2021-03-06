import request from 'supertest';
import { app } from '../app';
import createConnection from '../database'

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })
    it("Should be able to a create new survey", async () => {
        const response = await request(app).post("/api/surveys/create")
            .send({
                title: "example title",
                description: "The example test of surveys"
            })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id");
    })
    
    it("Should be able to a create new survey", async () => {
       await request(app).post("/api/surveys/create")
            .send({
                title: "example title2",
                description: "The example test of surveys 2"
            })
        const response = await request(app).get("/api/surveys/all")
        expect(response.body).toBe(2)
    })
    
    
});