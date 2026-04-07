import { Elysia, t } from 'elysia';
import { analyticsService } from '../services/analytics.service';
import { authPlugin } from '../plugins/auth';

export const analyticsRoutes = new Elysia({ prefix: '/analytics' })
  .use(authPlugin)
  .guard({ isAuth: true })
  .get(
    '/:linkId',
    async ({ params, user, set }: any) => {
      try {
        const stats = await analyticsService.getLinkAnalytics(params.linkId, user!.id);
        return {
          success: true,
          data: stats,
        };
      } catch (error: any) {
        set.status = 404;
        return { success: false, message: error.message };
      }
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
