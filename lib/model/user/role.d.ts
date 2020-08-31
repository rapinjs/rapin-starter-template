import { Model } from 'rapin';
export declare class ModelUserRole extends Model {
    addRole(data: any): Promise<any>;
    editRole(roleId: any, data: any): Promise<any>;
    getRole(roleId: any): Promise<any>;
    getRoles(data: any): Promise<any[]>;
    getTotalRoles(): Promise<number>;
}
