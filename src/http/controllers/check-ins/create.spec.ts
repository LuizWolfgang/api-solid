import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";
import { prisma } from "../../../lib/prisma";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: { 
        title: 'Javascript gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      }
    });

    const createGymsResponse = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
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
