import { Controller } from "rapin";
export declare class ControllerUserAccount extends Controller {
    constructor(registry: any);
    create(): Promise<void>;
    login(): Promise<void>;
    userGet(): Promise<void>;
    update(): Promise<void>;
    imageProfessional(): Promise<void>;
}
