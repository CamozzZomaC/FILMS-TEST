//Librearías
import { Request, Response, NextFunction } from "express";
import { vi } from "vitest";

//Clases
import { GenresController } from "./genres.controller.ts"
import { GenresRepo } from "../repo/genres.repo.ts"
import { InternalServerError, NotFoundError } from "../../errors/http-error.ts";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { report } from "node:process";

//Describe general
describe('Given an instance of GenresController', () => {
    let controller: GenresController;
    let repo: GenresRepo;
    let req: Request;
    let res: Response;
    let next: NextFunction;
    
    beforeEach() => {
        repo = {} as GenresRepo; //Significa: “Confía en mí TypeScript, este objeto actuará como un GenresRepo” porque NO queremos Prisma real ni queremos DB.
        req = {} as Request;
        res = { //Esto es un mock: un objeto o función “falsa” que reemplaza una dependencia real durante una prueba. Sirve para: 
        // Aislar el código que quieres probar.
        // Simular respuestas controladas.
        // Evitar llamadas reales a APIs, bases de datos, etc.
        // Verificar cómo se llamó una función.
            status: vi.fn().mockReturnValue(res), //vi.fn() crea una función mock.
            json: vi.fn(),
            send: vi.fn(),
        } as unknown as Response
        
        next = vi.fn() as NextFunction; //Mockeamos el middleware de error de Express.
        controller = new GenresController(repo);
    }

    afterEach(() => {
        vi.clearAllMocks();
    });
        
    describe ('When we instantiated test', () => {
        test('Then it should be defined after beforeEach', () => {
            // No hay Arrange ni Act porque beforeEach ya preparó todo.
            //Assert
            expect(controller).toBeDefined();
        })
        test('Then it should be an instance of GenresController', () => {
            //Assert
            expect(controller).toBeInstanceOf(GenresController)
        })
    })

    describe ('When method getAllGenres is called', () => {
        describe('And repo returns valid data', () => {
             test('Then it should call json with all genres', async () => {
                //Arrange
                const mockGenres = [ //mockeamos el repo (aunque podría estar vacío, pero para que parezca creíble)
                    {id: 1, name: 'Action'},
                    {id: 2, name: 'Horror'},      
                ];
                repo.getAllGenres = vi.fn().mockResolvedValueOnce(mockGenres);
                //Act
                await controller.getAllGenres(req, res, next);
                //Assert
                expect(repo.getAllGenres).toHaveBeenCalled(); //En primer lugar espero que el controller llame al método getAllGenres del repo.
                expect(res.json).toHaveBeenCalledWith(mockGenres) //En segundo lugar espero que res me devuelva un JSON del FALSO repo (el mock)
                expect(next).not.toHaveBeenCalled(); //Finalmente espero que next no aparezca (estaría fuera de try (happy path))
            })
        })   
    })

});
