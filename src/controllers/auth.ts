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
      detail: {
        tags: ['Auth'],
        summary: 'Register a new user',
      },
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
      detail: {
        tags: ['Auth'],
        summary: 'Login user and get token',
      },
    }
  )
  .patch(
    '/profile',
    async ({ body, user, set }) => {
      const { username, email } = body;

      await db
        .update(users)
        .set({ username, email })
        .where(eq(users.id, user!.id));

      return { success: true, message: 'Profile updated successfully' };
    },
    {
      isAuth: true,
      body: t.Object({
        username: t.String(),
        email: t.String({ format: 'email' }),
      }),
      detail: {
        tags: ['Auth'],
        summary: 'Update user profile',
      },
    }
  )
  .patch(
    '/password',
    async ({ body, user, set }) => {
      const { oldPassword, newPassword } = body;

      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, user!.id))
        .limit(1);

      const isMatch = await Bun.password.verify(oldPassword, dbUser.password);
      if (!isMatch) {
        set.status = 400;
        return { success: false, message: 'Invalid old password' };
      }

      const hashedPassword = await Bun.password.hash(newPassword);
      await db
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, user!.id));

      return { success: true, message: 'Password updated successfully' };
    },
    {
      isAuth: true,
      body: t.Object({
        oldPassword: t.String(),
        newPassword: t.String({ minLength: 8 }),
      }),
      detail: {
        tags: ['Auth'],
        summary: 'Update user password',
      },
    }
  );
