import { Elysia } from 'elysia';
import { db } from './db';
import { users } from './db/schema';

const app = new Elysia()
  .get('/', async () => {
    try {
      // Simple healthcheck by querying the database
      const result = await db.select().from(users).limit(1);
      return {
        status: 'ok',
        database: 'connected',
        message: 'Welcome to Actlink API',
        data_preview: result,
      };
    } catch (error) {
      console.error('Database connection error:', error);
      return {
        status: 'partial_ok',
        database: 'disconnected',
        message: 'Server is running, but database connection failed. Please check your .env configuration.',
      };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
