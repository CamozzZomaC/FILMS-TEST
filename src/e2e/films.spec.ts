import type { Express } from "express";
import request from "supertest"

import { env } from "../config/env.ts"
import { seed } from "../config/db-test.seed.ts"
import { createApp } from "../app.ts";
import { connectDB } from "../config/db-config.ts";

describe('Given films routes', () => {

    let app: Express;
    const urlBase = 'api/films'
    beforeEach(async () => {
        const prisma = await connectDB();
        app = createApp(prisma);
        await seed();
    });

    test('Valid DB environment', () => {
        expect(env.PGDATABASE).toBe('films_db_test')
    });

    test('[GET] /api/films', async () => {
        await request(app).get(urlBase).expect(200);
    });
    
    test('[GET] /api/films/1', async () => {
    await request(app).get(urlBase + '/1').expect(200);
    });    
});