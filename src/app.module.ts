import { DynamicModule, Provider } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  PlatformContext,
  PlatformMutationResolver,
  PlatformQueryResolver,
} from './platform-app';
import { PlatformService } from './platform-domain';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export class AppModule {
  static register(context: PlatformContext): DynamicModule {
    return {
      controllers: [AppController],
      imports: AppModule.getImports(),
      module: AppModule,
      providers: AppModule.getProviders(context),
    };
  }

  private static getImports(): DynamicModule[] {
    return [
      GraphQLModule.forRoot({
        autoSchemaFile: true,
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
      AppService,
      PlatformMutationResolver,
      PlatformQueryResolver,
    ];
  }
}
