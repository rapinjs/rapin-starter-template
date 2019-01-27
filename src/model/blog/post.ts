import { Model } from "rapin/lib/common";
import { Post } from "entities/Post";

export class ModelBlogPost extends Model {
  async addPost(data: Post): Promise<number> {
    const post: Post = this.db.create("Post");
    post.name = data.name;
    post.title = data.title;
    post.description = data.description;

    await this.db.save("Post", post);

    return post.id;
  }

  async editPost(postId: number, data: Post): Promise<Post> {
    const post: Post = await this.getPost(postId);

    post.name = data.name;
    post.title = data.title;
    post.description = data.description;
    post.image = data.image;

    await this.db.save("Post", post);
    return post;
  }

  async getPost(postId: number): Promise<Post> {
    return await this.db.findOne("Post", { id: postId });
  }

  async getPosts(): Promise<Post[]> {
    const cache = this.cache.get("blog_posts");

    let results = [];

    if (!cache) {
      results = await this.db.find("Post");
      this.cache.set("blog_posts", results);
    } else {
      results = cache;
    }

    return results;
  }
}
