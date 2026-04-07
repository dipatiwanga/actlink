import { db } from '../db';
import { clickLogs, links } from '../db/schema';
import { eq, sql, and } from 'drizzle-orm';

export class AnalyticsService {
  async getLinkAnalytics(linkId: string, userId: number) {
    // Verify link ownership
    const [link] = await db
      .select()
      .from(links)
      .where(
        and(
          eq(links.id, parseInt(linkId)),
          eq(links.userId, userId)
        )
      )
      .limit(1);

    if (!link) {
      throw new Error('Link not found');
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
      link,
      dailyStats,
    };
  }
}

export const analyticsService = new AnalyticsService();
