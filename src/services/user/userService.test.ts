import { getById, getByEmail, deleteById } from './userService';
import { User } from '../../models';
import { handlePromise } from '../../helpers';
import db from '../../lib/db-client';

jest.mock('../../lib/db-client');

describe('userService', () => {
    describe('getById', () => {
        it('should return the user with the specified id', async () => {
            const id = 1;
            const user: User = { id: 1, first_name: 'John', email: 'john@example.com', last_name: 'Doe', nationality: 'bih', date_of_birth: new Date('2000-01-01'), password: 'dlgjadgu93i30g31g903j1uf930fu139', created_at: new Date(Date.now()), updated_at: new Date(Date.now())};
            const expected = [user, null];

            (db as jest.Mocked<any>).mockReturnValueOnce({
                where: jest.fn().mockReturnThis(),
            first: jest.fn().mockResolvedValueOnce(user),
            });

            const result = await getById(id);

            expect(result).toEqual(expected);
            expect(db).toHaveBeenCalledWith('users');
        });
    });

    describe('getByEmail', () => {
        it('should return the user with the specified email', async () => {
            const email = 'john@example.com';
            const user: User = { id: 1, first_name: 'John', email: 'john@example.com', last_name: 'Doe', nationality: 'bih', date_of_birth: new Date('2000-01-01'), password: 'dlgjadgu93i30g31g903j1uf930fu139', created_at: new Date(Date.now()), updated_at: new Date(Date.now())};
            const expected = [user, null];

            (db as jest.Mocked<any>).mockReturnValueOnce({
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockResolvedValueOnce(user),
            });

            const result = await getByEmail(email);

            expect(result).toEqual(expected);
            expect(db).toHaveBeenCalledWith('users');
        });
    });

    describe('deleteById', () => {
        it('should delete the user with the specified id', async () => {
            const id = 1;
            const expected = ['User successfully deleted', null];

            (db as jest.Mocked<any>).mockReturnValueOnce({
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockReturnThis(),
                del: jest.fn().mockResolvedValueOnce(1),
            });

            const result = await deleteById(id);

            expect(result).toEqual(expected);
            expect(db).toHaveBeenCalledWith('users');
        });
    });
});
