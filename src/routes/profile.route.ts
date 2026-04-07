import { Elysia, t } from 'elysia';
import { profileService } from '../services/profile.service';

export const profileRoutes = new Elysia({ prefix: '/profile' })
  .get(
    '/:username',
    async ({ params, set }) => {
      try {
        const profile = await profileService.getPublicProfile(params.username);
        return {
          success: true,
          data: profile,
        };
      } catch (error: any) {
        set.status = 404;
        return { success: false, message: error.message };
      }
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
