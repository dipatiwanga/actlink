import { Elysia, t } from 'elysia';
import { db } from '../db';
import { clickLogs, links } from '../db/schema';
import { eq, sql, and } from 'drizzle-orm';
import { authPlugin } from '../plugins/auth';

export const analyticsController = new Elysia({ prefix: '/analytics' })
  .use(authPlugin)
  .guard({ isAuth: true })
  .get(
    '/:linkId',
    async ({ params, user, set }) => {
      const { linkId } = params;

      // Verify link ownership
      const [link] = await db
        .select()
        .from(links)
        .where(
          and(
            eq(links.id, parseInt(linkId)),
            eq(links.userId, user!.id)
          )
        )
        .limit(1);

      if (!link) {
        set.status = 404;
        return { success: false, message: 'Link not found' };
      }

      // Get clicks per day (last 7 days)
      const dailyStats = await db
        .select({
          date: sql<string>`DATE(${clickLogs.createdAt})`,
          count: sql<number>`count(${clickLogs.id})`,
        })
        .from(clickLogs)
        .where(eq(clickLogs.linkId, link.id))
        .groupBy(sql`DATE(${clickLogs.createdAt})`)
        .orderBy(sql`DATE(${clickLogs.createdAt})`);

      return {
        success: true,
        data: {
          link,
          dailyStats,
        },
      };
    },
    {
      params: t.Object({
        linkId: t.String(),
      }),
      detail: {
        tags: ['Analytics'],
        summary: 'Get detailed analytics for a link',
      },
    }
  );
