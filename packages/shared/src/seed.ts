import { Job, FieldRecord, Approval, Invoice, CrewMember, DashboardMetrics, AIQueueItem } from './types';

export const SEED_JOBS: Job[] = [
  {
    id: 'job-001', title: 'Riverside Commercial HVAC Installation', description: 'Full HVAC system installation for 3-story commercial building including ductwork, units, and controls.',
    status: 'active', priority: 'high', clientName: 'Riverside Properties LLC', clientContact: 'James Harrington',
    siteAddress: '4521 Riverside Drive, Austin TX 78704', assignedCrew: ['crew-001', 'crew-002', 'crew-003'],
    projectManagerId: 'user-002', startDate: '2026-05-01', endDate: '2026-06-15',
    estimatedHours: 320, actualHours: 180, budget: 185000, spent: 92000,
    aiHealthScore: 87, aiRiskFlags: ['Weather delay risk - June forecasts'], tags: ['HVAC', 'commercial', 'installation'],
    orgId: 'org-001', createdAt: '2026-04-15T08:00:00Z', updatedAt: '2026-05-28T14:30:00Z'
  },
  {
    id: 'job-002', title: 'Downtown Office Electrical Retrofit', description: 'Complete electrical panel upgrade and LED retrofit for 12-floor office tower.',
    status: 'active', priority: 'critical', clientName: 'Apex Tower Management', clientContact: 'Sarah Chen',
    siteAddress: '100 Congress Ave, Austin TX 78701', assignedCrew: ['crew-004', 'crew-005'],
    projectManagerId: 'user-003', startDate: '2026-05-10', endDate: '2026-07-01',
    estimatedHours: 480, actualHours: 210, budget: 320000, spent: 145000,
    aiHealthScore: 72, aiRiskFlags: ['Budget overrun risk', 'Permit delay flagged'], tags: ['electrical', 'retrofit', 'commercial'],
    orgId: 'org-001', createdAt: '2026-04-20T09:00:00Z', updatedAt: '2026-05-29T10:00:00Z'
  },
  {
    id: 'job-003', title: 'Lakewood Residential Plumbing', description: 'Full plumbing remodel for luxury residential property including kitchen and 4 bathrooms.',
    status: 'pending', priority: 'medium', clientName: 'Mr & Mrs Patel', clientContact: 'Raj Patel',
    siteAddress: '2847 Lakewood Blvd, Austin TX 78703', assignedCrew: ['crew-006'],
    projectManagerId: 'user-002', startDate: '2026-06-01', endDate: '2026-06-30',
    estimatedHours: 120, actualHours: 0, budget: 45000, spent: 0,
    aiHealthScore: 95, aiRiskFlags: [], tags: ['plumbing', 'residential', 'remodel'],
    orgId: 'org-001', createdAt: '2026-05-15T11:00:00Z', updatedAt: '2026-05-25T09:00:00Z'
  },
  {
    id: 'job-004', title: 'Tech Campus Solar Panel Install', description: 'Install 450 solar panels across 3 rooftop zones with battery storage integration.',
    status: 'active', priority: 'high', clientName: 'InnovateTech Corp', clientContact: 'Diana Reyes',
    siteAddress: '9500 Research Blvd, Austin TX 78759', assignedCrew: ['crew-007', 'crew-008', 'crew-009'],
    projectManagerId: 'user-004', startDate: '2026-04-15', endDate: '2026-06-30',
    estimatedHours: 600, actualHours: 420, budget: 520000, spent: 380000,
    aiHealthScore: 91, aiRiskFlags: ['Supply chain delay - inverters'], tags: ['solar', 'renewable', 'commercial'],
    orgId: 'org-001', createdAt: '2026-04-01T07:00:00Z', updatedAt: '2026-05-30T08:00:00Z'
  },
  {
    id: 'job-005', title: 'Cedar Park Fire Suppression System', description: 'Install NFPA-compliant fire suppression system for warehouse facility.',
    status: 'completed', priority: 'high', clientName: 'Cedar Park Logistics', clientContact: 'Mike Johnson',
    siteAddress: '1200 Industrial Way, Cedar Park TX 78613', assignedCrew: ['crew-001', 'crew-004'],
    projectManagerId: 'user-003', startDate: '2026-03-01', endDate: '2026-04-30',
    estimatedHours: 240, actualHours: 228, budget: 95000, spent: 91500,
    aiHealthScore: 98, aiRiskFlags: [], tags: ['fire suppression', 'warehouse', 'safety'],
    orgId: 'org-001', createdAt: '2026-02-15T08:00:00Z', updatedAt: '2026-05-01T16:00:00Z'
  }
];

export const SEED_METRICS: DashboardMetrics = {
  totalJobs: 48, activeJobs: 12, completedJobs: 31, pendingApprovals: 7,
  totalRevenue: 2840000, outstandingInvoices: 345000, crewUtilization: 84, aiHealthScore: 88,
  weeklyJobData: [
    { day: 'Mon', jobs: 8, revenue: 42000 }, { day: 'Tue', jobs: 11, revenue: 58000 },
    { day: 'Wed', jobs: 9, revenue: 47000 }, { day: 'Thu', jobs: 13, revenue: 71000 },
    { day: 'Fri', jobs: 10, revenue: 53000 }, { day: 'Sat', jobs: 5, revenue: 28000 },
    { day: 'Sun', jobs: 3, revenue: 15000 }
  ],
  recentActivity: [
    { id: 'a1', type: 'field_record', message: 'New inspection submitted for Riverside HVAC', timestamp: '2026-05-30T08:15:00Z', userId: 'user-005', jobId: 'job-001' },
    { id: 'a2', type: 'approval', message: 'Invoice #INV-0042 approved by ops manager', timestamp: '2026-05-30T07:45:00Z', userId: 'user-002', jobId: 'job-002' },
    { id: 'a3', type: 'ai_alert', message: 'AI flagged budget overrun risk on Downtown Electrical', timestamp: '2026-05-30T07:00:00Z', userId: 'system', jobId: 'job-002' },
    { id: 'a4', type: 'crew', message: 'Crew Team Alpha dispatched to Tech Campus Solar', timestamp: '2026-05-29T16:30:00Z', userId: 'user-006', jobId: 'job-004' }
  ]
};

export const SEED_AI_QUEUE: AIQueueItem[] = [
  { id: 'ai-001', type: 'risk_alert', title: 'Budget Overrun Risk Detected', description: 'Downtown Electrical job is 45% through timeline but 65% through budget. Recommend immediate review.', priority: 'critical', confidence: 94, jobId: 'job-002', createdAt: '2026-05-30T07:00:00Z', status: 'pending' },
  { id: 'ai-002', type: 'approval_recommendation', title: 'Fast-track Approval Suggested', description: 'Field inspection for Riverside HVAC scores 96/100 safety compliance. AI recommends auto-approval.', priority: 'medium', confidence: 96, jobId: 'job-001', createdAt: '2026-05-30T08:15:00Z', status: 'pending' },
  { id: 'ai-003', type: 'schedule_optimization', title: 'Crew Reallocation Opportunity', description: 'Cedar Park job completion frees 2 certified techs. Suggest reassignment to Tech Campus Solar to close 3 days early.', priority: 'high', confidence: 88, createdAt: '2026-05-29T14:00:00Z', status: 'pending' },
  { id: 'ai-004', type: 'invoice_anomaly', title: 'Invoice Line Item Anomaly', description: 'INV-0043 material costs are 34% above historical average for similar solar jobs. Verify supplier pricing.', priority: 'medium', confidence: 81, jobId: 'job-004', createdAt: '2026-05-29T11:30:00Z', status: 'pending' }
];
