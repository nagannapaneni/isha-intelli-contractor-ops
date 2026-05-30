import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../lib/theme';

const USER = { name: 'Alex Rivera', role: 'Operations Manager', email: 'alex.rivera@ishaintelli.com', phone: '+1 (512) 555-0192', org: 'Isha Intelli LLC', plan: 'Enterprise', avatar: 'AR' };

const STATS = [
  { label: 'Jobs Managed', value: '48', icon: '🏗️' },
  { label: 'Approvals', value: '127', icon: '✅' },
  { label: 'Field Records', value: '342', icon: '📋' },
  { label: 'AI Actions', value: '89', icon: '🧠' },
];

const MENU_ITEMS = [
  { icon: '🔔', label: 'Notifications', sub: 'Push alerts & email digests' },
  { icon: '🔒', label: 'Security', sub: 'Password, 2FA, sessions' },
  { icon: '🏢', label: 'Organization', sub: 'Isha Intelli LLC - Enterprise' },
  { icon: '🧠', label: 'AI Preferences', sub: 'Routing rules & thresholds' },
  { icon: '📤', label: 'Export Data', sub: 'Reports, invoices, records' },
  { icon: '📞', label: 'Support', sub: '24/7 enterprise support' },
];

export const ProfileScreen = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>👤 Profile</Text>
      </View>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{USER.avatar}</Text>
        </View>
        <Text style={styles.name}>{USER.name}</Text>
        <Text style={styles.role}>{USER.role}</Text>
        <View style={styles.planBadge}>
          <Text style={styles.planText}>⭐ {USER.plan}</Text>
        </View>
        <Text style={styles.email}>{USER.email}</Text>
      </View>
      <View style={styles.statsGrid}>
        {STATS.map((s, i) => (
          <View key={i} style={styles.statCard}>
            <Text style={styles.statIcon}>{s.icon}</Text>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.menuSection}>
        {MENU_ITEMS.map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={styles.menuText}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuSub}>{item.sub}</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>🚪 Sign Out</Text>
      </TouchableOpacity>
      <Text style={styles.version}>Isha Intelli v1.0.0 • Enterprise</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SPACING.xl },
  title: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.text },
  profileCard: { margin: SPACING.xl, backgroundColor: COLORS.surface, borderRadius: RADIUS.xl, padding: SPACING.xxl, alignItems: 'center', ...SHADOWS.card },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.md },
  avatarText: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.white },
  name: { fontSize: FONTS.xl, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  role: { fontSize: FONTS.md, color: COLORS.textSecondary, marginBottom: SPACING.sm },
  planBadge: { backgroundColor: COLORS.accent + '20', borderWidth: 1, borderColor: COLORS.accent, borderRadius: RADIUS.full, paddingHorizontal: SPACING.md, paddingVertical: 4, marginBottom: SPACING.sm },
  planText: { fontSize: FONTS.sm, color: COLORS.accent, fontWeight: '700' },
  email: { fontSize: FONTS.sm, color: COLORS.textMuted },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SPACING.xl, gap: SPACING.md, marginBottom: SPACING.xl },
  statCard: { width: '45%', flex: 1, backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, alignItems: 'center', ...SHADOWS.card },
  statIcon: { fontSize: 28, marginBottom: SPACING.sm },
  statValue: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.primary, marginBottom: 2 },
  statLabel: { fontSize: FONTS.xs, color: COLORS.textMuted, textAlign: 'center' },
  menuSection: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.xl },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.sm },
  menuIcon: { fontSize: 24, marginRight: SPACING.md },
  menuText: { flex: 1 },
  menuLabel: { fontSize: FONTS.md, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  menuSub: { fontSize: FONTS.xs, color: COLORS.textMuted },
  menuArrow: { fontSize: FONTS.xl, color: COLORS.textMuted },
  logoutBtn: { marginHorizontal: SPACING.xl, borderWidth: 1, borderColor: COLORS.danger, borderRadius: RADIUS.lg, padding: SPACING.lg, alignItems: 'center', marginBottom: SPACING.md },
  logoutText: { fontSize: FONTS.md, fontWeight: '700', color: COLORS.danger },
  version: { textAlign: 'center', fontSize: FONTS.xs, color: COLORS.textMuted },
});
