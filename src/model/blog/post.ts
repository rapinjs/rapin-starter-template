import {Model} from 'rapin/lib/common'

export class ModelBlogPost extends Model {
    async addPost(data) {
        const post = this.db.create('Post')
        post.name = data.name
        post.title = data.title
        post.description = data.description

        await this.db.save('Post', post)

        return post.id
    }
    async editPost(postId, data) {
        const post = await this.getPost(postId)

        post.name = data.name
        post.title = data.title
        post.description = data.description
        post.image = data.image

        await this.db.save('Post', post)
    }

    async getPost(postId) {
        return await this.db.findOne('Post', {id: postId})
    }

    async getPosts() {
        const cache = this.cache.get('blog_posts')

        let results = []

        if(!cache) {
            results = await this.db.find('Post')
            this.cache.set('blog_posts', results)
        } else {
            results = cache
        }

        return results
    }
}