import request from "supertest";
import app from "../app.js";
import { afterAll, expect } from "@jest/globals";
import db from "../config/db.js";

describe("Auth Module", () => {

    const email = "vod_test@gmail.com"
    const password = "VOdtest@123"

    afterAll( async() => {

        await db.query('DELETE FROM user WHERE email = ?', [email])

        await db.end()
    })

    test("POST /api/v1/auth/signup request_without_json_data", async () => {

        const response = await request(app)
            .post("/api/v1/auth/signup")
            .send();

        expect(response.statusCode).toBe(500);

        expect(response.body.success).toBe(false);

        expect(response.body.message).toBe("Internal Server Error");
    });

    test("POST /api/v1/auth/signup calling_endpoint_with_manipulated_data", async () => {

        const response = await request(app)
            .post("/api/v1/auth/signup")
            .send({
                email,
                password,
                subscription: "Pro"

            });

        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);

        expect(response.body.message).toBe("wrong credentials");
    });

    test("POST /api/v1/auth/login request_without_user", async () => {

        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email,
                password
            });

        expect(response.statusCode).toBe(404);

        expect(response.body.success).toBe(false);

        expect(response.body.message).toBe("user not found");
    });

    test("POST /api/v1/auth/signup adding_user", async () => {

        const response = await request(app)
            .post("/api/v1/auth/signup")
            .send({
                email,
                password
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.success).toBe(true);

        expect(response.body.message).toBe("User created success");
    });

    test("POST /api/v1/auth/signup adding_user_with_same_data", async () => {

        const response = await request(app)
            .post("/api/v1/auth/signup")
            .send({
                email,
                password
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);

        expect(response.body.message).toBe("User alredy registered");
    });

    test("POST /api/v1/auth/login log_with_incorrect_credentials", async () => {

        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email,
                password:"wrongpass"
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);

        expect(response.body.message).toBe("wrong credentials");
    });


   test("POST /api/v1/auth/login log_with_correct_credentials", async () => {

        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email,
                password
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.message).toBe("user logged success");
    });


});