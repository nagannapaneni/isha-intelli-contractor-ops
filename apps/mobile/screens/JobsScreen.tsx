import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS, priorityColor, statusColor } from '../lib/theme';
import { SEED_JOBS } from '../../../packages/shared/src/seed';

export const JobsScreen = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = SEED_JOBS.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.clientName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || j.status === filter;
    return matchSearch && matchFilter;
  });

  const filters = ['all', 'active', 'pending', 'completed'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Jobs</Text>
        <Text style={styles.count}>{filtered.length} jobs</Text>
      </View>
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs or clients..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {filters.map(f => (
          <TouchableOpacity key={f} style={[styles.filterChip, filter === f && styles.filterChipActive]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f.charAt(0).toUpperCase() + f.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.list}>
        {filtered.map(job => (
          <TouchableOpacity key={job.id} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <View style={[styles.statusBadge, { backgroundColor: statusColor(job.status) + '25', borderColor: statusColor(job.status) }]}>
                <Text style={[styles.statusText, { color: statusColor(job.status) }]}>{job.status.replace('_', ' ').toUpperCase()}</Text>
              </View>
              <View style={[styles.priorityDot, { backgroundColor: priorityColor(job.priority) }]} />
            </View>
            <Text style={styles.jobTitle} numberOfLines={1}>{job.title}</Text>
            <Text style={styles.jobClient}>🏢 {job.clientName}</Text>
            <Text style={styles.jobAddr} numberOfLines={1}>📍 {job.siteAddress}</Text>
            <View style={styles.jobFooter}>
              <View style={styles.aiScore}>
                <Text style={styles.aiScoreLabel}>AI</Text>
                <Text style={[styles.aiScoreValue, { color: job.aiHealthScore >= 80 ? COLORS.success : job.aiHealthScore >= 60 ? COLORS.accent : COLORS.danger }]}>{job.aiHealthScore}</Text>
              </View>
              <View style={styles.budgetInfo}>
                <Text style={styles.budgetLabel}>Budget</Text>
                <Text style={styles.budgetValue}>${(job.budget / 1000).toFixed(0)}k</Text>
              </View>
              <Text style={styles.crewCount}>👷 {job.assignedCrew.length} crew</Text>
            </View>
            {job.aiRiskFlags.length > 0 && (
              <View style={styles.riskBanner}>
                <Text style={styles.riskText}>⚠️ {job.aiRiskFlags[0]}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.xl },
  title: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.text },
  count: { fontSize: FONTS.sm, color: COLORS.textMuted },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, marginHorizontal: SPACING.xl, borderRadius: RADIUS.lg, paddingHorizontal: SPACING.md, marginBottom: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  searchIcon: { fontSize: 16, marginRight: SPACING.sm },
  searchInput: { flex: 1, paddingVertical: SPACING.md, color: COLORS.text, fontSize: FONTS.md },
  filterRow: { paddingLeft: SPACING.xl, marginBottom: SPACING.md },
  filterChip: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.border, marginRight: SPACING.sm, backgroundColor: COLORS.surface },
  filterChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: FONTS.sm, color: COLORS.textMuted, fontWeight: '600' },
  filterTextActive: { color: COLORS.white },
  list: { flex: 1, paddingHorizontal: SPACING.xl },
  jobCard: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOWS.card },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  statusBadge: { borderWidth: 1, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 2 },
  statusText: { fontSize: FONTS.xs, fontWeight: '700' },
  priorityDot: { width: 10, height: 10, borderRadius: 5 },
  jobTitle: { fontSize: FONTS.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.xs },
  jobClient: { fontSize: FONTS.sm, color: COLORS.textSecondary, marginBottom: 2 },
  jobAddr: { fontSize: FONTS.sm, color: COLORS.textMuted, marginBottom: SPACING.md },
  jobFooter: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  aiScore: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.surfaceElevated, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 2 },
  aiScoreLabel: { fontSize: FONTS.xs, color: COLORS.textMuted, fontWeight: '700' },
  aiScoreValue: { fontSize: FONTS.sm, fontWeight: '800' },
  budgetInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  budgetLabel: { fontSize: FONTS.xs, color: COLORS.textMuted },
  budgetValue: { fontSize: FONTS.sm, color: COLORS.text, fontWeight: '700' },
  crewCount: { fontSize: FONTS.sm, color: COLORS.textMuted, marginLeft: 'auto' },
  riskBanner: { marginTop: SPACING.sm, backgroundColor: COLORS.danger + '15', borderRadius: RADIUS.sm, padding: SPACING.sm, borderLeftWidth: 2, borderLeftColor: COLORS.danger },
  riskText: { fontSize: FONTS.xs, color: COLORS.danger },
});
