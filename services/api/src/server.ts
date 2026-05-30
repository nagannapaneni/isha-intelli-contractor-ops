import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { jobsRouter } from './routes/jobs';
import { fieldRecordsRouter } from './routes/fieldRecords';
import { approvalsRouter } from './routes/approvals';
import { invoicesRouter } from './routes/invoices';
import { metricsRouter } from './routes/metrics';
import { errorHandler } from './middleware/error';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Isha Intelli API', version: '1.0.0', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/jobs', jobsRouter);
app.use('/api/field-records', fieldRecordsRouter);
app.use('/api/approvals', approvalsRouter);
app.use('/api/invoices', invoicesRouter);
app.use('/api/metrics', metricsRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n  Isha Intelli API running on http://localhost:${PORT}`);
  console.log(`  Health check: http://localhost:${PORT}/health\n`);
});

export default app;
