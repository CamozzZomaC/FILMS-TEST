import type { AppPrismaClient } from "../../config/db-config.ts";
import { FilmsRepo } from "./films.repo.ts";

describe('Given a instance of FilmsRepo class', () => {
    
    // Arrange
    const prismaMock = {
        film: {
            findMany: vitest.fn().mockResolvedValue([]),
            findUniqueOrThrow: vitest.fn().mockResolvedValue({}),
            create: vitest.fn().mockResolvedValue({}),
            update: vitest.fn().mockResolvedValue({}),
            delete: vitest.fn().mockResolvedValue({}),
        }
    } as unknown as AppPrismaClient
    const repo = new FilmsRepo(prismaMock)
    describe('When method getAllFilms is called', () => {
        test('Then it return the array of films', async () => {
            // Act
            const films = await repo.getAllFilms()
            // Assert
            expect(films).toEqual([])
        });
    });
    describe('When method getFilmByID is called', () => {
        test('Then it return the film', async () => {
            // Act
            const film = await repo.getFilmByID(1)
            // Assert
            expect(film).toEqual({})
        });
    });


    
});
