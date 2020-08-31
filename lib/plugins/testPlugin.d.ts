export default class testPlugin {
    beforeInitRegistry(): void;
    afterInitRegistry(): void;
    onRequest({ route }: {
        route: any;
    }): void;
    onError(): void;
    onBeforeInitRouter(): void;
    onAfterInitRouter(): void;
    onImageResizeAfter(data: any): any;
}
