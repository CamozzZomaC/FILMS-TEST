import { vi } from 'vitest';
import { FilmsController } from './films.controller.ts';
import type { FilmsRepo } from '../repos/films.repo.ts';
import type { Response, Request, NextFunction } from 'express';


describe('Given an instance of Films Controller', () => {
    describe('When method getAllFilms is called', () => {
        test('Then it return the array of films', async () => {
            // Arrange
            const filmsMock = [
                { id: 1, title: 'The Matrix' },
                { id: 2, title: 'Inception' },
            ];
            const repoMock: FilmsRepo = {
                getAllFilms: vi.fn().mockResolvedValue(filmsMock),
            } as unknown as FilmsRepo;
            const controller = new FilmsController(repoMock);
            const req = {} as Request;
            const json = vi.fn();
            const status = vi.fn().mockReturnValue({ json });
            const res = {
                json,
                status,
            } as unknown as Response;
            const next = vi.fn() as NextFunction;

            // Act
            await controller.getAllFilms(req, res, next);

            // Assert
            expect(repoMock.getAllFilms).toHaveBeenCalled();
            expect(json).toHaveBeenCalledWith(filmsMock);
            expect(next).not.toHaveBeenCalled();
        });
    });
});