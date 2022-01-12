import { EventStoreDBClient } from '@eventstore/db-client';
import { NestFactory } from '@nestjs/core';
import { EventStoreDBEventStore } from '@pl-oss/adapter';
import { AppModule } from './app.module';

interface Environment {
  eventStoreDBUrl: string;
  port: number;
}

function getEnvironment(): Environment {
  return {
    eventStoreDBUrl: process.env.EVENT_STORE_DB_URL ?? 'esdb://localhost:2113?tls=false',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
  };
}

async function bootstrap(environment: Environment) {
  const eventStoreDBClient = EventStoreDBClient.connectionString(environment.eventStoreDBUrl);
  const eventStore = new EventStoreDBEventStore(eventStoreDBClient);

  const app = await NestFactory.create(AppModule.register(eventStore));
  await app.listen(environment.port);
}

bootstrap(getEnvironment());
