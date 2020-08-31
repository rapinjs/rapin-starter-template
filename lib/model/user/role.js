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
class ModelUserRole extends rapin_1.Model {
    addRole(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.$context.db.create('Role');
            role.codename = data.codename;
            role.name = data.name;
            role.description = data.description;
            yield this.$context.db.save('Role', role);
            return role;
        });
    }
    editRole(roleId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.getRole(roleId);
            role.codename = data.codename;
            role.name = data.name;
            role.description = data.description;
            yield this.$context.db.save('Role', role);
            return role;
        });
    }
    getRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.$context.db.findOne('Role', { roleId });
        });
    }
    getRoles(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                select: ['id', 'codename', 'name', 'description'],
                order: {
                    firstName: 'ASC',
                },
                where: {},
            };
            if (!lodash_1.isUndefined(data.limit) && !lodash_1.isUndefined(data.start)) {
                options.skip = data.start;
                options.take = data.limit;
            }
            return yield this.$context.db.find('Role', options);
        });
    }
    getTotalRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                select: ['id', 'codename', 'name', 'description'],
                order: {
                    firstName: 'ASC',
                },
                where: {},
            };
            return lodash_1.size(yield this.$context.db.find('Role', options));
        });
    }
}
exports.ModelUserRole = ModelUserRole;
//# sourceMappingURL=role.js.map