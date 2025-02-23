const completions = require("../../netlify/services/appService");
const openai = require('openai');

// Mock OpenAI's module/library.
jest.mock('openai');

// Test suite for appService.js
describe('[services/appService.js] - App service', () => {

    // Completions function
    describe('completions function', () => {

        // Unit test: return a 400 status code if the name is not provided.
        it('should return a 400 status code if the name is not provided', async () => {
            // 1. Arrange

            // Create stub for request and response objects and mock the next function.
            const req = { body: { name: '' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();

            // 2. Act

            // Call completions function
            await completions(req, res, next);

            // 3. Assert

            // Check if the response was a 400 status code with the correct message.
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ code: 400, message: 'Please provide a Pokémon name.' });
        });

        // Unit test: return a 200 status code if the name is provided.
        it('should return a 200 status code if the name is provided', async () => {

            // 1. Arrange.

            // Expected result returned by OpenAI's completions function.
            const expectedResult = 'This is a test.';

            // This mock simulates what OpenAI's completions create function would return.
            // Using it in a constant to check it was called later.
            const createFn = jest.fn().mockResolvedValue({ choices: [{ message: { content: expectedResult } }] });

            // Mock constructor and completions function.
            openai.OpenAI.mockImplementation(() => {
                return {
                    chat: {
                        completions: {
                            create: createFn
                        }
                    }
                }
            });

            // Create stubs for request and response objects and mock the next function.
            const req = { body: { name: 'pikachu' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();

            // 2. Act.
            await completions(req, res, next);

            // 3. Assert.

            // OpenAI's completions constructor and completions function should have been called once.
            expect(openai.OpenAI).toHaveBeenCalledTimes(1);
            expect(createFn).toHaveBeenCalledTimes(1);

            // Response status should be a 200 and should return message given by OpenAI mock.
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ code: 200, message: expectedResult });
        });

        // Unit test: return a 500 status code if an error ocurrs on OpenAI's side.
        it(`should return a 500 status code if an error ocurrs on OpenAI's side`, async () => {
            // 1. Arrange.

            // Expected result returned by OpenAI's completions function.
            const expectedMessage = `Internal OpenAI's API error.`;

            // Mock constructor and completions function.
            // This time, we need to throw an error to simulate an error on OpenAI's side.
            const createFn = jest.fn().mockImplementation(() => { throw new Error(expectedMessage) });
            openai.OpenAI.mockImplementation(() => {
                return {
                    chat: {
                        completions: {
                            create: createFn
                        }
                    }
                }
            });

            // Create stubs for request and response objects and mock the next function.
            const req = { body: { name: 'pikachu' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();

            // 2. Act.
            await completions(req, res, next);

            // 3. Assert.

            // OpenAI's completions constructor and completions function should have been called once.
            expect(openai.OpenAI).toHaveBeenCalledTimes(1);
            expect(createFn).toHaveBeenCalledTimes(1);

            // Response status should be a 200 and should return message given by OpenAI mock.
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ code: 500, message: expectedMessage });
        });
    });
});