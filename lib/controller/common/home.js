"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rapin_1 = require("rapin");
class ControllerCommonHome extends rapin_1.Controller {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            this.$context.log.write('bla-bla-bla-');
            this.$context.log.write(this.style.link('test'));
            this.$context.response.setOutput(yield this.load.view('common/home', { test: '213123123' }));
        });
    }
    redirect() {
        this.$context.log.write('bla-bla-bla-');
        this.$context.response.redirect('google.com');
    }
    commonHomeBefore(args) {
        console.log('commonHomeBefore');
        console.log(args);
    }
    viewCommonHomeBefore(args) {
        console.log('viewCommonHomeBefore');
        console.log(args);
    }
    viewCommonHomeAfter(args) {
        console.log('viewCommonHomeAfter');
        console.log(args);
    }
}
__decorate([
    rapin_1.GET('/home', 'html'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerCommonHome.prototype, "index", null);
__decorate([
    rapin_1.GET('/redirect', 'html'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ControllerCommonHome.prototype, "redirect", null);
__decorate([
    rapin_1.Listing('controller/common/home/index', 'before'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ControllerCommonHome.prototype, "commonHomeBefore", null);
__decorate([
    rapin_1.Listing('view/common/home', 'before'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ControllerCommonHome.prototype, "viewCommonHomeBefore", null);
__decorate([
    rapin_1.Listing('view/common/home', 'after'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ControllerCommonHome.prototype, "viewCommonHomeAfter", null);
exports.ControllerCommonHome = ControllerCommonHome;
//# sourceMappingURL=home.js.map