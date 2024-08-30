import { UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Query, Resolver } from '@nestjs/graphql';
import { LoggingInterceptor } from './logger/logging.interceptor';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => Boolean)
  @UseInterceptors(LoggingInterceptor)
  getHello(): boolean {
    this.appService.getHello(100, 'arvore');

    return true;
  }
}
