import { Controller, GET, Listing } from 'rapin'

export class ControllerCommonHome extends Controller {
  @GET('/home', 'html')
  public async index() {
    this.$context.log.write('bla-bla-bla-')
    this.$context.log.write(this.style.link('test'))

    this.$context.response.setOutput(await this.load.view('common/home', {test: '213123123'}))
  }

  @GET('/redirect', 'html')
  public redirect() {
    this.$context.log.write('bla-bla-bla-')
    this.$context.response.redirect('google.com')
  }

  @Listing('controller/common/home/index', 'before')
  public commonHomeBefore(args) {
    console.log('commonHomeBefore')
    console.log(args)
  }

  @Listing('view/common/home', 'before')
  public viewCommonHomeBefore(args) {
    console.log('viewCommonHomeBefore')
    console.log(args)
  }

  @Listing('view/common/home', 'after')
  public viewCommonHomeAfter(args) {
    console.log('viewCommonHomeAfter')
    console.log(args)
  }
}
