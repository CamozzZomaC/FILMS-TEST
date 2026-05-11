import { customHeaders } from "./custom-headers.ts";
import type { Request, Response, NextFunction } from 'express';
import { vi } from 'vitest';

describe('Given the customHeaders middleware', () => {
    describe('When the middleware is used with a project name', () => {
         test('Then it should set the X-Project header', async () => {
        // Arrange
            const projectName = 'TestProject';
            const req = {} as Request;
            const res = {
                setHeader: vi.fn()
            } as unknown as Response;
            const next = vi.fn() as NextFunction;

        // Act
            await customHeaders(projectName)(req, res, next);

        // Assert
            expect(res.setHeader).toHaveBeenCalledWith('X-Project', projectName);
            expect(next).toHaveBeenCalled();
        });
    });
});
