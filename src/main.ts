import { EventStoreDBClient } from '@eventstore/db-client';
import { NestFactory } from '@nestjs/core';
import {
  EventStoreDBEventStore,
  EventStoreDBEventSubscription,
  InMemoryEntityRepository,
} from '@pl-oss/adapter';
import { Environment as BaseEnvironment } from '@pl-oss/core';
import { PubSub } from 'graphql-subscriptions';
import { AppModule } from './app.module';
import {
  PlatformContext,
  OrderBookEventListener,
} from './platform-app';

interface Environment extends BaseEnvironment {
  eventStoreDBUrl: string;
  port: number;
}

function getEnvironment(): Environment {
  return {
    eventStoreDBUrl: process.env.EVENT_STORE_DB_URL ?? 'esdb://localhost:2113?tls=false',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
  };
}

function getContext(environment: Environment): PlatformContext {
  const eventStoreDBClient = EventStoreDBClient.connectionString(environment.eventStoreDBUrl);

  return {
    environment,
    eventSubscription: new EventStoreDBEventSubscription(eventStoreDBClient, 'start'),
    eventStore: new EventStoreDBEventStore(eventStoreDBClient),
    graphQLService: new PubSub(),
    orderBookEntityRepository: new InMemoryEntityRepository(),
  };
}

function setEventListeners(context: PlatformContext) {
  context.eventSubscription.register(new OrderBookEventListener(context));
}

async function startApp(context: PlatformContext): Promise<void> {
  const app = await NestFactory.create(AppModule.register(context));
  app.enableCors();
  await app.listen(context.environment.port as number);
}

async function bootstrap(environment: Environment) {
  const context = getContext(environment);
  setEventListeners(context);
  await startApp(context);
}

bootstrap(getEnvironment());
