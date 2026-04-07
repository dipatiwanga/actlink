import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';

export const authPlugin = new Elysia({ name: 'auth' })
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET!,
    })
  )
  .derive(async ({ jwt, headers: { authorization } }) => {
    if (!authorization) return { user: null };

    const token = authorization.split(' ')[1];
    const user = await jwt.verify(token);

    return { user };
  })
  .macro(({ onBeforeHandle }) => ({
    isAuth(enabled: boolean) {
      if (!enabled) return;

      onBeforeHandle(({ user, set }) => {
        if (!user) {
          set.status = 401;
          return {
            success: false,
            message: 'Unauthorized',
          };
        }
      });
    },
  }));
