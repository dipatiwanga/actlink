import { Elysia, t } from 'elysia';
import { authService } from '../services/auth.service';

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post(
    '/register',
    async ({ body, set }) => {
      try {
        const newUser = await authService.registerUser(body);
        set.status = 201;
        return {
          success: true,
          data: newUser,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          message: error.message,
        };
      }
    },
    {
      body: t.Object({
        username: t.String(),
        email: t.String({ format: 'email' }),
        password: t.String({ minLength: 8 }),
      }),
      detail: {
        tags: ['Auth'],
        summary: 'Register a new user',
      },
    }
  );
