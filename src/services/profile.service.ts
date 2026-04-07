import { db } from '../db';
import { users, links } from '../db/schema';
import { eq } from 'drizzle-orm';

export class ProfileService {
  async getPublicProfile(username: string) {
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
      throw new Error('User not found');
    }

    // Fetch user's public links
    const userLinks = await db
      .select()
      .from(links)
      .where(eq(links.userId, user.id))
      .orderBy(links.createdAt);

    return {
      user,
      links: userLinks,
    };
  }
}

export const profileService = new ProfileService();
