import { Model } from "rapin";
import { Post } from "entities/Post";
export declare class ModelBlogPost extends Model {
    addPost(data: Post): Promise<number>;
    editPost(postId: number, data: Post): Promise<Post>;
    getPost(postId: number): Promise<Post>;
    getPosts(): Promise<Post[]>;
}
