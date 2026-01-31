import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import styles from '../../screen/feed/style';

const FeedCardSkeleton = () => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current; // initial opacity

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

  const PulseView = (props: any) => (
    <Animated.View {...props} style={[props.style, { opacity: pulseAnim }]} />
  );

  return (
    <View style={styles.recCard}>
      {/* Image Skeleton */}
      <PulseView style={[styles.cardImage, skeletonStyles.image]} />

      {/* Profile Row Skeleton */}
      <View style={styles.profileRow}>
        <PulseView style={[styles.avatarCircle, skeletonStyles.avatar]} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <PulseView
            style={[
              skeletonStyles.text,
              { width: 120, height: 16, marginBottom: 4 },
            ]}
          />
          <PulseView style={[skeletonStyles.text, { width: 60, height: 14 }]} />
        </View>
      </View>

      {/* Card Info Skeleton */}
      <View style={styles.cardInfo}>
        <View style={styles.rowBetween}>
          <PulseView
            style={[skeletonStyles.text, { width: 100, height: 18 }]}
          />
          <PulseView style={[skeletonStyles.text, { width: 50, height: 18 }]} />
        </View>

        <PulseView
          style={[
            skeletonStyles.text,
            { width: 80, height: 14, marginVertical: 4 },
          ]}
        />

        {/* Availability Skeleton */}
        <View style={styles.availabilityBox}>
          <PulseView
            style={[skeletonStyles.avatar, { width: 24, height: 24 }]}
          />
          <View style={{ marginLeft: 8 }}>
            <PulseView
              style={[
                skeletonStyles.text,
                { width: 100, height: 14, marginBottom: 4 },
              ]}
            />
            <PulseView
              style={[skeletonStyles.text, { width: 80, height: 14 }]}
            />
          </View>
        </View>

        {/* Tags Skeleton */}
        <View style={styles.tagRow}>
          <PulseView style={[skeletonStyles.tag, { width: 60 }]} />
          <PulseView style={[skeletonStyles.tag, { width: 50 }]} />
          <PulseView style={[skeletonStyles.tag, { width: 70 }]} />
        </View>

        {/* Button Skeleton */}
        <PulseView style={skeletonStyles.button} />
      </View>
    </View>
  );
};

const skeletonStyles = StyleSheet.create({
  image: {
    backgroundColor: '#e0e0e0',
  },
  avatar: {
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
  },
  text: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  tag: {
    height: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    marginRight: 6,
  },
  button: {
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginTop: 10,
  },
});

export default FeedCardSkeleton;
