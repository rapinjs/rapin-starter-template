import { User } from './User';
export declare class Role {
    id: number;
    codename: string;
    name: string;
    description: string;
    users: User[];
}
