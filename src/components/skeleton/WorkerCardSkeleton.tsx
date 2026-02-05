import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const BASE_SKELETON_COLOR = '#2A2A2A';

const WorkerCardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
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
    <Animated.View
      style={[
        style,
        { opacity: pulseAnim, backgroundColor: BASE_SKELETON_COLOR },
      ]}
    />
  );

  return (
    <>
      {[...Array(count)].map((_, idx) => (
        <View key={idx} style={styles.card}>
          {/* Top Row */}
          <View style={styles.topRow}>
            <PulseView style={styles.avatar} />

            <View style={{ marginLeft: 12, flex: 1 }}>
              <PulseView style={styles.nameSkeleton} />
              <PulseView style={styles.locationSkeleton} />

              <View style={styles.ratingSkeletonRow}>
                <PulseView style={styles.ratingDot} />
                <PulseView style={styles.ratingValue} />
                <PulseView style={styles.starIcon} />
                <PulseView style={styles.reviewCount} />
              </View>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <PulseView style={styles.priceSkeleton} />
              <PulseView style={styles.distanceSkeleton} />
            </View>
          </View>

          {/* Bio */}
          <PulseView style={styles.bioSkeleton} />

          {/* Tags */}
          <View style={styles.tagRow}>
            <PulseView style={styles.tag} />
            <PulseView style={styles.tag} />
            <PulseView style={styles.tag} />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <PulseView style={styles.outlineBtn} />
            <PulseView style={styles.filledBtn} />
          </View>
        </View>
      ))}
    </>
  );
};

export default WorkerCardSkeleton;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  nameSkeleton: {
    width: 120,
    height: 14,
    borderRadius: 4,
    marginBottom: 6,
  },
  locationSkeleton: {
    width: 80,
    height: 12,
    borderRadius: 4,
    marginBottom: 6,
  },
  ratingSkeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  ratingValue: {
    width: 20,
    height: 12,
    borderRadius: 4,
    marginRight: 4,
  },
  starIcon: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 4,
  },
  reviewCount: {
    width: 30,
    height: 12,
    borderRadius: 4,
  },
  priceSkeleton: {
    width: 60,
    height: 14,
    borderRadius: 4,
    marginBottom: 4,
  },
  distanceSkeleton: {
    width: 50,
    height: 12,
    borderRadius: 4,
  },
  bioSkeleton: {
    width: '100%',
    height: 40,
    borderRadius: 6,
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tag: {
    width: 60,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outlineBtn: {
    width: '48%',
    height: 36,
    borderRadius: 6,
  },
  filledBtn: {
    width: '48%',
    height: 36,
    borderRadius: 6,
  },
});
