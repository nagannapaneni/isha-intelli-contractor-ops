// ============================================
// ISHA INTELLI - Core Domain Types
// ============================================

export type JobStatus = 'pending' | 'active' | 'on_hold' | 'completed' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type RecordType = 'inspection' | 'photo' | 'incident' | 'progress' | 'material' | 'safety';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'escalated';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'disputed';
export type UserRole = 'admin' | 'ops_manager' | 'project_manager' | 'dispatcher' | 'finance' | 'field_tech';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  orgId: string;
  phone?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  plan: 'starter' | 'professional' | 'enterprise';
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  priority: Priority;
  clientName: string;
  clientContact?: string;
  siteAddress: string;
  coordinates?: { lat: number; lng: number };
  assignedCrew: string[];
  projectManagerId: string;
  startDate: string;
  endDate?: string;
  estimatedHours: number;
  actualHours?: number;
  budget: number;
  spent?: number;
  aiHealthScore: number;
  aiRiskFlags: string[];
  tags: string[];
  orgId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FieldRecord {
  id: string;
  jobId: string;
  type: RecordType;
  title: string;
  description: string;
  submittedBy: string;
  submittedAt: string;
  photos: string[];
  location?: { lat: number; lng: number };
  aiSummary?: string;
  aiRiskScore: number;
  aiTags: string[];
  requiresApproval: boolean;
  approvalStatus?: ApprovalStatus;
  metadata: Record<string, unknown>;
  orgId: string;
}

export interface Approval {
  id: string;
  type: 'field_record' | 'invoice' | 'change_order' | 'material_request';
  referenceId: string;
  title: string;
  description: string;
  requestedBy: string;
  requestedAt: string;
  assignedTo: string;
  status: ApprovalStatus;
  priority: Priority;
  aiRecommendation?: string;
  aiConfidence?: number;
  resolvedBy?: string;
  resolvedAt?: string;
  notes?: string;
  orgId: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: string;
}

export interface Invoice {
  id: string;
  jobId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  clientName: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  notes?: string;
  orgId: string;
  createdAt: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  certifications: string[];
  availability: 'available' | 'assigned' | 'off_duty' | 'leave';
  currentJobId?: string;
  phone: string;
  email: string;
  orgId: string;
}

export interface DashboardMetrics {
  totalJobs: number;
  activeJobs: number;
  completedJobs: number;
  pendingApprovals: number;
  totalRevenue: number;
  outstandingInvoices: number;
  crewUtilization: number;
  aiHealthScore: number;
  weeklyJobData: { day: string; jobs: number; revenue: number }[];
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  userId: string;
  jobId?: string;
}

export interface AIQueueItem {
  id: string;
  type: 'risk_alert' | 'approval_recommendation' | 'schedule_optimization' | 'invoice_anomaly';
  title: string;
  description: string;
  priority: Priority;
  confidence: number;
  jobId?: string;
  createdAt: string;
  status: 'pending' | 'actioned' | 'dismissed';
}
