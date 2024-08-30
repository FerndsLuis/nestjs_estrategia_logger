import { Injectable } from '@nestjs/common';

function LogMethod(): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(
        `Calling ${String(propertyKey)} with args: ${JSON.stringify(args)}`,
      );
      const result = originalMethod.apply(this, args);
      console.log(
        `Returned from ${String(propertyKey)} with result: ${result}`,
      );
      return result;
    };

    return descriptor;
  };
}

@Injectable()
export class AppService {
  @LogMethod()
  getHello(id: number, value: string): string {
    this.getTestService(id);
    return `Hello World! ${value}`;
  }

  @LogMethod()
  getTestService(id: number): number {
    return id + 1;
  }
}
