import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";

describe("Create gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const createGymsResponse = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "blue fit",
        description: "a sua academia",
        phone: "199999999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(createGymsResponse.statusCode).toEqual(201);
  });
});
