import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PlatformMutationResolver } from './platform-app/resolver/platform-mutation-resolver';
import { PlatformQueryResolver } from './platform-app/resolver/platform-query-resolver';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],

  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      introspection: true,
      playground: true,
    }),
  ],

  providers: [
    AppService,
    PlatformMutationResolver,
    PlatformQueryResolver,
  ],
})
export class AppModule {}
