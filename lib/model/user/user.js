"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const rapin_1 = require("rapin");
class ModelUserUser extends rapin_1.Model {
    addUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = this.$context.crypto.getHashPassword(data.password);
            const user = yield this.$context.db.create('User');
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.telephone = data.telephone;
            user.email = data.email;
            user.image = '';
            user.roleId = data.roleId;
            user.password = passwordHash.hash;
            user.salt = passwordHash.salt;
            yield this.$context.db.save('User', user);
            return user;
        });
    }
    editUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(userId);
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.telephone = data.telephone;
            yield this.$context.db.save('User', user);
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.$context.db.findOne('User', { email }, { relations: ['role'] });
        });
    }
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.$context.db.findOne('User', { id: userId }, { select: ['id', 'firstName', 'lastName', 'telephone', 'email', 'image', 'roleId'], relations: ['role'] });
        });
    }
    getUsers(data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                select: ['id', 'firstName', 'lastName', 'telephone', 'email', 'image', 'roleId'],
                relations: ['role'],
                order: {
                    firstName: 'ASC',
                },
                where: {},
            };
            if (!lodash_1.isUndefined(data.filter_role)) {
                options.where.roleId = data.filter_role;
            }
            if (!lodash_1.isUndefined(data.limit) && !lodash_1.isUndefined(data.start)) {
                options.skip = data.start;
                options.take = data.limit;
            }
            return yield this.$context.db.find('User', options);
        });
    }
    getTotalUsers(data = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                select: ['id', 'firstName', 'lastName', 'telephone', 'email', 'image', 'roleId'],
                relations: ['role'],
                order: {
                    firstName: 'ASC',
                },
                where: {},
            };
            if (!lodash_1.isUndefined(data.filter_role)) {
                options.where.roleId = data.filter_role;
            }
            return lodash_1.size(yield this.$context.db.find('User', options));
        });
    }
    updateImage(userId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(userId);
            user.image = image;
            yield this.$context.db.save('User', user);
            return user;
        });
    }
}
exports.ModelUserUser = ModelUserUser;
//# sourceMappingURL=user.js.map