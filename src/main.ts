import { EventStoreDBClient } from '@eventstore/db-client';
import { NestFactory } from '@nestjs/core';
import {
  EventStoreDBEventStore,
  EventStoreDBEventSubscription,
  InMemoryEntityRepository,
} from '@pl-oss/adapter';
import { Environment as BaseEnvironment } from '@pl-oss/core';
import * as dotenv from 'dotenv';
import { PubSub } from 'graphql-subscriptions';
import { AppModule } from './app.module';
import {
  PlatformContext,
  OrderBookEventListener,
  OrderEventListener,
} from './platform-app';

dotenv.config();

interface Environment extends BaseEnvironment {
  eventStoreDBUrl: string;
  port: number;
}

function getContext(environment: Environment): PlatformContext {
  const eventStoreDBClient = EventStoreDBClient.connectionString(environment.eventStoreDBUrl);

  return {
    environment,
    eventSubscription: new EventStoreDBEventSubscription(eventStoreDBClient, 'start'),
    eventStore: new EventStoreDBEventStore(eventStoreDBClient),
    graphQLService: new PubSub(),
    orderBookEntityRepository: new InMemoryEntityRepository(),
    orderEntityRepository: new InMemoryEntityRepository(),
  };
}

function setEventListeners(context: PlatformContext) {
  context.eventSubscription.register(new OrderBookEventListener(context));
  context.eventSubscription.register(new OrderEventListener(context));
}

async function bootstrap() {
  const environment = {
    eventStoreDBUrl: process.env.EVENT_STORE_DB_URL,
    port: parseInt(process.env.PORT, 10),
  };

  const context = getContext(environment);
  setEventListeners(context);

  const app = await NestFactory.create(AppModule.register(context), { cors: true });
  await app.listen(context.environment.port as number);
}

bootstrap();
