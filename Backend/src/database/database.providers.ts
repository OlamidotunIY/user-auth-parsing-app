import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: 'database.sqlite',
        synchronize: false, // For development only; do not use in production
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Point to all entity files
      });

      return dataSource.initialize();
    },
  },
];
