import { Model } from 'rapin';
export declare class ModelUserUser extends Model {
    addUser(data: any): Promise<any>;
    editUser(userId: any, data: any): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
    getUser(userId: number): Promise<any>;
    getUsers(data?: any): Promise<any[]>;
    getTotalUsers(data?: any): Promise<number>;
    updateImage(userId: number, image: string): Promise<any>;
}
