import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUsers } from '../useUsers';
import { userService } from '../../services/userService';

vi.mock('../../services/userService', () => ({
    userService: {
        getAllUsers: vi.fn(),
    },
}));

describe('Tests useUsers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('charge les utilisateurs', async () => {
        const fakeUsers = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@test.com', age: 30 },
        ];

        vi.mocked(userService.getAllUsers).mockResolvedValue(fakeUsers);

        const { result } = renderHook(() => useUsers());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.users).toEqual(fakeUsers);
    });

    it('gère les erreurs', async () => {
        vi.mocked(userService.getAllUsers).mockRejectedValue(new Error('Erreur réseau'));

        const { result } = renderHook(() => useUsers());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBeTruthy();
    });
});

