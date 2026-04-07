import { Elysia, t } from 'elysia';
import { db } from '../db';
import { users, links } from '../db/schema';
import { eq } from 'drizzle-orm';

export const profileController = new Elysia({ prefix: '/profile' })
  .get(
    '/:username',
    async ({ params, set }) => {
      const { username } = params;

      // Fetch user info
      const [user] = await db
        .select({
          id: users.id,
          username: users.username,
          bio: users.bio,
          avatarUrl: users.avatarUrl,
        })
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      if (!user) {
        set.status = 404;
        return { success: false, message: 'User not found' };
      }

      // Fetch user's public links
      const userLinks = await db
        .select()
        .from(links)
        .where(eq(links.userId, user.id))
        .orderBy(links.createdAt);

      return {
        success: true,
        data: {
          user,
          links: userLinks,
        },
      };
    },
    {
      params: t.Object({
        username: t.String(),
      }),
      detail: {
        tags: ['Profile'],
        summary: 'Get public profile and links',
      },
    }
  );
