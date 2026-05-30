import { Router, Request, Response } from 'express';
import { SEED_METRICS, SEED_AI_QUEUE } from '../../../../packages/shared/src/seed';

export const metricsRouter = Router();

metricsRouter.get('/dashboard', (_req: Request, res: Response) => {
  res.json({ data: SEED_METRICS });
});

metricsRouter.get('/ai-queue', (_req: Request, res: Response) => {
  res.json({ data: SEED_AI_QUEUE, total: SEED_AI_QUEUE.length });
});
