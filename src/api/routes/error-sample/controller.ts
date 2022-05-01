import { Get, JsonController } from 'routing-controllers'

@JsonController('/error-sample')
export class ErrorSampleController {
  @Get('')
  getAll() {
    throw new Error('This is an error example')
  }
}
