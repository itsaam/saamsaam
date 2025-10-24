export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    age: number;
    phone: string;
    address: {
        city: string;
        address: string;
        state: string;
    };
    company: {
        name: string;
        title: string;
        department: string;
    };
}

export interface UsersResponse {
    users: User[];
}
