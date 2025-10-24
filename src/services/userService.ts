const API_URL = 'https://dummyjson.com';

export const userService = {
    getAllUsers: async () => {
        const response = await fetch(`${API_URL}/users?limit=0`);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des utilisateurs');
        }
        const data = await response.json();
        return data.users;
    },

    getUserById: async (id: string) => {
        const response = await fetch(`${API_URL}/users/${id}`);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement de l\'utilisateur');
        }
        return response.json();
    }
};