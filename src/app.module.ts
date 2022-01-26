import { DynamicModule, Provider } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  OrderBookResolver,
  PlatformContext,
  PlatformMutationResolver,
  PlatformQueryResolver,
} from './platform-app';
import { PlatformService } from './platform-domain';

export class AppModule {
  static register(context: PlatformContext): DynamicModule {
    return {
      imports: AppModule.getImports(),
      module: AppModule,
      providers: AppModule.getProviders(context),
    };
  }

  private static getImports(): DynamicModule[] {
    return [
      GraphQLModule.forRoot({
        autoSchemaFile: true,
        cors: true,
        installSubscriptionHandlers: true,
        introspection: true,
        playground: true,
      }),
    ];
  }

  private static getProviders(context: PlatformContext): Provider[] {
    const platformService = new PlatformService(context.eventStore);

    return [
      { provide: 'Context', useValue: context },
      { provide: 'PlatformService', useValue: platformService },
      OrderBookResolver,
      PlatformMutationResolver,
      PlatformQueryResolver,
    ];
  }
}
