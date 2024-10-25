import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import { throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private logger: LoggerService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const {method, url, body, headers} = request;
        const start = Date.now();
        
        this.logger.log(`Request ${method} ${url} ${JSON.stringify(body)} ${JSON.stringify(headers)}`);

        return next
            .handle()
            .pipe( 
                tap((response) => {
                    const end = Date.now();
                    const responseTime = end - start;
                    this.logger.log(`Response ${method} ${url} ${responseTime}ms ${JSON.stringify(response)}`);
                }),
                catchError((error) => {
                    const end = Date.now();
                    const responseTime = end - start;
                    this.logger.error(
                    `Request ${method} ${url} 
                    Request header:  ${JSON.stringify(headers)}
                    Request body: ${JSON.stringify(body)}
                    Response time: ${responseTime}ms - Error name: ${error.name}
                    ${error.stack}`,
                    );
                    return throwError(() => error);
                }),
            );
    }
}