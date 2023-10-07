import request from "supertest";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";
import { app } from "../../../app";

describe("Nerbay Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list neraby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Some description.",
        phone: "1199999999",
        latitude: -15.673093,
        longitude: -48.088506,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Some description.",
        phone: "1199999999",
        latitude: -15.7336271,
        longitude: -48.2584841,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -15.673093,
        longitude: -48.088506,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym",
      }),
    ]);
  });
});
