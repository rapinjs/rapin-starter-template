import { Role } from './Role';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    image: string;
    password: string;
    salt: string;
    roleId: string;
    role: Role;
}
