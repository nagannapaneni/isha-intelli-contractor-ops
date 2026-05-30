import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../lib/theme';
import { SEED_JOBS } from '../../../packages/shared/src/seed';

export const CaptureScreen = () => {
  const [selectedJob, setSelectedJob] = useState(SEED_JOBS[0].id);
  const [recordType, setRecordType] = useState('inspection');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [aiPreview, setAiPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const recordTypes = ['inspection', 'photo', 'incident', 'progress', 'material', 'safety'];
  const typeIcons: Record<string, string> = {
    inspection: '🔍', photo: '📷', incident: '⚠️', progress: '📊', material: '📦', safety: '🛡️'
  };

  const runAIPreview = () => {
    if (!description) return;
    setAiPreview('Analyzing...');
    setTimeout(() => {
      const risk = description.toLowerCase().includes('hazard') || description.toLowerCase().includes('danger') ? 'HIGH' : 'LOW';
      setAiPreview(`AI Summary: ${recordType.toUpperCase()} record detected. Risk level: ${risk}. Recommended routing: ${risk === 'HIGH' ? 'Escalate to Safety Manager' : 'Standard approval queue'}. Tags: #${recordType} #field-capture #auto-tagged`);
    }, 1200);
  };

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert('Required Fields', 'Please fill in title and description.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setTitle('');
      setDescription('');
      setAiPreview(null);
      Alert.alert('✅ Submitted', 'Field record submitted successfully. AI routing in progress.');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>📷 Field Capture</Text>
          <Text style={styles.subtitle}>Submit job site records with AI routing</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Select Job</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SEED_JOBS.slice(0, 4).map(job => (
              <TouchableOpacity key={job.id} style={[styles.jobChip, selectedJob === job.id && styles.jobChipActive]} onPress={() => setSelectedJob(job.id)}>
                <Text style={[styles.jobChipText, selectedJob === job.id && styles.jobChipTextActive]} numberOfLines={1}>{job.title.split(' ').slice(0, 3).join(' ')}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Record Type</Text>
          <View style={styles.typeGrid}>
            {recordTypes.map(t => (
              <TouchableOpacity key={t} style={[styles.typeCard, recordType === t && styles.typeCardActive]} onPress={() => setRecordType(t)}>
                <Text style={styles.typeIcon}>{typeIcons[t]}</Text>
                <Text style={[styles.typeLabel, recordType === t && styles.typeLabelActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Title *</Text>
          <TextInput style={styles.input} placeholder="e.g. Roof inspection zone 3" placeholderTextColor={COLORS.textMuted} value={title} onChangeText={setTitle} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe what you observed, any hazards, materials used..."
            placeholderTextColor={COLORS.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            onBlur={runAIPreview}
          />
        </View>

        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.photoBtn}>
            <Text style={styles.photoBtnIcon}>📷</Text>
            <Text style={styles.photoBtnText}>Add Photos</Text>
            <Text style={styles.photoBtnSub}>Tap to capture or upload</Text>
          </TouchableOpacity>
        </View>

        {aiPreview && (
          <View style={styles.aiPreview}>
            <Text style={styles.aiPreviewTitle}>🧠 AI Analysis</Text>
            <Text style={styles.aiPreviewText}>{aiPreview}</Text>
          </View>
        )}

        <TouchableOpacity style={[styles.submitBtn, submitting && styles.submitBtnDisabled]} onPress={handleSubmit} disabled={submitting}>
          <Text style={styles.submitBtnText}>{submitting ? 'Submitting...' : '🚀 Submit Field Record'}</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SPACING.xl, paddingBottom: SPACING.md },
  title: { fontSize: FONTS.xxl, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  subtitle: { fontSize: FONTS.sm, color: COLORS.textMuted },
  section: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.xl },
  label: { fontSize: FONTS.sm, fontWeight: '700', color: COLORS.textSecondary, marginBottom: SPACING.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
  jobChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.border, marginRight: SPACING.sm, backgroundColor: COLORS.surface, maxWidth: 160 },
  jobChipActive: { backgroundColor: COLORS.primary + '20', borderColor: COLORS.primary },
  jobChipText: { fontSize: FONTS.xs, color: COLORS.textMuted, fontWeight: '600' },
  jobChipTextActive: { color: COLORS.primary },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  typeCard: { width: '30%', backgroundColor: COLORS.surface, borderRadius: RADIUS.md, padding: SPACING.md, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  typeCardActive: { backgroundColor: COLORS.primary + '20', borderColor: COLORS.primary },
  typeIcon: { fontSize: 24, marginBottom: 4 },
  typeLabel: { fontSize: FONTS.xs, color: COLORS.textMuted, fontWeight: '600', textTransform: 'capitalize' },
  typeLabelActive: { color: COLORS.primary },
  input: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.md, color: COLORS.text, fontSize: FONTS.md, borderWidth: 1, borderColor: COLORS.border },
  textArea: { height: 120, textAlignVertical: 'top' },
  photoSection: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.xl },
  photoBtn: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.xl, alignItems: 'center', borderWidth: 2, borderColor: COLORS.border, borderStyle: 'dashed' },
  photoBtnIcon: { fontSize: 36, marginBottom: SPACING.sm },
  photoBtnText: { fontSize: FONTS.md, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  photoBtnSub: { fontSize: FONTS.sm, color: COLORS.textMuted },
  aiPreview: { marginHorizontal: SPACING.xl, backgroundColor: COLORS.primary + '15', borderRadius: RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.primary + '40', marginBottom: SPACING.xl },
  aiPreviewTitle: { fontSize: FONTS.sm, fontWeight: '700', color: COLORS.primaryLight, marginBottom: SPACING.sm },
  aiPreviewText: { fontSize: FONTS.sm, color: COLORS.text, lineHeight: 20 },
  submitBtn: { marginHorizontal: SPACING.xl, backgroundColor: COLORS.primary, borderRadius: RADIUS.lg, padding: SPACING.lg, alignItems: 'center', ...SHADOWS.button },
  submitBtnDisabled: { opacity: 0.6 },
  submitBtnText: { fontSize: FONTS.lg, fontWeight: '800', color: COLORS.white },
});
