import { Model } from "rapin";
import { Post } from "entities/Post";

export class ModelBlogPost extends Model {
  async addPost(data: Post): Promise<number> {
    const post: Post = this.$context.db.create("Post");
    post.name = data.name;
    post.title = data.title;
    post.description = data.description;

    await this.$context.db.save("Post", post);

    return post.id;
  }

  async editPost(postId: number, data: Post): Promise<Post> {
    const post: Post = await this.$context.getPost(postId);
    post.name = data.name;
    post.title = data.title;
    post.description = data.description;
    post.image = data.image;

    await this.$context.db.save("Post", post);
    return post;
  }

  async getPost(postId: number): Promise<Post> {
    return await this.$context.db.findOne("Post", { id: postId });
  }

  async getPosts(): Promise<Post[]> {
    const cache = this.$context.cache.get("blog_posts");

    let results: Post[] = [];

    if (!cache) {
      results = await this.$context.db.find("Post");
      this.$context.cache.set("blog_posts", results);
    } else {
      results = cache as Post[];
    }

    return results;
  }
}
