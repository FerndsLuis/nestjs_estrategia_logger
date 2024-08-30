import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);
    const resolverName = gqlCtx.getInfo().parentType.name;
    const methodName = gqlCtx.getInfo().fieldName;
    const args = gqlCtx.getArgs();

    console.log(`Calling ${resolverName}.${methodName} with args:`, args);

    return next
      .handle()
      .pipe(
        tap((result) =>
          console.log(
            `Returned from ${resolverName}.${methodName} with result:`,
            result,
          ),
        ),
      );
  }
}
