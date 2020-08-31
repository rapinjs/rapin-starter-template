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
const lodash_1 = require("lodash");
const typeorm_auth_1 = require("@rapin/typeorm-auth");
class ControllerUserAccount extends rapin_1.Controller {
    constructor(registry) {
        super(registry);
        // this.$context.load.language("user/user");
        // this.$context.load.model("user/user");
        // this.$context.load.model("user/role");
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model_user_user.getUserByEmail(this.$context.request.post.email);
            if (!lodash_1.isEmpty(result)) {
                this.$context.error.set("email_alrady_exists");
            }
            if (!this.error.get()) {
                const password = this.$context.crypto.token(10);
                const userInfo = yield this.$context.model_user_user.addUser(Object.assign({}, this.$context.request.post, { roleId: 2 }, { password }));
                const token = yield this.$context.user.login(userInfo.email, password);
                this.$context.response.setOutput({
                    token,
                    account: userInfo
                });
            }
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield this.$context.model_user_user.getUserByEmail(this.$context.request.post.email);
            if (lodash_1.isEmpty(userInfo)) {
                this.$context.error.set("email_not_exists");
            }
            else {
                const token = yield this.$context.user.login(this.$context.request.post.email, this.$context.request.post.password);
                if (token) {
                    this.$context.response.setOutput({
                        token,
                        account: userInfo
                    });
                }
                else {
                    this.$context.error.set("incorrect_email_or_password");
                }
            }
        });
    }
    userGet() {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield this.$context.model_user_user.getUser(this.$context.user.getId());
            this.$context.response.setOutput(userInfo);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.$context.model_user_user.editUser(this.$context.user.getId(), this.$context.request.post);
            const userInfo = yield this.$context.model_user_user.getUser(this.$context.user.getId());
            userInfo.role = yield this.$context.model_user_role.getRole(userInfo.role_id);
            this.$context.response.setOutput(userInfo);
        });
    }
    imageProfessional() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!lodash_1.isUndefined(this.request.files.file)) {
                const image = "/users/" +
                    Math.random()
                        .toString(36)
                        .substring(2, 15) +
                    ".jpg";
                yield this.file.upload(this.request.files.file, rapin_1.DIR_IMAGE + image);
                const userInfo = yield this.model_user_user.updateImage(this.user.getId(), image);
                this.response.setOutput(userInfo);
            }
            else {
                this.response.setOutput({ status: 404, message: "Missing file" });
            }
        });
    }
}
__decorate([
    rapin_1.POST("/account/register"),
    rapin_1.required(["firstName", "lastName", "email", "telephone"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerUserAccount.prototype, "create", null);
__decorate([
    rapin_1.POST("/account/login"),
    rapin_1.required(["email", "password"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerUserAccount.prototype, "login", null);
__decorate([
    typeorm_auth_1.Auth(),
    rapin_1.GET("/account"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerUserAccount.prototype, "userGet", null);
__decorate([
    typeorm_auth_1.Auth(),
    rapin_1.PUT("/account"),
    rapin_1.required(["firstName", "lastName", "telephone"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerUserAccount.prototype, "update", null);
__decorate([
    typeorm_auth_1.Auth(),
    rapin_1.POST("/account/image", "file"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerUserAccount.prototype, "imageProfessional", null);
exports.ControllerUserAccount = ControllerUserAccount;
//# sourceMappingURL=account.js.map