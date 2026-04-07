import { Elysia, t } from 'elysia';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { authPlugin } from '../plugins/auth';

export const authController = new Elysia({ prefix: '/auth' })
  .use(authPlugin)
  .post(
    '/register',
    async ({ body, set }) => {
      const { username, email, password } = body;

      // Check if user exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existingUser.length > 0) {
        set.status = 400;
        return { success: false, message: 'User already exists' };
      }

      // Hash password
      const hashedPassword = await Bun.password.hash(password);

      // Create user
      await db.insert(users).values({
        username,
        email,
        password: hashedPassword,
      });

      return { success: true, message: 'User registered successfully' };
    },
    {
      body: t.Object({
        username: t.String(),
        email: t.String({ format: 'email' }),
        password: t.String({ minLength: 8 }),
      }),
    }
  )
  .post(
    '/login',
    async ({ body, jwt, set }) => {
      const { email, password } = body;

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user) {
        set.status = 401;
        return { success: false, message: 'Invalid credentials' };
      }

      const isPasswordCorrect = await Bun.password.verify(password, user.password);

      if (!isPasswordCorrect) {
        set.status = 401;
        return { success: false, message: 'Invalid credentials' };
      }

      const token = await jwt.sign({
        id: user.id,
        username: user.username,
      });

      return {
        success: true,
        message: 'Login successful',
        token,
      };
    },
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
        password: t.String(),
      }),
    }
  );
