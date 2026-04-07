import { Elysia, t } from 'elysia';
import { authRoutes } from './routes/auth.route';
import { linksController } from './controllers/links';
import { analyticsController } from './controllers/analytics';
import { profileController } from './controllers/profile';
import { db } from './db';
import { clickLogs, links } from './db/schema';
import { eq } from 'drizzle-orm';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: 'Actlink API Documentation',
        version: '1.0.0',
        description: 'API for link management and redirection service',
      },
      tags: [
        { name: 'Auth', description: 'Authentication endpoints' },
        { name: 'Links', description: 'Link management endpoints' },
        { name: 'Analytics', description: 'Analytics endpoints' },
      ],
    }
  }))
  .get('/', () => ({
    status: 'ok',
    message: 'Welcome to Actlink API',
    version: '1.0.0',
  }))
  // Redirection route (Public)
  .get('/s/:shortCode', async ({ params, set, headers }) => {
    const { shortCode } = params;
    
    const [link] = await db
      .select()
      .from(links)
      .where(eq(links.shortCode, shortCode))
      .limit(1);

    if (!link) {
      set.status = 404;
      return { success: false, message: 'Link not found' };
    }

    // Capture User-Agent and increment clicks (async)
    Promise.all([
      db.update(links)
        .set({ clicks: (link.clicks || 0) + 1 })
        .where(eq(links.id, link.id))
        .execute(),
      db.insert(clickLogs)
        .values({
          linkId: link.id,
          userAgent: headers['user-agent'] || 'unknown',
        })
        .execute()
    ]);

    set.redirect = link.url;
  }, {
    params: t.Object({
      shortCode: t.String()
    })
  })
  // Grouped Routes
  .use(authRoutes)
  .use(linksController)
  .use(analyticsController)
  .use(profileController)
  .listen(3000);

console.log(
  `🚀 Actlink API is running at ${app.server?.hostname}:${app.server?.port}`
);
