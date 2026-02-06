import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import styles from '../../screen/feed/style';

const BASE_SKELETON_COLOR = '#2A2A2A';

type Props = {
  count?: number;
};

const FeedCardSkeleton = ({ count = 3 }: Props) => {
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
      {[...Array(count)].map((_, index) => (
        <View key={index} style={styles.recCard}>
          {/* Image */}
          <PulseView style={[styles.cardImage, skeleton.image]} />

          {/* Profile */}
          <View style={styles.profileRow}>
            <PulseView
              style={[
                styles.avatarCircle,
                { borderColor: '#1D1D1D' },
                skeleton.avatar,
              ]}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <PulseView style={[skeleton.text, { width: 120, height: 16 }]} />
              <PulseView
                style={[skeleton.text, { width: 60, height: 14, marginTop: 6 }]}
              />
            </View>
          </View>

          {/* Info */}
          <View style={styles.cardInfo}>
            <View style={styles.rowBetween}>
              <PulseView style={[skeleton.text, { width: 100, height: 18 }]} />
              <PulseView style={[skeleton.text, { width: 50, height: 18 }]} />
            </View>

            <PulseView
              style={[
                skeleton.text,
                { width: 80, height: 14, marginVertical: 6 },
              ]}
            />

            {/* Availability */}
            <View style={styles.availabilityBox}>
              <PulseView style={[skeleton.avatar, { width: 24, height: 24 }]} />
              <View style={{ marginLeft: 8 }}>
                <PulseView
                  style={[skeleton.text, { width: 100, height: 14 }]}
                />
                <PulseView
                  style={[
                    skeleton.text,
                    { width: 80, height: 14, marginTop: 4 },
                  ]}
                />
              </View>
            </View>

            {/* Tags */}
            <View style={styles.tagRow}>
              <PulseView style={[skeleton.tag, { width: 60 }]} />
              <PulseView style={[skeleton.tag, { width: 50 }]} />
              <PulseView style={[skeleton.tag, { width: 70 }]} />
            </View>

            {/* Button */}
            <PulseView style={skeleton.button} />
          </View>
        </View>
      ))}
    </>
  );
};

export default FeedCardSkeleton;

const skeleton = StyleSheet.create({
  image: {
    backgroundColor: BASE_SKELETON_COLOR,
  },
  avatar: {
    backgroundColor: BASE_SKELETON_COLOR,
    borderRadius: 50,
  },
  text: {
    backgroundColor: BASE_SKELETON_COLOR,
    borderRadius: 4,
  },
  tag: {
    height: 24,
    backgroundColor: BASE_SKELETON_COLOR,
    borderRadius: 12,
    marginRight: 6,
  },
  button: {
    height: 40,
    backgroundColor: BASE_SKELETON_COLOR,
    borderRadius: 8,
    marginTop: 10,
  },
});
