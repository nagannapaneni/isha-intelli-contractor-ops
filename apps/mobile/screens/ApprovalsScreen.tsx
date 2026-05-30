import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS, priorityColor } from '../lib/theme';
import { SEED_AI_QUEUE } from '../../../packages/shared/src/seed';

const MOCK_APPROVALS = [
  { id: 'apr-001', title: 'Roof Inspection - Zone 3', type: 'field_record', jobName: 'Riverside HVAC', requestedBy: 'Mike Torres', requestedAt: '2026-05-30T08:15:00Z', priority: 'high', aiRec: 'Approve', aiConfidence: 96, description: 'Safety compliance check passed. All zones clear.' },
  { id: 'apr-002', title: 'Invoice #INV-0043 - $48,200', type: 'invoice', jobName: 'Tech Campus Solar', requestedBy: 'Finance Team', requestedAt: '2026-05-29T16:00:00Z', priority: 'medium', aiRec: 'Review', aiConfidence: 72, description: 'Material costs 34% above average. Manual review suggested.' },
  { id: 'apr-003', title: 'Permit Extension Request', type: 'change_order', jobName: 'Downtown Electrical', requestedBy: 'Sarah Chen', requestedAt: '2026-05-29T11:00:00Z', priority: 'critical', aiRec: 'Escalate', aiConfidence: 88, description: 'Permit delay affects critical path. Escalate to legal.' },
];

export const ApprovalsScreen = () => {
  const [approvals, setApprovals] = useState(MOCK_APPROVALS);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleApprove = (id: string) => {
    Alert.alert('Approve', 'Are you sure you want to approve this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Approve', onPress: () => {
        setApprovals(prev => prev.filter(a => a.id !== id));
        Alert.alert('✅ Approved', 'Item approved and routed successfully.');
      }}
    ]);
  };

  const handleReject = (id: string) => {
    Alert.alert('Reject', 'Reject this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reject', style: 'destructive', onPress: () => {
        setApprovals(prev => prev.filter(a => a.id !== id));
        Alert.alert('❌ Rejected', 'Item rejected and requester notified.');
      }}
    ]);
  };

  const typeColors: Record<string, string> = {
    field_record: COLORS.info, invoice: COLORS.success, change_order: COLORS.accent, material_request: COLORS.primary
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>✅ Approvals</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{approvals.length} pending</Text>
        </View>
      </View>
      <ScrollView style={styles.list}>
        {approvals.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎉</Text>
            <Text style={styles.emptyTitle}>All Clear!</Text>
            <Text style={styles.emptyMsg}>No pending approvals</Text>
          </View>
        ) : approvals.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.typeBadge, { backgroundColor: typeColors[item.type] + '20', borderColor: typeColors[item.type] }]}>
                <Text style={[styles.typeText, { color: typeColors[item.type] }]}>{item.type.replace('_', ' ').toUpperCase()}</Text>
              </View>
              <View style={[styles.priorityDot, { backgroundColor: priorityColor(item.priority) }]} />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardJob}>🏗️ {item.jobName}</Text>
            <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
            <View style={styles.aiRow}>
              <View style={[styles.aiRec, { backgroundColor: item.aiRec === 'Approve' ? COLORS.success + '20' : item.aiRec === 'Escalate' ? COLORS.danger + '20' : COLORS.accent + '20' }]}>
                <Text style={styles.aiRecLabel}>🧠 AI: </Text>
                <Text style={[styles.aiRecValue, { color: item.aiRec === 'Approve' ? COLORS.success : item.aiRec === 'Escalate' ? COLORS.danger : COLORS.accent }]}>{item.aiRec} ({item.aiConfidence}%)</Text>
              </View>
              <Text style={styles.cardTime}>{new Date(item.requestedAt).toLocaleDateString()}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.rejectBtn} onPress={() => handleReject(item.id)}>
                <Text style={styles.rejectText}>❌ Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.approveBtn} onPress={() => handleApprove(item.id)}>
                <Text style={styles.approveText}>✅ Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: SPACING.xl },
  title: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.text },
  badge: { backgroundColor: COLORS.accent + '20', borderWidth: 1, borderColor: COLORS.accent, borderRadius: RADIUS.full, paddingHorizontal: SPACING.md, paddingVertical: 4 },
  badgeText: { fontSize: FONTS.sm, color: COLORS.accent, fontWeight: '700' },
  list: { flex: 1, paddingHorizontal: SPACING.xl },
  emptyState: { alignItems: 'center', paddingTop: 80 },
  emptyIcon: { fontSize: 64, marginBottom: SPACING.lg },
  emptyTitle: { fontSize: FONTS.xl, fontWeight: '800', color: COLORS.text, marginBottom: SPACING.sm },
  emptyMsg: { fontSize: FONTS.md, color: COLORS.textMuted },
  card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOWS.card },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  typeBadge: { borderWidth: 1, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 2 },
  typeText: { fontSize: FONTS.xs, fontWeight: '700' },
  priorityDot: { width: 10, height: 10, borderRadius: 5 },
  cardTitle: { fontSize: FONTS.lg, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  cardJob: { fontSize: FONTS.sm, color: COLORS.textSecondary, marginBottom: 4 },
  cardDesc: { fontSize: FONTS.sm, color: COLORS.textMuted, lineHeight: 18, marginBottom: SPACING.md },
  aiRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  aiRec: { flexDirection: 'row', borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 4 },
  aiRecLabel: { fontSize: FONTS.xs, color: COLORS.textMuted, fontWeight: '600' },
  aiRecValue: { fontSize: FONTS.xs, fontWeight: '800' },
  cardTime: { fontSize: FONTS.xs, color: COLORS.textMuted },
  actions: { flexDirection: 'row', gap: SPACING.sm },
  rejectBtn: { flex: 1, borderWidth: 1, borderColor: COLORS.danger, borderRadius: RADIUS.md, paddingVertical: SPACING.md, alignItems: 'center', backgroundColor: COLORS.danger + '10' },
  rejectText: { fontSize: FONTS.sm, fontWeight: '700', color: COLORS.danger },
  approveBtn: { flex: 1, backgroundColor: COLORS.success, borderRadius: RADIUS.md, paddingVertical: SPACING.md, alignItems: 'center', ...SHADOWS.button },
  approveText: { fontSize: FONTS.sm, fontWeight: '700', color: COLORS.white },
});
