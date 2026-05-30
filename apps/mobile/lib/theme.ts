export const COLORS = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  secondary: '#10B981',
  accent: '#F59E0B',
  danger: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  info: '#3B82F6',
  background: '#0F0F1A',
  surface: '#1A1A2E',
  surfaceElevated: '#252540',
  border: '#2D2D4E',
  borderLight: '#3D3D5C',
  text: '#F8F8FF',
  textSecondary: '#A0A0C0',
  textMuted: '#606080',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.7)',
  gradientStart: '#6366F1',
  gradientEnd: '#8B5CF6',
  cardShadow: 'rgba(99,102,241,0.15)',
};

export const FONTS = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const SPACING = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32,
};

export const RADIUS = {
  sm: 6, md: 10, lg: 16, xl: 24, full: 999,
};

export const SHADOWS = {
  card: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  button: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
};

export const priorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return COLORS.danger;
    case 'high': return COLORS.accent;
    case 'medium': return COLORS.info;
    case 'low': return COLORS.success;
    default: return COLORS.textMuted;
  }
};

export const statusColor = (status: string) => {
  switch (status) {
    case 'active': return COLORS.success;
    case 'completed': return COLORS.info;
    case 'pending': return COLORS.accent;
    case 'on_hold': return COLORS.warning;
    case 'cancelled': return COLORS.danger;
    default: return COLORS.textMuted;
  }
};
