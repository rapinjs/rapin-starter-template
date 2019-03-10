export default class testPlugin {
  public beforeInitRegistry() {
    console.log('beforeInitRegistry')
  }

  public afterInitRegistry() {
    console.log('afterInitRegistry')
  }

  public onRequest({route}) {
    console.log('onRequest')
    console.log(route)
  }

  public onError() {
    console.log('onError')
  }

  public onBeforeInitRouter() {
    console.log('onBeforeInitRouter')
  }
  public onAfterInitRouter() {
    console.log('onAfterInitRouter')
  }

  public onImageResizeAfter(data) {
    console.log('onImageResizeAfter')
    return data
  }
}