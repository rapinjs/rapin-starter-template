import { Controller } from "rapin";
export declare class ControllerBlogPost extends Controller {
    create(): Promise<void>;
    update(): Promise<void>;
    list(): Promise<void>;
    post(): Promise<void>;
    uploadImage(): Promise<void>;
}
