import { Controller, DIR_IMAGE, GET, POST, PUT, required } from "rapin";
import * as _ from "lodash";
import { Auth } from "@rapin/typeorm-auth";

export class ControllerBlogPost extends Controller {
  @Auth()
  @POST("/post")
  @required(["name", "title", "description", "image"])
  async create() {
    this.$context.load.model("blog/post");
    const postId = await this.$context.model_blog_post.addPost(
      this.request.post
    );
    const postInfo = await this.$context.model_blog_post.getPost(postId);
    this.$context.response.setOutput(postInfo);
  }

  @Auth()
  @PUT("/post/:postId")
  @required(["name", "title", "description", "image"])
  async update() {
    this.$context.load.model("blog/post");

    await this.$context.model_blog_post.editPost(
      this.$context.request.params.postId,
      this.$context.request.post
    );
    const post = await this.model_blog_post.getPost(
      this.request.params.postId
    );

    this.$context.response.setOutput(post);
  }

  @GET("/post")
  async list() {
    this.$context.load.model("blog/post");

    let posts = await this.$context.model_blog_post.getPosts();

    for (let key in posts) {
      posts[key].imageUrl = await this.$context.image.link(
        posts[key].image
      );
    }

    this.$context.response.setOutput(posts);
  }

  @GET("/post/:postId")
  async post() {
    this.$context.load.language("blog/post");

    this.$context.load.model("blog/post");

    let data = {};

    data["title"] = this.$context.language.get("text_title");

    let post_info = await this.$context.model_blog_post.getPost(
      this.request.params.postId
    );

    post_info.imageUrl = await this.$context.image.link(post_info.image);

    this.$context.response.setOutput(post_info);
  }

  @Auth()
  @POST("/post/:postId/image")
  async uploadImage() {
    if (!_.isUndefined(this.$context.request.files.file)) {
      this.$context.load.model("blog/post");

      let post_info = await this.$context.model_blog_post.getPost(
        this.$context.request.params.postId
      );

      post_info.image =
        "posts/" +
        Math.random()
          .toString(36)
          .substring(2, 15) +
        ".jpg";

      this.$context.file.upload(
        this.request.files.file,
        DIR_IMAGE + "/" + post_info.image
      );

      post_info = await this.$context.model_blog_post.editPost(
        this.$context.request.params.postId,
        post_info
      );

      this.$context.response.setOutput(post_info);
    } else {
      this.$context.response.setOutput({
        status: 404,
        message: "Missing file"
      });
    }
  }
}
