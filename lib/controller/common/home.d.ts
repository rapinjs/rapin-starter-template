import { Controller } from 'rapin';
export declare class ControllerCommonHome extends Controller {
    index(): Promise<void>;
    redirect(): void;
    commonHomeBefore(args: any): void;
    viewCommonHomeBefore(args: any): void;
    viewCommonHomeAfter(args: any): void;
}
