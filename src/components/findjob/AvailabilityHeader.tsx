import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Bell, Search } from 'lucide-react-native';
import styles from '../../screen/availabilty/style';

const COLORS = {
  secondaryText: '#9E9E9E',
};

const AvailabilityHeader = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Find Workers</Text>
        <View>
          <Bell width={24} height={24} color="white" />
          <View style={styles.notifDot} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Search width={24} height={24} color="white" />
        <TextInput
          placeholder="Search"
          placeholderTextColor={COLORS.secondaryText}
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default AvailabilityHeader;
