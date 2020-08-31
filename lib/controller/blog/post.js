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
const _ = require("lodash");
const typeorm_auth_1 = require("@rapin/typeorm-auth");
class ControllerBlogPost extends rapin_1.Controller {
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            this.$context.load.model("blog/post");
            const postId = yield this.$context.model_blog_post.addPost(this.request.post);
            const postInfo = yield this.$context.model_blog_post.getPost(postId);
            this.$context.response.setOutput(postInfo);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            this.$context.load.model("blog/post");
            yield this.$context.model_blog_post.editPost(this.$context.request.params.postId, this.$context.request.post);
            const post = yield this.model_blog_post.getPost(this.request.params.postId);
            this.$context.response.setOutput(post);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            this.$context.load.model("blog/post");
            const posts = yield this.$context.model_blog_post.getPosts();
            for (const key in posts) {
                posts[key].imageUrl = yield this.$context.image.link(posts[key].image);
            }
            this.$context.response.setOutput(posts);
        });
    }
    post() {
        return __awaiter(this, void 0, void 0, function* () {
            this.$context.load.language("blog/post");
            this.$context.load.model("blog/post");
            const data = {};
            data["title"] = this.$context.language.get("text_title");
            const post_info = yield this.$context.model_blog_post.getPost(this.request.params.postId);
            post_info.imageUrl = yield this.$context.image.link(post_info.image);
            this.$context.response.setOutput(post_info);
        });
    }
    uploadImage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_.isUndefined(this.$context.request.files.file)) {
                this.$context.load.model("blog/post");
                let post_info = yield this.$context.model_blog_post.getPost(this.$context.request.params.postId);
                post_info.image =
                    "posts/" +
                        Math.random()
                            .toString(36)
                            .substring(2, 15) +
                        ".jpg";
                this.$context.file.upload(this.request.files.file, rapin_1.DIR_IMAGE + "/" + post_info.image);
                post_info = yield this.$context.model_blog_post.editPost(this.$context.request.params.postId, post_info);
                this.$context.response.setOutput(post_info);
            }
            else {
                this.$context.response.setOutput({
                    status: 404,
                    message: "Missing file"
                });
            }
        });
    }
}
__decorate([
    typeorm_auth_1.Auth(),
    rapin_1.POST("/post"),
    rapin_1.required(["name", "title", "description", "image"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerBlogPost.prototype, "create", null);
__decorate([
    typeorm_auth_1.Auth(),
    rapin_1.PUT("/post/:postId"),
    rapin_1.required(["name", "title", "description", "image"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerBlogPost.prototype, "update", null);
__decorate([
    rapin_1.GET("/post"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerBlogPost.prototype, "list", null);
__decorate([
    rapin_1.GET("/post/:postId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerBlogPost.prototype, "post", null);
__decorate([
    typeorm_auth_1.Auth(),
    rapin_1.POST("/post/:postId/image"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ControllerBlogPost.prototype, "uploadImage", null);
exports.ControllerBlogPost = ControllerBlogPost;
//# sourceMappingURL=post.js.map