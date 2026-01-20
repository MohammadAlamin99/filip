import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Bell, Search } from 'lucide-react-native';
import styles from '../../screen/availabilty/style';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  secondaryText: '#9E9E9E',
};

const AvailabilityHeader = () => {
  const navigation = useNavigation<any>();
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Find Workers</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('notification')}>
          <Bell width={24} height={24} color="white" />
          <View style={styles.notifDot} />
        </TouchableOpacity>
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
