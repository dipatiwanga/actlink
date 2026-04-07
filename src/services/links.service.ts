import { db } from '../db';
import { links } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export class LinksService {
  async listLinks(userId: number) {
    return await db
      .select()
      .from(links)
      .where(eq(links.userId, userId));
  }

  async createLink(userId: number, data: { title: string; url: string; shortCode?: string }) {
    const { title, url, shortCode } = data;
    const code = shortCode || nanoid(6);

    try {
      await db.insert(links).values({
        userId,
        title,
        url,
        shortCode: code,
      });

      return { success: true, message: 'Link created', shortCode: code };
    } catch (error) {
      throw new Error('Short code already taken or invalid');
    }
  }

  async updateLink(id: string, userId: number, data: { title?: string; url?: string }) {
    const { title, url } = data;

    const result = await db
      .update(links)
      .set({ title, url })
      .where(
        and(
          eq(links.id, parseInt(id)),
          eq(links.userId, userId)
        )
      );

    return { success: true, message: 'Link updated' };
  }

  async deleteLink(id: string, userId: number) {
    await db
      .delete(links)
      .where(
        and(
          eq(links.id, parseInt(id)),
          eq(links.userId, userId)
        )
      );

    return { success: true, message: 'Link deleted' };
  }
}

export const linksService = new LinksService();
