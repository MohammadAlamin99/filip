import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const JobCardSkeleton = () => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const PulseView = ({ style }: { style?: any }) => (
    <Animated.View style={[style, { opacity: pulseAnim }]} />
  );

  return (
    <>
      {[...Array(3)].map((_, index) => (
        <View key={index} style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.titleSection}>
              <PulseView style={styles.avatar} />
              <View>
                <PulseView style={styles.titleLine} />
                <PulseView style={styles.companyLine} />
              </View>
            </View>
            <PulseView style={styles.bookmark} />
          </View>

          {/* Tags */}
          <View style={styles.tagsWrapper}>
            <View style={styles.row}>
              <PulseView style={styles.tag} />
              <PulseView style={styles.tag} />
            </View>
            <PulseView style={styles.tagSmall} />
          </View>

          {/* Button */}
          <PulseView style={styles.button} />
        </View>
      ))}
    </>
  );
};

export default JobCardSkeleton;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.07)',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    marginRight: 12,
  },

  titleLine: {
    width: 160,
    height: 16,
    borderRadius: 6,
    backgroundColor: '#1E1E1E',
    marginBottom: 6,
  },

  companyLine: {
    width: 120,
    height: 14,
    borderRadius: 6,
    backgroundColor: '#1E1E1E',
  },

  bookmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
  },

  tagsWrapper: {
    gap: 10,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  tag: {
    width: 90,
    height: 22,
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
  },

  tagSmall: {
    width: 120,
    height: 22,
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
  },

  button: {
    height: 36,
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
  },
});
