import { Elysia, t } from 'elysia';
import { linksService } from '../services/links.service';
import { authPlugin } from '../plugins/auth';

export const linksRoutes = new Elysia({ prefix: '/links' })
  .use(authPlugin)
  .guard({ isAuth: true })
  .get('/', async ({ user }: any) => {
    const userLinks = await linksService.listLinks(user!.id);
    return { success: true, data: userLinks };
  }, {
    detail: {
      tags: ['Links'],
      summary: 'List all links for authenticated user',
    }
  })
  .post(
    '/',
    async ({ body, user, set }: any) => {
      try {
        return await linksService.createLink(user!.id, body);
      } catch (error: any) {
        set.status = 400;
        return { success: false, message: error.message };
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
    async ({ params, body, user }: any) => {
      const { id } = params;
      return await linksService.updateLink(id, user!.id, body);
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
  .delete('/:id', async ({ params, user }: any) => {
    const { id } = params;
    return await linksService.deleteLink(id, user!.id);
  }, {
    params: t.Object({ id: t.String() }),
    detail: {
      tags: ['Links'],
      summary: 'Delete a link',
    },
  });
