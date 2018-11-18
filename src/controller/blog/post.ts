import { Controller, DIR_IMAGE } from 'rapin/lib/common'
import { GET, POST, PUT, required } from 'rapin/lib/helper/request'
import * as _ from 'lodash'
export class ControllerBlogPost extends Controller {
    @POST('/post')
    @required(['name', 'title', 'description', 'image'])
    async create(){
        this.load.model('blog/post')
        const postId = await this.model_blog_post.addPost(this.request.post)
        const postInfo = await this.model_blog_post.getPost(postId)

        this.response.setOutput(postInfo)
    }

    @PUT('/post/:postId')
    @required(['name', 'title', 'description', 'image'])
    async update(){
        this.load.model('blog/post')

        await this.model_blog_post.editPost(this.request.params.postId, this.request.post)
        const post = await this.model_blog_post.getPost(this.request.params.postId)

        this.response.setOutput(post)
    }

    @GET('/post')
    async list(){
        this.load.model('blog/post')
        const posts = await this.model_blog_post.getPosts()

        this.response.setOutput(posts)
    }
    @GET('/post/:postId')
    async post(){

        this.load.language('blog/post')

        this.load.model('blog/post')

        let data = {}

        data['title'] = this.language.get('text_title')

        const post_info = await this.model_blog_post.getPost(this.request.params.postId)

        this.response.setOutput(post_info)
    }

    @GET('/post/:postId/image')
    async image(){
        if(!_.isUndefined(this.request.files.file)) {
            this.load.model('blog/post')

            let post_info = await this.model_blog_post.getPost(this.request.params.postId)

            post_info.image ='/posts/'+Math.random().toString(36).substring(2, 15)+'.jpg'

            this.file.upload(this.request.files.file, DIR_IMAGE + post_info.image)
      
            this.response.setOutput(post_info)
        } else {
            this.response.setOutput({status: 404, message: 'Missing file'})
        }
    }
}