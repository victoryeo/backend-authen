import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  // Catch all exception
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    let status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // For OpenAPI validate
    if (exception.statusCode) {
      status = exception.statusCode;
    }

    const errorRes = {
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        exception.message?.error ||
        exception.message ||
        // For OpenAPI validate
        exception.data?.((d: { message: string }) => d.message) ||
        // For general exception, such as Promise unhandled exception
        exception ||
        'INTERNAL SERVER ERROR',
    };

    Logger.error(
      `${errorRes.timestamp} ${request.method} ${request.url} ${errorRes.code} ${errorRes.message}`,
      JSON.stringify(errorRes),
      'ExceptionFilter'
    );

    response.status(status || HttpStatus.INTERNAL_SERVER_ERROR).json(errorRes);
  }
}
