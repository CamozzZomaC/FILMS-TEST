import type { Response, Request, NextFunction } from 'express';
import { vi } from 'vitest';


import { FilmsController } from './films.controller.ts';
import type { FilmsRepo } from '../repos/films.repo.ts';
import { InternalServerError, NotFoundError } from '../../errors/http-error.ts';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { FilmScalarFieldEnum } from '../../../generated/prisma/internal/prismaNamespace.ts';

describe('Given a instantiated Filns Controller', () => {
    let controller: FilmsController;
    let repo: FilmsRepo;
    let req:Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(async () =>{
        repo = {} as FilmsRepo;
        req = {} as Request;
        res = {
            status: vi.fn().mockReturnValue(res),
            json: vi.fn(),
            send: vi.fn(),
        } as unknown as Response;
        next = vi.fn() as NextFunction;
        controller = new FilmsController(repo);
    });

    afterEach(() =>{
        vi.clearAllMocks();
    });

    describe('When we instantiate it', () => {
        test('Then it should be defined', () => {
            //Act 6 aSSERT
            expect(controller).toBeDefined();
        });
        test('Then it should be an instance of FilmsRepo', () => {
            //Act &Assert
            expect(controller).toBeInstanceOf(FilmsController)
        });
    });

    describe('When method getAllFilms is called', () => {
            describe('And repo return valid data', () => {
                test('Then it call json with a list of films', async () => {
                    // Arrange
                    repo.getAllFilms = vi.fn().mockResolvedValueOnce([]);
                    // Act
                    await controller.getAllFilms(req, res, next);
                    // Assert
                    expect(repo.getAllFilms).toHaveBeenCalled();
                    expect(next).not.toHaveBeenCalled();
                });
            });
            describe('And repo throw an Error', () => {
                test('', async () => {
                    // Arrange
                    repo.getAllFilms = vi
                        .fn()
                        .mockRejectedValueOnce(new Error('Any message'));
                    // Act
                    await controller.getAllFilms(req, res, next);
                    expect(next).toHaveBeenCalledWith(
                        expect.objectContaining({} as InternalServerError),
                    );
                });
            });
        });

        describe('When method getFilmById is called', () => {
        describe('And repo return valid data', () => {
            test('Then it call json with a film', async () => {
                // Arrange
                const mockFilm = { id: 1 };
                req.params = { id: '1' };
                repo.getFilmByID = vi.fn().mockResolvedValueOnce(mockFilm);
                // Act
                await controller.getFilmById(req, res, next);
                // Assert
                expect(repo.getFilmByID).toHaveBeenCalledWith(1);
                expect(res.json).toHaveBeenCalledWith(mockFilm);
                expect(next).not.toHaveBeenCalled();
            });
        });
        describe('And repo throw a Prisma Error', () => {
            test('', async () => {
                // Arrange
                req.params = { id: '1' };
                repo.getFilmByID = vi
                    .fn()
                    .mockRejectedValueOnce(new PrismaClientKnownRequestError(
                        'Any message', {
                            code: 'P2025',
                            clientVersion: '1'
                        }
                    ));
                // Act
                await controller.getFilmById(req, res, next);
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as NotFoundError),
                );
            });
        });
        describe('And repo throw a generic Error', () => {
            test('', async () => {
                // Arrange
                req.params = { id: '1' };
                repo.getFilmByID = vi
                    .fn()
                    .mockRejectedValueOnce(new Error('Any message'));
                // Act
                await controller.getFilmById(req, res, next);
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as InternalServerError),
                );
            });
        });
    });

});

/* describe('Given an instance of Films Controller', () => {
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
}); */