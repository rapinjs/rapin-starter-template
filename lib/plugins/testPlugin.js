"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class testPlugin {
    beforeInitRegistry() {
        console.log('beforeInitRegistry');
    }
    afterInitRegistry() {
        console.log('afterInitRegistry');
    }
    onRequest({ route }) {
        console.log('onRequest');
        console.log(route);
    }
    onError() {
        console.log('onError');
    }
    onBeforeInitRouter() {
        console.log('onBeforeInitRouter');
    }
    onAfterInitRouter() {
        console.log('onAfterInitRouter');
    }
    onImageResizeAfter(data) {
        console.log('onImageResizeAfter');
        return data;
    }
}
exports.default = testPlugin;
//# sourceMappingURL=testPlugin.js.map