import { Controller } from 'rapin/lib/common'
import { GET } from 'rapin/lib/helper/request'
import { Listing } from 'rapin/lib/helper/event'

export class ControllerCommonHome extends Controller {
  @GET('/home', 'html')
  public index() {
    this.log.write('bla-bla-bla-')
    this.log.write(this.style.link('test'))
    this.response.setOutput(this.load.view('common/home', {test: '213123123'}))
  }

  @GET('/redirect', 'html')
  public redirect() {
    this.log.write('bla-bla-bla-')
    this.response.redirect('google.com')
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
