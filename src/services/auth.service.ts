import { db } from '../db';
import { users } from '../db/schema';
import { eq, or } from 'drizzle-orm';

export class AuthService {
  async registerUser(data: any) {
    const { username, email, password } = data;

    // Check if username or email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(or(eq(users.username, username), eq(users.email, email)))
      .limit(1);

    if (existingUser.length > 0) {
      throw new Error('Username or email already exists');
    }

    // Hash password using Bun's built-in utility
    const hashedPassword = await Bun.password.hash(password);

    // Insert user into database
    await db.insert(users).values({
      username,
      email,
      password: hashedPassword,
    });

    // Return user without password
    const [newUser] = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    return newUser;
  }
}

export const authService = new AuthService();
