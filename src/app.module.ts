import { DynamicModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EventStore } from '@pl-oss/core';
import { PlatformService } from './platform-domain';
import { PlatformMutationResolver } from './platform-app/resolver/platform-mutation-resolver';
import { PlatformQueryResolver } from './platform-app/resolver/platform-query-resolver';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export class AppModule {
  static register(eventStore: EventStore): DynamicModule {
    const controllers = [AppController];

    const imports = [
      GraphQLModule.forRoot({
        autoSchemaFile: true,
        installSubscriptionHandlers: true,
        introspection: true,
        playground: true,
      }),
    ];

    const platformService = new PlatformService(eventStore);

    const providers = [
      { provide: 'PlatformService', useValue: platformService },
      AppService,
      PlatformMutationResolver,
      PlatformQueryResolver,
    ];

    return {
      controllers,
      imports,
      module: AppModule,
      providers,
    };
  }
}
