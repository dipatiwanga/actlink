import { Elysia, t } from 'elysia';
import { db } from '../db';
import { links } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { authPlugin } from '../plugins/auth';
import { nanoid } from 'nanoid'; // Need to install nanoid for short codes

export const linksController = new Elysia({ prefix: '/links' })
  .use(authPlugin)
  .guard({ isAuth: true }) // Protected routes
  .get('/', async ({ user }) => {
    const userLinks = await db
      .select()
      .from(links)
      .where(eq(links.userId, user!.id));

    return { success: true, data: userLinks };
  }, {
    detail: {
      tags: ['Links'],
      summary: 'List all links for authenticated user',
    }
  })
  .post(
    '/',
    async ({ body, user, set }) => {
      const { title, url, shortCode } = body;
      
      const code = shortCode || nanoid(6);

      try {
        await db.insert(links).values({
          userId: user!.id,
          title,
          url,
          shortCode: code,
        });

        return { success: true, message: 'Link created', shortCode: code };
      } catch (error) {
        set.status = 400;
        return { success: false, message: 'Short code already taken or invalid' };
      }
    },
    {
      body: t.Object({
        title: t.String(),
        url: t.String({ format: 'uri' }),
        shortCode: t.Optional(t.String({ maxLength: 10 })),
      }),
      detail: {
        tags: ['Links'],
        summary: 'Create a new short link',
      },
    }
  )
  .patch(
    '/:id',
    async ({ params, body, user, set }) => {
      const { id } = params;
      const { title, url } = body;

      const result = await db
        .update(links)
        .set({ title, url })
        .where(
          and(
            eq(links.id, parseInt(id)),
            eq(links.userId, user!.id)
          )
        );

      return { success: true, message: 'Link updated' };
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Object({
        title: t.Optional(t.String()),
        url: t.Optional(t.String({ format: 'uri' })),
      }),
      detail: {
        tags: ['Links'],
        summary: 'Update an existing link',
      },
    }
  )
  .delete('/:id', async ({ params, user }) => {
    const { id } = params;

    await db
      .delete(links)
      .where(
        and(
          eq(links.id, parseInt(id)),
          eq(links.userId, user!.id)
        )
      );

    return { success: true, message: 'Link deleted' };
  }, {
    params: t.Object({ id: t.String() }),
    detail: {
      tags: ['Links'],
      summary: 'Delete a link',
    },
  });
