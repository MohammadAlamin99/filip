import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const FullTimeSkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const Shimmer = () => (
    <Animated.View style={[styles.shimmer, { transform: [{ translateX }] }]} />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.title} />
        <View style={styles.icon} />
        <Shimmer />
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar} />
        <View style={styles.filterBtn} />
        <Shimmer />
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        {[1, 2, 3, 4].map(i => (
          <View key={i} style={styles.filterChip}>
            <Shimmer />
          </View>
        ))}
      </View>

      {/* Job Cards */}
      {[1, 2, 3, 4, 5].map(i => (
        <View key={i} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.avatar} />
            <View style={styles.lineGroup}>
              <View style={styles.lineShort} />
              <View style={styles.lineLong} />
            </View>
          </View>

          <View style={styles.lineLong} />
          <View style={styles.lineMedium} />
          <View style={styles.lineSmall} />
          <Shimmer />
        </View>
      ))}
    </View>
  );
};

export default FullTimeSkeleton;
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 120,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

  header: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 12,
  },

  title: {
    width: 160,
    height: 18,
    backgroundColor: '#374151',
    borderRadius: 4,
    alignSelf: 'center',
  },

  icon: {
    width: 24,
    height: 24,
    backgroundColor: '#374151',
    borderRadius: 12,
    alignSelf: 'center',
  },

  searchRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },

  searchBar: {
    flex: 1,
    height: 44,
    backgroundColor: '#374151',
    borderRadius: 10,
  },

  filterBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#374151',
    borderRadius: 10,
  },

  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  filterChip: {
    width: 80,
    height: 30,
    backgroundColor: '#374151',
    borderRadius: 16,
    overflow: 'hidden',
  },

  card: {
    backgroundColor: '#1F2937',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    overflow: 'hidden',
  },

  cardHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#374151',
    borderRadius: 20,
  },

  lineGroup: {
    flex: 1,
    gap: 6,
  },

  lineShort: {
    width: '40%',
    height: 10,
    backgroundColor: '#374151',
    borderRadius: 4,
  },

  lineLong: {
    width: '100%',
    height: 10,
    backgroundColor: '#374151',
    borderRadius: 4,
  },

  lineMedium: {
    width: '70%',
    height: 10,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginTop: 6,
  },

  lineSmall: {
    width: '50%',
    height: 10,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginTop: 6,
  },
});
