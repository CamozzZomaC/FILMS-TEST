//Librearías
import { Request, Response, NextFunction } from "express";
import { vi } from "vitest";

//Clases
import { GenresController } from "./genres.controller.ts"
import { GenresRepo } from "../repo/genres.repo.ts"
import { InternalServerError, NotFoundError } from "../../errors/http-error.ts";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

//Describe general
describe('Given an instance of GenresController', () => {
    let controller: GenresController;
    let repo: GenresRepo;
    let req: Request;
    let res: Request;
    let next: NextFunction;
    
    beforeEach() => {
        repo = {} as GenresRepo;
        req = {} as Request;
        res = { //Esto es un mock: un objeto o función “falsa” que reemplaza una dependencia real durante una prueba. Sirve para: 
        // Aislar el código que quieres probar.
        // Simular respuestas controladas.
        // Evitar llamadas reales a APIs, bases de datos, timers, etc.
        // Verificar cómo se llamó una función.
            status = vi.fn().mockReturnValue(res), //vi.fn() crea una función mock.
            json = vi.fn(),
            send = vi.fn(),
        } as unknown as Response
        
        next = vi.fn() as NextFunction; //Mockeamos el middleware de error de Express.
        controller = new GenresController(repo);
    }

    afterEach(() => {
        vi.clearAllMocks();
    });
        
    //Pendiente
});
