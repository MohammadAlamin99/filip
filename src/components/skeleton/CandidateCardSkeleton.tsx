import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';

const BASE_SKELETON_COLOR = '#2A2A2A'; // Skeleton color

const CandidateCardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
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

  // Reusable pulse view with consistent skeleton color
  const PulseView = ({ style }: { style?: StyleProp<ViewStyle> }) => (
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
        <View
          key={idx}
          style={[
            styles.card,
            { borderWidth: 1, borderColor: BASE_SKELETON_COLOR },
          ]}
        >
          {/* Cover Image Skeleton */}
          <PulseView style={styles.candidateImage} />

          {/* Status Badge Skeleton */}
          <View style={styles.statusBadge}>
            <PulseView style={styles.dot} />
            <PulseView style={[styles.statusText, { width: 50, height: 12 }]} />
          </View>

          {/* Profile Info Skeleton */}
          <View style={styles.profileRow}>
            <PulseView style={styles.avatarPlaceholder} />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <PulseView style={styles.namePlaceholder} />
              <View style={styles.locationRow}>
                <PulseView style={styles.locationPlaceholder} />
              </View>
            </View>
          </View>

          {/* Tags Skeleton */}
          <View style={styles.cardContent}>
            <View style={styles.tagContainer}>
              <PulseView style={styles.tag} />
              <PulseView style={styles.tag} />
              <PulseView style={styles.tag} />
            </View>

            {/* Availability Skeleton */}
            <View style={styles.availabilityRow}>
              <PulseView style={styles.availabilityTitlePlaceholder} />
              <PulseView style={styles.availabilityDatesPlaceholder} />
            </View>

            {/* Button Skeleton */}
            <PulseView style={styles.buttonPlaceholder} />
          </View>
        </View>
      ))}
    </>
  );
};

export default CandidateCardSkeleton;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    paddingBottom: 12,
  },
  candidateImage: {
    width: '100%',
    height: 120,
    borderRadius: 0,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    borderRadius: 6,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 12,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  namePlaceholder: {
    width: 120,
    height: 14,
    borderRadius: 4,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPlaceholder: {
    width: 80,
    height: 12,
    borderRadius: 4,
  },
  cardContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tag: {
    width: 60,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  availabilityRow: {
    flexDirection: 'column',
    marginBottom: 12,
  },
  availabilityTitlePlaceholder: {
    width: 100,
    height: 14,
    borderRadius: 4,
    marginBottom: 4,
  },
  availabilityDatesPlaceholder: {
    width: 140,
    height: 12,
    borderRadius: 4,
  },
  buttonPlaceholder: {
    height: 36,
    borderRadius: 6,
    marginTop: 12,
  },
});
