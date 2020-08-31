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
const rapin_1 = require("rapin");
class ModelBlogPost extends rapin_1.Model {
    addPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = this.$context.db.create("Post");
            post.name = data.name;
            post.title = data.title;
            post.description = data.description;
            yield this.$context.db.save("Post", post);
            return post.id;
        });
    }
    editPost(postId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.$context.getPost(postId);
            post.name = data.name;
            post.title = data.title;
            post.description = data.description;
            post.image = data.image;
            yield this.$context.db.save("Post", post);
            return post;
        });
    }
    getPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.$context.db.findOne("Post", { id: postId });
        });
    }
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = this.$context.cache.get("blog_posts");
            let results = [];
            if (!cache) {
                results = yield this.$context.db.find("Post");
                this.$context.cache.set("blog_posts", results);
            }
            else {
                results = cache;
            }
            return results;
        });
    }
}
exports.ModelBlogPost = ModelBlogPost;
//# sourceMappingURL=post.js.map