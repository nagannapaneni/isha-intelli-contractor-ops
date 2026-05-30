import { Router, Request, Response } from 'express';
import { SEED_JOBS } from '../../../../packages/shared/src/seed';
import { Job } from '../../../../packages/shared/src/types';

export const jobsRouter = Router();
let jobs: Job[] = [...SEED_JOBS];

jobsRouter.get('/', (req: Request, res: Response) => {
  const { status, priority, search } = req.query;
  let filtered = [...jobs];
  if (status) filtered = filtered.filter(j => j.status === status);
  if (priority) filtered = filtered.filter(j => j.priority === priority);
  if (search) { const s = (search as string).toLowerCase(); filtered = filtered.filter(j => j.title.toLowerCase().includes(s) || j.clientName.toLowerCase().includes(s)); }
  res.json({ data: filtered, total: filtered.length });
});

jobsRouter.get('/:id', (req: Request, res: Response) => {
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json({ data: job });
});

jobsRouter.post('/', (req: Request, res: Response) => {
  const newJob: Job = { ...req.body, id: `job-${Date.now()}`, aiHealthScore: 100, aiRiskFlags: [], orgId: 'org-001', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  jobs.push(newJob);
  res.status(201).json({ data: newJob });
});

jobsRouter.patch('/:id', (req: Request, res: Response) => {
  const idx = jobs.findIndex(j => j.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Job not found' });
  jobs[idx] = { ...jobs[idx], ...req.body, updatedAt: new Date().toISOString() };
  res.json({ data: jobs[idx] });
});

jobsRouter.delete('/:id', (req: Request, res: Response) => {
  const idx = jobs.findIndex(j => j.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Job not found' });
  jobs.splice(idx, 1);
  res.json({ message: 'Job deleted' });
});
