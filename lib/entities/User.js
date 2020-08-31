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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Role_1 = require("./Role");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        name: 'user_id',
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        name: 'first_name',
        length: 256,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        name: 'last_name',
        length: 256,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        name: 'email',
        length: 50,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        name: 'telephone',
        length: 50,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "telephone", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        name: 'image',
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        name: 'password',
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        name: 'salt',
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        name: 'role_id',
        default: '2',
    }),
    __metadata("design:type", String)
], User.prototype, "roleId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Role_1.Role, (role) => role.users, { cascade: true, onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: 'role_id' }),
    __metadata("design:type", Role_1.Role)
], User.prototype, "role", void 0);
User = __decorate([
    typeorm_1.Entity({ name: 'oc_user' })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map