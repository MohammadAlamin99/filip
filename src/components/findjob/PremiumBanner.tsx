import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SparkleIcon from '../../components/svg/SparkelIcon';
import styles from '../../screen/availabilty/style';

const PremiumBanner = ({ onPress }: any) => {
  return (
    <View style={styles.premiumBanner}>
      <View style={styles.premiumIconContainer}>
        <SparkleIcon width={24} height={24} />
      </View>

      <Text style={styles.premiumTitle}>Need Premium Staff?</Text>
      <Text style={styles.premiumSub}>
        Post A Verified Shift To Attract Our Highest-Rated Professionals
        Instantly
      </Text>

      <TouchableOpacity style={styles.premiumBtn} onPress={onPress}>
        <Text style={styles.filledBtnText}>Send Offers</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PremiumBanner;
