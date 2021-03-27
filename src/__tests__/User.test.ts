import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database'

describe("User", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })
    afterAll(async () => {
        const connection = await getConnection()
        await connection.dropDatabase();
        await connection.close()
    })
    
    it("Should be able to a create new user", async () => {
        const response = await request(app).post("/api/users/create")
            .send({
                email: "example@gmail.com",
                name: "User Example"
            })
        expect(response.status).toBe(201)
   })
    it("Should not be able to a create new user with email exists", async () => {
        const response = await request(app).post("/api/users/create")
            .send({
                email: "example@gmail.com",
                name: "User Example"
            })
        expect(response.status).toBe(400)
   })
});