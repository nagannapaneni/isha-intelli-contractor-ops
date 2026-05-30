import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../lib/theme';
import { SEED_METRICS, SEED_AI_QUEUE } from '../../../packages/shared/src/seed';

const { width } = Dimensions.get('window');

export const DashboardScreen = () => {
  const [metrics] = useState(SEED_METRICS);
  const [aiQueue] = useState(SEED_AI_QUEUE);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const kpis = [
    { label: 'Active Jobs', value: metrics.activeJobs, icon: '🏗️', color: COLORS.primary },
    { label: 'Pending', value: metrics.pendingApprovals, icon: '⏳', color: COLORS.accent },
    { label: 'Crew Used', value: `${metrics.crewUtilization}%`, icon: '👷', color: COLORS.success },
    { label: 'AI Score', value: metrics.aiHealthScore, icon: '🧠', color: COLORS.info },
  ];

  const priorityColors: Record<string, string> = {
    critical: COLORS.danger, high: COLORS.accent, medium: COLORS.info, low: COLORS.success
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.orgName}>Isha Intelli LLC</Text>
          </View>
          <View style={styles.aiScoreBadge}>
            <Text style={styles.aiScoreLabel}>AI Health</Text>
            <Text style={styles.aiScoreValue}>{metrics.aiHealthScore}</Text>
          </View>
        </View>

        <View style={styles.kpiGrid}>
          {kpis.map((kpi, i) => (
            <View key={i} style={[styles.kpiCard, { borderLeftColor: kpi.color }]}>
              <Text style={styles.kpiIcon}>{kpi.icon}</Text>
              <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
              <Text style={styles.kpiLabel}>{kpi.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧠 AI Operations Queue</Text>
          {aiQueue.filter(q => q.status === 'pending').map(item => (
            <View key={item.id} style={styles.aiCard}>
              <View style={styles.aiCardHeader}>
                <View style={[styles.priorityBadge, { backgroundColor: priorityColors[item.priority] + '30', borderColor: priorityColors[item.priority] }]}>
                  <Text style={[styles.priorityText, { color: priorityColors[item.priority] }]}>{item.priority.toUpperCase()}</Text>
                </View>
                <Text style={styles.aiConfidence}>{item.confidence}% confidence</Text>
              </View>
              <Text style={styles.aiTitle}>{item.title}</Text>
              <Text style={styles.aiDescription} numberOfLines={2}>{item.description}</Text>
              <View style={styles.aiActions}>
                <TouchableOpacity style={[styles.aiActionBtn, { backgroundColor: COLORS.primary + '20', borderColor: COLORS.primary }]}>
                  <Text style={[styles.aiActionText, { color: COLORS.primary }]}>Review</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.aiActionBtn, { backgroundColor: COLORS.success + '20', borderColor: COLORS.success }]}>
                  <Text style={[styles.aiActionText, { color: COLORS.success }]}>Action</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 This Week</Text>
          <View style={styles.chartContainer}>
            {metrics.weeklyJobData.map((d, i) => {
              const maxJobs = Math.max(...metrics.weeklyJobData.map(x => x.jobs));
              const h = (d.jobs / maxJobs) * 80;
              return (
                <View key={i} style={styles.chartBar}>
                  <Text style={styles.chartValue}>{d.jobs}</Text>
                  <View style={[styles.bar, { height: h, backgroundColor: COLORS.primary }]} />
                  <Text style={styles.chartDay}>{d.day}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={[styles.section, { marginBottom: 32 }]}>
          <Text style={styles.sectionTitle}>🔔 Recent Activity</Text>
          {metrics.recentActivity.map(a => (
            <View key={a.id} style={styles.activityRow}>
              <View style={styles.activityDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.activityMsg}>{a.message}</Text>
                <Text style={styles.activityTime}>{new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.xl, paddingBottom: SPACING.md },
  greeting: { fontSize: FONTS.sm, color: COLORS.textMuted, marginBottom: 2 },
  orgName: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.text },
  aiScoreBadge: { backgroundColor: COLORS.primary + '20', borderWidth: 1, borderColor: COLORS.primary, borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center' },
  aiScoreLabel: { fontSize: FONTS.xs, color: COLORS.primaryLight, marginBottom: 2 },
  aiScoreValue: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.primary },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SPACING.lg, gap: SPACING.md, marginBottom: SPACING.md },
  kpiCard: { width: (width - SPACING.lg * 2 - SPACING.md) / 2, backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, borderLeftWidth: 3, ...SHADOWS.card },
  kpiIcon: { fontSize: 24, marginBottom: SPACING.sm },
  kpiValue: { fontSize: FONTS.xxl, fontWeight: '800', marginBottom: 2 },
  kpiLabel: { fontSize: FONTS.xs, color: COLORS.textMuted },
  section: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.xl },
  sectionTitle: { fontSize: FONTS.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  aiCard: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOWS.card },
  aiCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  priorityBadge: { borderWidth: 1, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 2 },
  priorityText: { fontSize: FONTS.xs, fontWeight: '700' },
  aiConfidence: { fontSize: FONTS.xs, color: COLORS.textMuted },
  aiTitle: { fontSize: FONTS.md, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.xs },
  aiDescription: { fontSize: FONTS.sm, color: COLORS.textSecondary, lineHeight: 18, marginBottom: SPACING.md },
  aiActions: { flexDirection: 'row', gap: SPACING.sm },
  aiActionBtn: { flex: 1, borderWidth: 1, borderRadius: RADIUS.md, paddingVertical: SPACING.sm, alignItems: 'center' },
  aiActionText: { fontSize: FONTS.sm, fontWeight: '600' },
  chartContainer: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, height: 130 },
  chartBar: { alignItems: 'center', gap: SPACING.xs },
  bar: { width: 28, borderRadius: RADIUS.sm },
  chartValue: { fontSize: FONTS.xs, color: COLORS.textMuted },
  chartDay: { fontSize: FONTS.xs, color: COLORS.textMuted },
  activityRow: { flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.md, marginBottom: SPACING.md },
  activityDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginTop: 6 },
  activityMsg: { fontSize: FONTS.sm, color: COLORS.text, marginBottom: 2 },
  activityTime: { fontSize: FONTS.xs, color: COLORS.textMuted },
});
